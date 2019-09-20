package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.GrupoAmigoBackendApp;
import com.grupoamigo.backend.domain.Load;
import com.grupoamigo.backend.repository.LoadRepository;
import com.grupoamigo.backend.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.grupoamigo.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.grupoamigo.backend.domain.enumeration.LoadType;
/**
 * Integration tests for the {@link LoadResource} REST controller.
 */
@SpringBootTest(classes = GrupoAmigoBackendApp.class)
public class LoadResourceIT {

    private static final LoadType DEFAULT_TYPE = LoadType.CONTENEDOR;
    private static final LoadType UPDATED_TYPE = LoadType.GRANEL;

    private static final String DEFAULT_UNIQUE_ID = "AAAAAAAAAA";
    private static final String UPDATED_UNIQUE_ID = "BBBBBBBBBB";

    @Autowired
    private LoadRepository loadRepository;

    @Mock
    private LoadRepository loadRepositoryMock;

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

    private MockMvc restLoadMockMvc;

    private Load load;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LoadResource loadResource = new LoadResource(loadRepository);
        this.restLoadMockMvc = MockMvcBuilders.standaloneSetup(loadResource)
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
    public static Load createEntity(EntityManager em) {
        Load load = new Load()
            .type(DEFAULT_TYPE)
            .uniqueId(DEFAULT_UNIQUE_ID);
        return load;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Load createUpdatedEntity(EntityManager em) {
        Load load = new Load()
            .type(UPDATED_TYPE)
            .uniqueId(UPDATED_UNIQUE_ID);
        return load;
    }

    @BeforeEach
    public void initTest() {
        load = createEntity(em);
    }

    @Test
    @Transactional
    public void createLoad() throws Exception {
        int databaseSizeBeforeCreate = loadRepository.findAll().size();

        // Create the Load
        restLoadMockMvc.perform(post("/api/loads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(load)))
            .andExpect(status().isCreated());

        // Validate the Load in the database
        List<Load> loadList = loadRepository.findAll();
        assertThat(loadList).hasSize(databaseSizeBeforeCreate + 1);
        Load testLoad = loadList.get(loadList.size() - 1);
        assertThat(testLoad.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testLoad.getUniqueId()).isEqualTo(DEFAULT_UNIQUE_ID);
    }

    @Test
    @Transactional
    public void createLoadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = loadRepository.findAll().size();

        // Create the Load with an existing ID
        load.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLoadMockMvc.perform(post("/api/loads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(load)))
            .andExpect(status().isBadRequest());

        // Validate the Load in the database
        List<Load> loadList = loadRepository.findAll();
        assertThat(loadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = loadRepository.findAll().size();
        // set the field null
        load.setType(null);

        // Create the Load, which fails.

        restLoadMockMvc.perform(post("/api/loads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(load)))
            .andExpect(status().isBadRequest());

        List<Load> loadList = loadRepository.findAll();
        assertThat(loadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUniqueIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = loadRepository.findAll().size();
        // set the field null
        load.setUniqueId(null);

        // Create the Load, which fails.

        restLoadMockMvc.perform(post("/api/loads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(load)))
            .andExpect(status().isBadRequest());

        List<Load> loadList = loadRepository.findAll();
        assertThat(loadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLoads() throws Exception {
        // Initialize the database
        loadRepository.saveAndFlush(load);

        // Get all the loadList
        restLoadMockMvc.perform(get("/api/loads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(load.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].uniqueId").value(hasItem(DEFAULT_UNIQUE_ID.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllLoadsWithEagerRelationshipsIsEnabled() throws Exception {
        LoadResource loadResource = new LoadResource(loadRepositoryMock);
        when(loadRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restLoadMockMvc = MockMvcBuilders.standaloneSetup(loadResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restLoadMockMvc.perform(get("/api/loads?eagerload=true"))
        .andExpect(status().isOk());

        verify(loadRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllLoadsWithEagerRelationshipsIsNotEnabled() throws Exception {
        LoadResource loadResource = new LoadResource(loadRepositoryMock);
            when(loadRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restLoadMockMvc = MockMvcBuilders.standaloneSetup(loadResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restLoadMockMvc.perform(get("/api/loads?eagerload=true"))
        .andExpect(status().isOk());

            verify(loadRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getLoad() throws Exception {
        // Initialize the database
        loadRepository.saveAndFlush(load);

        // Get the load
        restLoadMockMvc.perform(get("/api/loads/{id}", load.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(load.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.uniqueId").value(DEFAULT_UNIQUE_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLoad() throws Exception {
        // Get the load
        restLoadMockMvc.perform(get("/api/loads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLoad() throws Exception {
        // Initialize the database
        loadRepository.saveAndFlush(load);

        int databaseSizeBeforeUpdate = loadRepository.findAll().size();

        // Update the load
        Load updatedLoad = loadRepository.findById(load.getId()).get();
        // Disconnect from session so that the updates on updatedLoad are not directly saved in db
        em.detach(updatedLoad);
        updatedLoad
            .type(UPDATED_TYPE)
            .uniqueId(UPDATED_UNIQUE_ID);

        restLoadMockMvc.perform(put("/api/loads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLoad)))
            .andExpect(status().isOk());

        // Validate the Load in the database
        List<Load> loadList = loadRepository.findAll();
        assertThat(loadList).hasSize(databaseSizeBeforeUpdate);
        Load testLoad = loadList.get(loadList.size() - 1);
        assertThat(testLoad.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testLoad.getUniqueId()).isEqualTo(UPDATED_UNIQUE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingLoad() throws Exception {
        int databaseSizeBeforeUpdate = loadRepository.findAll().size();

        // Create the Load

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLoadMockMvc.perform(put("/api/loads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(load)))
            .andExpect(status().isBadRequest());

        // Validate the Load in the database
        List<Load> loadList = loadRepository.findAll();
        assertThat(loadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLoad() throws Exception {
        // Initialize the database
        loadRepository.saveAndFlush(load);

        int databaseSizeBeforeDelete = loadRepository.findAll().size();

        // Delete the load
        restLoadMockMvc.perform(delete("/api/loads/{id}", load.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Load> loadList = loadRepository.findAll();
        assertThat(loadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Load.class);
        Load load1 = new Load();
        load1.setId(1L);
        Load load2 = new Load();
        load2.setId(load1.getId());
        assertThat(load1).isEqualTo(load2);
        load2.setId(2L);
        assertThat(load1).isNotEqualTo(load2);
        load1.setId(null);
        assertThat(load1).isNotEqualTo(load2);
    }
}
