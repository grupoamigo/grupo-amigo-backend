package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.GrupoAmigoBackendApp;
import com.grupoamigo.backend.domain.Manouver;
import com.grupoamigo.backend.repository.ManouverRepository;
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

import com.grupoamigo.backend.domain.enumeration.ServiceUnitType;
import com.grupoamigo.backend.domain.enumeration.DivisionType;
/**
 * Integration tests for the {@link ManouverResource} REST controller.
 */
@SpringBootTest(classes = GrupoAmigoBackendApp.class)
public class ManouverResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final ServiceUnitType DEFAULT_UNIT = ServiceUnitType.TM;
    private static final ServiceUnitType UPDATED_UNIT = ServiceUnitType.KG;

    private static final DivisionType DEFAULT_DIVISION = DivisionType.INTERMODAL;
    private static final DivisionType UPDATED_DIVISION = DivisionType.FERTILIZANTES;

    @Autowired
    private ManouverRepository manouverRepository;

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

    private MockMvc restManouverMockMvc;

    private Manouver manouver;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ManouverResource manouverResource = new ManouverResource(manouverRepository);
        this.restManouverMockMvc = MockMvcBuilders.standaloneSetup(manouverResource)
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
    public static Manouver createEntity(EntityManager em) {
        Manouver manouver = new Manouver()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .unit(DEFAULT_UNIT)
            .division(DEFAULT_DIVISION);
        return manouver;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Manouver createUpdatedEntity(EntityManager em) {
        Manouver manouver = new Manouver()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .unit(UPDATED_UNIT)
            .division(UPDATED_DIVISION);
        return manouver;
    }

    @BeforeEach
    public void initTest() {
        manouver = createEntity(em);
    }

    @Test
    @Transactional
    public void createManouver() throws Exception {
        int databaseSizeBeforeCreate = manouverRepository.findAll().size();

        // Create the Manouver
        restManouverMockMvc.perform(post("/api/manouvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouver)))
            .andExpect(status().isCreated());

        // Validate the Manouver in the database
        List<Manouver> manouverList = manouverRepository.findAll();
        assertThat(manouverList).hasSize(databaseSizeBeforeCreate + 1);
        Manouver testManouver = manouverList.get(manouverList.size() - 1);
        assertThat(testManouver.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testManouver.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testManouver.getUnit()).isEqualTo(DEFAULT_UNIT);
        assertThat(testManouver.getDivision()).isEqualTo(DEFAULT_DIVISION);
    }

    @Test
    @Transactional
    public void createManouverWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = manouverRepository.findAll().size();

        // Create the Manouver with an existing ID
        manouver.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restManouverMockMvc.perform(post("/api/manouvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouver)))
            .andExpect(status().isBadRequest());

        // Validate the Manouver in the database
        List<Manouver> manouverList = manouverRepository.findAll();
        assertThat(manouverList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = manouverRepository.findAll().size();
        // set the field null
        manouver.setTitle(null);

        // Create the Manouver, which fails.

        restManouverMockMvc.perform(post("/api/manouvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouver)))
            .andExpect(status().isBadRequest());

        List<Manouver> manouverList = manouverRepository.findAll();
        assertThat(manouverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = manouverRepository.findAll().size();
        // set the field null
        manouver.setDescription(null);

        // Create the Manouver, which fails.

        restManouverMockMvc.perform(post("/api/manouvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouver)))
            .andExpect(status().isBadRequest());

        List<Manouver> manouverList = manouverRepository.findAll();
        assertThat(manouverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = manouverRepository.findAll().size();
        // set the field null
        manouver.setUnit(null);

        // Create the Manouver, which fails.

        restManouverMockMvc.perform(post("/api/manouvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouver)))
            .andExpect(status().isBadRequest());

        List<Manouver> manouverList = manouverRepository.findAll();
        assertThat(manouverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllManouvers() throws Exception {
        // Initialize the database
        manouverRepository.saveAndFlush(manouver);

        // Get all the manouverList
        restManouverMockMvc.perform(get("/api/manouvers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(manouver.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT.toString())))
            .andExpect(jsonPath("$.[*].division").value(hasItem(DEFAULT_DIVISION.toString())));
    }
    
    @Test
    @Transactional
    public void getManouver() throws Exception {
        // Initialize the database
        manouverRepository.saveAndFlush(manouver);

        // Get the manouver
        restManouverMockMvc.perform(get("/api/manouvers/{id}", manouver.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(manouver.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT.toString()))
            .andExpect(jsonPath("$.division").value(DEFAULT_DIVISION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingManouver() throws Exception {
        // Get the manouver
        restManouverMockMvc.perform(get("/api/manouvers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateManouver() throws Exception {
        // Initialize the database
        manouverRepository.saveAndFlush(manouver);

        int databaseSizeBeforeUpdate = manouverRepository.findAll().size();

        // Update the manouver
        Manouver updatedManouver = manouverRepository.findById(manouver.getId()).get();
        // Disconnect from session so that the updates on updatedManouver are not directly saved in db
        em.detach(updatedManouver);
        updatedManouver
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .unit(UPDATED_UNIT)
            .division(UPDATED_DIVISION);

        restManouverMockMvc.perform(put("/api/manouvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedManouver)))
            .andExpect(status().isOk());

        // Validate the Manouver in the database
        List<Manouver> manouverList = manouverRepository.findAll();
        assertThat(manouverList).hasSize(databaseSizeBeforeUpdate);
        Manouver testManouver = manouverList.get(manouverList.size() - 1);
        assertThat(testManouver.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testManouver.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testManouver.getUnit()).isEqualTo(UPDATED_UNIT);
        assertThat(testManouver.getDivision()).isEqualTo(UPDATED_DIVISION);
    }

    @Test
    @Transactional
    public void updateNonExistingManouver() throws Exception {
        int databaseSizeBeforeUpdate = manouverRepository.findAll().size();

        // Create the Manouver

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restManouverMockMvc.perform(put("/api/manouvers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouver)))
            .andExpect(status().isBadRequest());

        // Validate the Manouver in the database
        List<Manouver> manouverList = manouverRepository.findAll();
        assertThat(manouverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteManouver() throws Exception {
        // Initialize the database
        manouverRepository.saveAndFlush(manouver);

        int databaseSizeBeforeDelete = manouverRepository.findAll().size();

        // Delete the manouver
        restManouverMockMvc.perform(delete("/api/manouvers/{id}", manouver.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Manouver> manouverList = manouverRepository.findAll();
        assertThat(manouverList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Manouver.class);
        Manouver manouver1 = new Manouver();
        manouver1.setId(1L);
        Manouver manouver2 = new Manouver();
        manouver2.setId(manouver1.getId());
        assertThat(manouver1).isEqualTo(manouver2);
        manouver2.setId(2L);
        assertThat(manouver1).isNotEqualTo(manouver2);
        manouver1.setId(null);
        assertThat(manouver1).isNotEqualTo(manouver2);
    }
}
