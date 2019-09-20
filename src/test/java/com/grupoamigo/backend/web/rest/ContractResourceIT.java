package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.GrupoAmigoBackendApp;
import com.grupoamigo.backend.domain.Contract;
import com.grupoamigo.backend.repository.ContractRepository;
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
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.grupoamigo.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.grupoamigo.backend.domain.enumeration.ContractType;
import com.grupoamigo.backend.domain.enumeration.ContractStatusType;
/**
 * Integration tests for the {@link ContractResource} REST controller.
 */
@SpringBootTest(classes = GrupoAmigoBackendApp.class)
public class ContractResourceIT {

    private static final ContractType DEFAULT_TYPE = ContractType.PRESTACION_DE_SERVICIO;
    private static final ContractType UPDATED_TYPE = ContractType.TERMINOS_Y_CONDICIONES;

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_LEGAL_PROSE = "AAAAAAAAAA";
    private static final String UPDATED_LEGAL_PROSE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_SIGNATURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_SIGNATURE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_SIGNATURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_SIGNATURE_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_CONTRACT_FILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CONTRACT_FILE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CONTRACT_FILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CONTRACT_FILE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DIGITAL_FINGERPRINT = "AAAAAAAAAA";
    private static final String UPDATED_DIGITAL_FINGERPRINT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_SIGNED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_SIGNED = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_DATE_SIGNED = Instant.ofEpochMilli(-1L);

    private static final LocalDate DEFAULT_EXPIRATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRATION_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_EXPIRATION_DATE = LocalDate.ofEpochDay(-1L);

    private static final ContractStatusType DEFAULT_STATUS = ContractStatusType.EMITIDO;
    private static final ContractStatusType UPDATED_STATUS = ContractStatusType.FIRMADO;

    @Autowired
    private ContractRepository contractRepository;

    @Mock
    private ContractRepository contractRepositoryMock;

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

    private MockMvc restContractMockMvc;

