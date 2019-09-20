package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.GrupoAmigoBackendApp;
import com.grupoamigo.backend.domain.UserMembership;
import com.grupoamigo.backend.repository.UserMembershipRepository;
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
 * Integration tests for the {@link UserMembershipResource} REST controller.
 */
@SpringBootTest(classes = GrupoAmigoBackendApp.class)
public class UserMembershipResourceIT {

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private UserMembershipRepository userMembershipRepository;

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

    private MockMvc restUserMembershipMockMvc;

    private UserMembership userMembership;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserMembershipResource userMembershipResource = new UserMembershipResource(userMembershipRepository);
        this.restUserMembershipMockMvc = MockMvcBuilders.standaloneSetup(userMembershipResource)
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
    public static UserMembership createEntity(EntityManager em) {
        UserMembership userMembership = new UserMembership()
            .phone(DEFAULT_PHONE);
        return userMembership;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserMembership createUpdatedEntity(EntityManager em) {
        UserMembership userMembership = new UserMembership()
            .phone(UPDATED_PHONE);
        return userMembership;
    }

    @BeforeEach
    public void initTest() {
        userMembership = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserMembership() throws Exception {
        int databaseSizeBeforeCreate = userMembershipRepository.findAll().size();

        // Create the UserMembership
        restUserMembershipMockMvc.perform(post("/api/user-memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMembership)))
            .andExpect(status().isCreated());

        // Validate the UserMembership in the database
        List<UserMembership> userMembershipList = userMembershipRepository.findAll();
        assertThat(userMembershipList).hasSize(databaseSizeBeforeCreate + 1);
        UserMembership testUserMembership = userMembershipList.get(userMembershipList.size() - 1);
        assertThat(testUserMembership.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    @Transactional
    public void createUserMembershipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userMembershipRepository.findAll().size();

        // Create the UserMembership with an existing ID
        userMembership.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserMembershipMockMvc.perform(post("/api/user-memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMembership)))
            .andExpect(status().isBadRequest());

        // Validate the UserMembership in the database
        List<UserMembership> userMembershipList = userMembershipRepository.findAll();
        assertThat(userMembershipList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserMemberships() throws Exception {
        // Initialize the database
        userMembershipRepository.saveAndFlush(userMembership);

        // Get all the userMembershipList
        restUserMembershipMockMvc.perform(get("/api/user-memberships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userMembership.getId().intValue())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }
    
    @Test
    @Transactional
    public void getUserMembership() throws Exception {
        // Initialize the database
        userMembershipRepository.saveAndFlush(userMembership);

        // Get the userMembership
        restUserMembershipMockMvc.perform(get("/api/user-memberships/{id}", userMembership.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userMembership.getId().intValue()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserMembership() throws Exception {
        // Get the userMembership
        restUserMembershipMockMvc.perform(get("/api/user-memberships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserMembership() throws Exception {
        // Initialize the database
        userMembershipRepository.saveAndFlush(userMembership);

        int databaseSizeBeforeUpdate = userMembershipRepository.findAll().size();

        // Update the userMembership
        UserMembership updatedUserMembership = userMembershipRepository.findById(userMembership.getId()).get();
        // Disconnect from session so that the updates on updatedUserMembership are not directly saved in db
        em.detach(updatedUserMembership);
        updatedUserMembership
            .phone(UPDATED_PHONE);

        restUserMembershipMockMvc.perform(put("/api/user-memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserMembership)))
            .andExpect(status().isOk());

        // Validate the UserMembership in the database
        List<UserMembership> userMembershipList = userMembershipRepository.findAll();
        assertThat(userMembershipList).hasSize(databaseSizeBeforeUpdate);
        UserMembership testUserMembership = userMembershipList.get(userMembershipList.size() - 1);
        assertThat(testUserMembership.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserMembership() throws Exception {
        int databaseSizeBeforeUpdate = userMembershipRepository.findAll().size();

        // Create the UserMembership

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserMembershipMockMvc.perform(put("/api/user-memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMembership)))
            .andExpect(status().isBadRequest());

        // Validate the UserMembership in the database
        List<UserMembership> userMembershipList = userMembershipRepository.findAll();
        assertThat(userMembershipList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserMembership() throws Exception {
        // Initialize the database
        userMembershipRepository.saveAndFlush(userMembership);

        int databaseSizeBeforeDelete = userMembershipRepository.findAll().size();

        // Delete the userMembership
        restUserMembershipMockMvc.perform(delete("/api/user-memberships/{id}", userMembership.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserMembership> userMembershipList = userMembershipRepository.findAll();
        assertThat(userMembershipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserMembership.class);
        UserMembership userMembership1 = new UserMembership();
        userMembership1.setId(1L);
        UserMembership userMembership2 = new UserMembership();
        userMembership2.setId(userMembership1.getId());
        assertThat(userMembership1).isEqualTo(userMembership2);
        userMembership2.setId(2L);
        assertThat(userMembership1).isNotEqualTo(userMembership2);
        userMembership1.setId(null);
        assertThat(userMembership1).isNotEqualTo(userMembership2);
    }
}
