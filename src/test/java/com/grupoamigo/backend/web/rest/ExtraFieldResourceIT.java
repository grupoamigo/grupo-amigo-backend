package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.GrupoAmigoBackendApp;
import com.grupoamigo.backend.domain.ExtraField;
import com.grupoamigo.backend.repository.ExtraFieldRepository;
import com.grupoamigo.backend.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.grupoamigo.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ExtraFieldResource} REST controller.
 */
@SpringBootTest(classes = GrupoAmigoBackendApp.class)
public class ExtraFieldResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private ExtraFieldRepository extraFieldRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restExtraFieldMockMvc;

    private ExtraField extraField;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExtraFieldResource extraFieldResource = new ExtraFieldResource(extraFieldRepository);
        this.restExtraFieldMockMvc = MockMvcBuilders.standaloneSetup(extraFieldResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtraField createEntity(EntityManager em) {
        ExtraField extraField = new ExtraField()
            .name(DEFAULT_NAME)
            .value(DEFAULT_VALUE);
        return extraField;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtraField createUpdatedEntity(EntityManager em) {
        ExtraField extraField = new ExtraField()
            .name(UPDATED_NAME)
            .value(UPDATED_VALUE);
        return extraField;
    }

    @BeforeEach
    public void initTest() {
        extraField = createEntity(em);
    }

    @Test
    @Transactional
    public void createExtraField() throws Exception {
        int databaseSizeBeforeCreate = extraFieldRepository.findAll().size();

        // Create the ExtraField
        restExtraFieldMockMvc.perform(post("/api/extra-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraField)))
            .andExpect(status().isCreated());

        // Validate the ExtraField in the database
        List<ExtraField> extraFieldList = extraFieldRepository.findAll();
        assertThat(extraFieldList).hasSize(databaseSizeBeforeCreate + 1);
        ExtraField testExtraField = extraFieldList.get(extraFieldList.size() - 1);
        assertThat(testExtraField.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testExtraField.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createExtraFieldWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = extraFieldRepository.findAll().size();

        // Create the ExtraField with an existing ID
        extraField.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtraFieldMockMvc.perform(post("/api/extra-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraField)))
            .andExpect(status().isBadRequest());

        // Validate the ExtraField in the database
        List<ExtraField> extraFieldList = extraFieldRepository.findAll();
        assertThat(extraFieldList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraFieldRepository.findAll().size();
        // set the field null
        extraField.setName(null);

        // Create the ExtraField, which fails.

        restExtraFieldMockMvc.perform(post("/api/extra-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraField)))
            .andExpect(status().isBadRequest());

        List<ExtraField> extraFieldList = extraFieldRepository.findAll();
        assertThat(extraFieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraFieldRepository.findAll().size();
        // set the field null
        extraField.setValue(null);

        // Create the ExtraField, which fails.

        restExtraFieldMockMvc.perform(post("/api/extra-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraField)))
            .andExpect(status().isBadRequest());

        List<ExtraField> extraFieldList = extraFieldRepository.findAll();
        assertThat(extraFieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExtraFields() throws Exception {
        // Initialize the database
        extraFieldRepository.saveAndFlush(extraField);

        // Get all the extraFieldList
        restExtraFieldMockMvc.perform(get("/api/extra-fields?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extraField.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }
    
    @Test
    @Transactional
    public void getExtraField() throws Exception {
        // Initialize the database
        extraFieldRepository.saveAndFlush(extraField);

        // Get the extraField
        restExtraFieldMockMvc.perform(get("/api/extra-fields/{id}", extraField.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(extraField.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExtraField() throws Exception {
        // Get the extraField
        restExtraFieldMockMvc.perform(get("/api/extra-fields/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExtraField() throws Exception {
        // Initialize the database
        extraFieldRepository.saveAndFlush(extraField);

        int databaseSizeBeforeUpdate = extraFieldRepository.findAll().size();

        // Update the extraField
        ExtraField updatedExtraField = extraFieldRepository.findById(extraField.getId()).get();
        // Disconnect from session so that the updates on updatedExtraField are not directly saved in db
        em.detach(updatedExtraField);
        updatedExtraField
            .name(UPDATED_NAME)
            .value(UPDATED_VALUE);

        restExtraFieldMockMvc.perform(put("/api/extra-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExtraField)))
            .andExpect(status().isOk());

        // Validate the ExtraField in the database
        List<ExtraField> extraFieldList = extraFieldRepository.findAll();
        assertThat(extraFieldList).hasSize(databaseSizeBeforeUpdate);
        ExtraField testExtraField = extraFieldList.get(extraFieldList.size() - 1);
        assertThat(testExtraField.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testExtraField.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingExtraField() throws Exception {
        int databaseSizeBeforeUpdate = extraFieldRepository.findAll().size();

        // Create the ExtraField

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtraFieldMockMvc.perform(put("/api/extra-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraField)))
            .andExpect(status().isBadRequest());

        // Validate the ExtraField in the database
        List<ExtraField> extraFieldList = extraFieldRepository.findAll();
        assertThat(extraFieldList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExtraField() throws Exception {
        // Initialize the database
        extraFieldRepository.saveAndFlush(extraField);

        int databaseSizeBeforeDelete = extraFieldRepository.findAll().size();

        // Delete the extraField
        restExtraFieldMockMvc.perform(delete("/api/extra-fields/{id}", extraField.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtraField> extraFieldList = extraFieldRepository.findAll();
        assertThat(extraFieldList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtraField.class);
        ExtraField extraField1 = new ExtraField();
        extraField1.setId(1L);
        ExtraField extraField2 = new ExtraField();
        extraField2.setId(extraField1.getId());
        assertThat(extraField1).isEqualTo(extraField2);
        extraField2.setId(2L);
        assertThat(extraField1).isNotEqualTo(extraField2);
        extraField1.setId(null);
        assertThat(extraField1).isNotEqualTo(extraField2);
    }
}