    private Contract contract;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContractResource contractResource = new ContractResource(contractRepository);
        this.restContractMockMvc = MockMvcBuilders.standaloneSetup(contractResource)
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
    public static Contract createEntity(EntityManager em) {
        Contract contract = new Contract()
            .type(DEFAULT_TYPE)
            .title(DEFAULT_TITLE)
            .legalProse(DEFAULT_LEGAL_PROSE)
            .signature(DEFAULT_SIGNATURE)
            .signatureContentType(DEFAULT_SIGNATURE_CONTENT_TYPE)
            .contractFile(DEFAULT_CONTRACT_FILE)
            .contractFileContentType(DEFAULT_CONTRACT_FILE_CONTENT_TYPE)
            .digitalFingerprint(DEFAULT_DIGITAL_FINGERPRINT)
            .dateSigned(DEFAULT_DATE_SIGNED)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .status(DEFAULT_STATUS);
        return contract;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contract createUpdatedEntity(EntityManager em) {
        Contract contract = new Contract()
            .type(UPDATED_TYPE)
            .title(UPDATED_TITLE)
            .legalProse(UPDATED_LEGAL_PROSE)
            .signature(UPDATED_SIGNATURE)
            .signatureContentType(UPDATED_SIGNATURE_CONTENT_TYPE)
            .contractFile(UPDATED_CONTRACT_FILE)
            .contractFileContentType(UPDATED_CONTRACT_FILE_CONTENT_TYPE)
            .digitalFingerprint(UPDATED_DIGITAL_FINGERPRINT)
            .dateSigned(UPDATED_DATE_SIGNED)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .status(UPDATED_STATUS);
        return contract;
    }

    @BeforeEach
    public void initTest() {
        contract = createEntity(em);
    }

    @Test
    @Transactional
    public void createContract() throws Exception {
        int databaseSizeBeforeCreate = contractRepository.findAll().size();

        // Create the Contract
        restContractMockMvc.perform(post("/api/contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contract)))
            .andExpect(status().isCreated());

        // Validate the Contract in the database
        List<Contract> contractList = contractRepository.findAll();
        assertThat(contractList).hasSize(databaseSizeBeforeCreate + 1);
        Contract testContract = contractList.get(contractList.size() - 1);
        assertThat(testContract.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testContract.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testContract.getLegalProse()).isEqualTo(DEFAULT_LEGAL_PROSE);
        assertThat(testContract.getSignature()).isEqualTo(DEFAULT_SIGNATURE);
        assertThat(testContract.getSignatureContentType()).isEqualTo(DEFAULT_SIGNATURE_CONTENT_TYPE);
        assertThat(testContract.getContractFile()).isEqualTo(DEFAULT_CONTRACT_FILE);
        assertThat(testContract.getContractFileContentType()).isEqualTo(DEFAULT_CONTRACT_FILE_CONTENT_TYPE);
        assertThat(testContract.getDigitalFingerprint()).isEqualTo(DEFAULT_DIGITAL_FINGERPRINT);
        assertThat(testContract.getDateSigned()).isEqualTo(DEFAULT_DATE_SIGNED);
        assertThat(testContract.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testContract.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createContractWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contractRepository.findAll().size();

        // Create the Contract with an existing ID
        contract.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContractMockMvc.perform(post("/api/contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contract)))
            .andExpect(status().isBadRequest());

        // Validate the Contract in the database
        List<Contract> contractList = contractRepository.findAll();
        assertThat(contractList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = contractRepository.findAll().size();
        // set the field null
        contract.setType(null);

        // Create the Contract, which fails.

        restContractMockMvc.perform(post("/api/contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contract)))
            .andExpect(status().isBadRequest());

        List<Contract> contractList = contractRepository.findAll();
        assertThat(contractList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = contractRepository.findAll().size();
        // set the field null
        contract.setTitle(null);

        // Create the Contract, which fails.

        restContractMockMvc.perform(post("/api/contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contract)))
            .andExpect(status().isBadRequest());

        List<Contract> contractList = contractRepository.findAll();
        assertThat(contractList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLegalProseIsRequired() throws Exception {
        int databaseSizeBeforeTest = contractRepository.findAll().size();
        // set the field null
        contract.setLegalProse(null);

        // Create the Contract, which fails.

        restContractMockMvc.perform(post("/api/contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contract)))
            .andExpect(status().isBadRequest());

        List<Contract> contractList = contractRepository.findAll();
        assertThat(contractList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContracts() throws Exception {
        // Initialize the database
        contractRepository.saveAndFlush(contract);

        // Get all the contractList
        restContractMockMvc.perform(get("/api/contracts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contract.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].legalProse").value(hasItem(DEFAULT_LEGAL_PROSE.toString())))
            .andExpect(jsonPath("$.[*].signatureContentType").value(hasItem(DEFAULT_SIGNATURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].signature").value(hasItem(Base64Utils.encodeToString(DEFAULT_SIGNATURE))))
            .andExpect(jsonPath("$.[*].contractFileContentType").value(hasItem(DEFAULT_CONTRACT_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].contractFile").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONTRACT_FILE))))
            .andExpect(jsonPath("$.[*].digitalFingerprint").value(hasItem(DEFAULT_DIGITAL_FINGERPRINT.toString())))
            .andExpect(jsonPath("$.[*].dateSigned").value(hasItem(DEFAULT_DATE_SIGNED.toString())))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllContractsWithEagerRelationshipsIsEnabled() throws Exception {
        ContractResource contractResource = new ContractResource(contractRepositoryMock);
        when(contractRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restContractMockMvc = MockMvcBuilders.standaloneSetup(contractResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restContractMockMvc.perform(get("/api/contracts?eagerload=true"))
        .andExpect(status().isOk());

        verify(contractRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllContractsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ContractResource contractResource = new ContractResource(contractRepositoryMock);
            when(contractRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restContractMockMvc = MockMvcBuilders.standaloneSetup(contractResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restContractMockMvc.perform(get("/api/contracts?eagerload=true"))
        .andExpect(status().isOk());

            verify(contractRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getContract() throws Exception {
        // Initialize the database
        contractRepository.saveAndFlush(contract);

        // Get the contract
        restContractMockMvc.perform(get("/api/contracts/{id}", contract.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contract.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.legalProse").value(DEFAULT_LEGAL_PROSE.toString()))
            .andExpect(jsonPath("$.signatureContentType").value(DEFAULT_SIGNATURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.signature").value(Base64Utils.encodeToString(DEFAULT_SIGNATURE)))
            .andExpect(jsonPath("$.contractFileContentType").value(DEFAULT_CONTRACT_FILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.contractFile").value(Base64Utils.encodeToString(DEFAULT_CONTRACT_FILE)))
            .andExpect(jsonPath("$.digitalFingerprint").value(DEFAULT_DIGITAL_FINGERPRINT.toString()))
            .andExpect(jsonPath("$.dateSigned").value(DEFAULT_DATE_SIGNED.toString()))
            .andExpect(jsonPath("$.expirationDate").value(DEFAULT_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContract() throws Exception {
        // Get the contract
        restContractMockMvc.perform(get("/api/contracts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContract() throws Exception {
        // Initialize the database
        contractRepository.saveAndFlush(contract);

        int databaseSizeBeforeUpdate = contractRepository.findAll().size();

        // Update the contract
        Contract updatedContract = contractRepository.findById(contract.getId()).get();
        // Disconnect from session so that the updates on updatedContract are not directly saved in db
        em.detach(updatedContract);
        updatedContract
            .type(UPDATED_TYPE)
            .title(UPDATED_TITLE)
            .legalProse(UPDATED_LEGAL_PROSE)
            .signature(UPDATED_SIGNATURE)
            .signatureContentType(UPDATED_SIGNATURE_CONTENT_TYPE)
            .contractFile(UPDATED_CONTRACT_FILE)
            .contractFileContentType(UPDATED_CONTRACT_FILE_CONTENT_TYPE)
            .digitalFingerprint(UPDATED_DIGITAL_FINGERPRINT)
            .dateSigned(UPDATED_DATE_SIGNED)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .status(UPDATED_STATUS);

        restContractMockMvc.perform(put("/api/contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContract)))
            .andExpect(status().isOk());

        // Validate the Contract in the database
        List<Contract> contractList = contractRepository.findAll();
        assertThat(contractList).hasSize(databaseSizeBeforeUpdate);
        Contract testContract = contractList.get(contractList.size() - 1);
        assertThat(testContract.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testContract.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testContract.getLegalProse()).isEqualTo(UPDATED_LEGAL_PROSE);
        assertThat(testContract.getSignature()).isEqualTo(UPDATED_SIGNATURE);
        assertThat(testContract.getSignatureContentType()).isEqualTo(UPDATED_SIGNATURE_CONTENT_TYPE);
        assertThat(testContract.getContractFile()).isEqualTo(UPDATED_CONTRACT_FILE);
        assertThat(testContract.getContractFileContentType()).isEqualTo(UPDATED_CONTRACT_FILE_CONTENT_TYPE);
        assertThat(testContract.getDigitalFingerprint()).isEqualTo(UPDATED_DIGITAL_FINGERPRINT);
        assertThat(testContract.getDateSigned()).isEqualTo(UPDATED_DATE_SIGNED);
        assertThat(testContract.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testContract.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingContract() throws Exception {
        int databaseSizeBeforeUpdate = contractRepository.findAll().size();

        // Create the Contract

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContractMockMvc.perform(put("/api/contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contract)))
            .andExpect(status().isBadRequest());

        // Validate the Contract in the database
        List<Contract> contractList = contractRepository.findAll();
        assertThat(contractList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContract() throws Exception {
        // Initialize the database
        contractRepository.saveAndFlush(contract);

        int databaseSizeBeforeDelete = contractRepository.findAll().size();

        // Delete the contract
        restContractMockMvc.perform(delete("/api/contracts/{id}", contract.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Contract> contractList = contractRepository.findAll();
        assertThat(contractList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contract.class);
        Contract contract1 = new Contract();
        contract1.setId(1L);
        Contract contract2 = new Contract();
        contract2.setId(contract1.getId());
        assertThat(contract1).isEqualTo(contract2);
        contract2.setId(2L);
        assertThat(contract1).isNotEqualTo(contract2);
        contract1.setId(null);
        assertThat(contract1).isNotEqualTo(contract2);
    }
}