package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.GrupoAmigoBackendApp;
import com.grupoamigo.backend.domain.ManouverRequest;
import com.grupoamigo.backend.repository.ManouverRequestRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.grupoamigo.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.grupoamigo.backend.domain.enumeration.TransportType;
import com.grupoamigo.backend.domain.enumeration.CurrencyType;
/**
 * Integration tests for the {@link ManouverRequestResource} REST controller.
 */
@SpringBootTest(classes = GrupoAmigoBackendApp.class)
public class ManouverRequestResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE = LocalDate.ofEpochDay(-1L);

    private static final TransportType DEFAULT_TRANSPORT = TransportType.CAMION;
    private static final TransportType UPDATED_TRANSPORT = TransportType.FFCC;

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;
    private static final Float SMALLER_PRICE = 1F - 1F;

    private static final CurrencyType DEFAULT_CURRENCY = CurrencyType.MXN;
    private static final CurrencyType UPDATED_CURRENCY = CurrencyType.USD;

    private static final byte[] DEFAULT_QR_CODE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_QR_CODE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_QR_CODE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_QR_CODE_CONTENT_TYPE = "image/png";

    @Autowired
    private ManouverRequestRepository manouverRequestRepository;

    @Mock
    private ManouverRequestRepository manouverRequestRepositoryMock;

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

    private MockMvc restManouverRequestMockMvc;

    private ManouverRequest manouverRequest;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ManouverRequestResource manouverRequestResource = new ManouverRequestResource(manouverRequestRepository);
        this.restManouverRequestMockMvc = MockMvcBuilders.standaloneSetup(manouverRequestResource)
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
    public static ManouverRequest createEntity(EntityManager em) {
        ManouverRequest manouverRequest = new ManouverRequest()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .date(DEFAULT_DATE)
            .transport(DEFAULT_TRANSPORT)
            .price(DEFAULT_PRICE)
            .currency(DEFAULT_CURRENCY)
            .qrCode(DEFAULT_QR_CODE)
            .qrCodeContentType(DEFAULT_QR_CODE_CONTENT_TYPE);
        return manouverRequest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ManouverRequest createUpdatedEntity(EntityManager em) {
        ManouverRequest manouverRequest = new ManouverRequest()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE)
            .transport(UPDATED_TRANSPORT)
            .price(UPDATED_PRICE)
            .currency(UPDATED_CURRENCY)
            .qrCode(UPDATED_QR_CODE)
            .qrCodeContentType(UPDATED_QR_CODE_CONTENT_TYPE);
        return manouverRequest;
    }

    @BeforeEach
    public void initTest() {
        manouverRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createManouverRequest() throws Exception {
        int databaseSizeBeforeCreate = manouverRequestRepository.findAll().size();

        // Create the ManouverRequest
        restManouverRequestMockMvc.perform(post("/api/manouver-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouverRequest)))
            .andExpect(status().isCreated());

        // Validate the ManouverRequest in the database
        List<ManouverRequest> manouverRequestList = manouverRequestRepository.findAll();
        assertThat(manouverRequestList).hasSize(databaseSizeBeforeCreate + 1);
        ManouverRequest testManouverRequest = manouverRequestList.get(manouverRequestList.size() - 1);
        assertThat(testManouverRequest.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testManouverRequest.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testManouverRequest.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testManouverRequest.getTransport()).isEqualTo(DEFAULT_TRANSPORT);
        assertThat(testManouverRequest.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testManouverRequest.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testManouverRequest.getQrCode()).isEqualTo(DEFAULT_QR_CODE);
        assertThat(testManouverRequest.getQrCodeContentType()).isEqualTo(DEFAULT_QR_CODE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createManouverRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = manouverRequestRepository.findAll().size();

        // Create the ManouverRequest with an existing ID
        manouverRequest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restManouverRequestMockMvc.perform(post("/api/manouver-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouverRequest)))
            .andExpect(status().isBadRequest());

        // Validate the ManouverRequest in the database
        List<ManouverRequest> manouverRequestList = manouverRequestRepository.findAll();
        assertThat(manouverRequestList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = manouverRequestRepository.findAll().size();
        // set the field null
        manouverRequest.setTitle(null);

        // Create the ManouverRequest, which fails.

        restManouverRequestMockMvc.perform(post("/api/manouver-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouverRequest)))
            .andExpect(status().isBadRequest());

        List<ManouverRequest> manouverRequestList = manouverRequestRepository.findAll();
        assertThat(manouverRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = manouverRequestRepository.findAll().size();
        // set the field null
        manouverRequest.setDescription(null);

        // Create the ManouverRequest, which fails.

        restManouverRequestMockMvc.perform(post("/api/manouver-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouverRequest)))
            .andExpect(status().isBadRequest());

        List<ManouverRequest> manouverRequestList = manouverRequestRepository.findAll();
        assertThat(manouverRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = manouverRequestRepository.findAll().size();
        // set the field null
        manouverRequest.setDate(null);

        // Create the ManouverRequest, which fails.

        restManouverRequestMockMvc.perform(post("/api/manouver-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouverRequest)))
            .andExpect(status().isBadRequest());

        List<ManouverRequest> manouverRequestList = manouverRequestRepository.findAll();
        assertThat(manouverRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllManouverRequests() throws Exception {
        // Initialize the database
        manouverRequestRepository.saveAndFlush(manouverRequest);

        // Get all the manouverRequestList
        restManouverRequestMockMvc.perform(get("/api/manouver-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(manouverRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].transport").value(hasItem(DEFAULT_TRANSPORT.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].qrCodeContentType").value(hasItem(DEFAULT_QR_CODE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].qrCode").value(hasItem(Base64Utils.encodeToString(DEFAULT_QR_CODE))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllManouverRequestsWithEagerRelationshipsIsEnabled() throws Exception {
        ManouverRequestResource manouverRequestResource = new ManouverRequestResource(manouverRequestRepositoryMock);
        when(manouverRequestRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restManouverRequestMockMvc = MockMvcBuilders.standaloneSetup(manouverRequestResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restManouverRequestMockMvc.perform(get("/api/manouver-requests?eagerload=true"))
        .andExpect(status().isOk());

        verify(manouverRequestRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllManouverRequestsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ManouverRequestResource manouverRequestResource = new ManouverRequestResource(manouverRequestRepositoryMock);
            when(manouverRequestRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restManouverRequestMockMvc = MockMvcBuilders.standaloneSetup(manouverRequestResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restManouverRequestMockMvc.perform(get("/api/manouver-requests?eagerload=true"))
        .andExpect(status().isOk());

            verify(manouverRequestRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getManouverRequest() throws Exception {
        // Initialize the database
        manouverRequestRepository.saveAndFlush(manouverRequest);

        // Get the manouverRequest
        restManouverRequestMockMvc.perform(get("/api/manouver-requests/{id}", manouverRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(manouverRequest.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.transport").value(DEFAULT_TRANSPORT.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()))
            .andExpect(jsonPath("$.qrCodeContentType").value(DEFAULT_QR_CODE_CONTENT_TYPE))
            .andExpect(jsonPath("$.qrCode").value(Base64Utils.encodeToString(DEFAULT_QR_CODE)));
    }

    @Test
    @Transactional
    public void getNonExistingManouverRequest() throws Exception {
        // Get the manouverRequest
        restManouverRequestMockMvc.perform(get("/api/manouver-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateManouverRequest() throws Exception {
        // Initialize the database
        manouverRequestRepository.saveAndFlush(manouverRequest);

        int databaseSizeBeforeUpdate = manouverRequestRepository.findAll().size();

        // Update the manouverRequest
        ManouverRequest updatedManouverRequest = manouverRequestRepository.findById(manouverRequest.getId()).get();
        // Disconnect from session so that the updates on updatedManouverRequest are not directly saved in db
        em.detach(updatedManouverRequest);
        updatedManouverRequest
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE)
            .transport(UPDATED_TRANSPORT)
            .price(UPDATED_PRICE)
            .currency(UPDATED_CURRENCY)
            .qrCode(UPDATED_QR_CODE)
            .qrCodeContentType(UPDATED_QR_CODE_CONTENT_TYPE);

        restManouverRequestMockMvc.perform(put("/api/manouver-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedManouverRequest)))
            .andExpect(status().isOk());

        // Validate the ManouverRequest in the database
        List<ManouverRequest> manouverRequestList = manouverRequestRepository.findAll();
        assertThat(manouverRequestList).hasSize(databaseSizeBeforeUpdate);
        ManouverRequest testManouverRequest = manouverRequestList.get(manouverRequestList.size() - 1);
        assertThat(testManouverRequest.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testManouverRequest.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testManouverRequest.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testManouverRequest.getTransport()).isEqualTo(UPDATED_TRANSPORT);
        assertThat(testManouverRequest.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testManouverRequest.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testManouverRequest.getQrCode()).isEqualTo(UPDATED_QR_CODE);
        assertThat(testManouverRequest.getQrCodeContentType()).isEqualTo(UPDATED_QR_CODE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingManouverRequest() throws Exception {
        int databaseSizeBeforeUpdate = manouverRequestRepository.findAll().size();

        // Create the ManouverRequest

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restManouverRequestMockMvc.perform(put("/api/manouver-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manouverRequest)))
            .andExpect(status().isBadRequest());

        // Validate the ManouverRequest in the database
        List<ManouverRequest> manouverRequestList = manouverRequestRepository.findAll();
        assertThat(manouverRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteManouverRequest() throws Exception {
        // Initialize the database
        manouverRequestRepository.saveAndFlush(manouverRequest);

        int databaseSizeBeforeDelete = manouverRequestRepository.findAll().size();

        // Delete the manouverRequest
        restManouverRequestMockMvc.perform(delete("/api/manouver-requests/{id}", manouverRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ManouverRequest> manouverRequestList = manouverRequestRepository.findAll();
        assertThat(manouverRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ManouverRequest.class);
        ManouverRequest manouverRequest1 = new ManouverRequest();
        manouverRequest1.setId(1L);
        ManouverRequest manouverRequest2 = new ManouverRequest();
        manouverRequest2.setId(manouverRequest1.getId());
        assertThat(manouverRequest1).isEqualTo(manouverRequest2);
        manouverRequest2.setId(2L);
        assertThat(manouverRequest1).isNotEqualTo(manouverRequest2);
        manouverRequest1.setId(null);
        assertThat(manouverRequest1).isNotEqualTo(manouverRequest2);
    }
}
