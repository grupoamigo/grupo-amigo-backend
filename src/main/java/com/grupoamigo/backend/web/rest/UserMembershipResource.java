package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.domain.UserMembership;
import com.grupoamigo.backend.repository.UserMembershipRepository;
import com.grupoamigo.backend.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.grupoamigo.backend.domain.UserMembership}.
 */
@RestController
@RequestMapping("/api")
public class UserMembershipResource {

    private final Logger log = LoggerFactory.getLogger(UserMembershipResource.class);

    private static final String ENTITY_NAME = "userMembership";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserMembershipRepository userMembershipRepository;

    public UserMembershipResource(UserMembershipRepository userMembershipRepository) {
        this.userMembershipRepository = userMembershipRepository;
    }

    /**
     * {@code POST  /user-memberships} : Create a new userMembership.
     *
     * @param userMembership the userMembership to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userMembership, or with status {@code 400 (Bad Request)} if the userMembership has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-memberships")
    public ResponseEntity<UserMembership> createUserMembership(@RequestBody UserMembership userMembership) throws URISyntaxException {
        log.debug("REST request to save UserMembership : {}", userMembership);
        if (userMembership.getId() != null) {
            throw new BadRequestAlertException("A new userMembership cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserMembership result = userMembershipRepository.save(userMembership);
        return ResponseEntity.created(new URI("/api/user-memberships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-memberships} : Updates an existing userMembership.
     *
     * @param userMembership the userMembership to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userMembership,
     * or with status {@code 400 (Bad Request)} if the userMembership is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userMembership couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-memberships")
    public ResponseEntity<UserMembership> updateUserMembership(@RequestBody UserMembership userMembership) throws URISyntaxException {
        log.debug("REST request to update UserMembership : {}", userMembership);
        if (userMembership.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserMembership result = userMembershipRepository.save(userMembership);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userMembership.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-memberships} : get all the userMemberships.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userMemberships in body.
     */
    @GetMapping("/user-memberships")
    public List<UserMembership> getAllUserMemberships() {
        log.debug("REST request to get all UserMemberships");
        return userMembershipRepository.findAll();
    }

    /**
     * {@code GET  /user-memberships/:id} : get the "id" userMembership.
     *
     * @param id the id of the userMembership to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userMembership, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-memberships/{id}")
    public ResponseEntity<UserMembership> getUserMembership(@PathVariable Long id) {
        log.debug("REST request to get UserMembership : {}", id);
        Optional<UserMembership> userMembership = userMembershipRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userMembership);
    }

    /**
     * {@code DELETE  /user-memberships/:id} : delete the "id" userMembership.
     *
     * @param id the id of the userMembership to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-memberships/{id}")
    public ResponseEntity<Void> deleteUserMembership(@PathVariable Long id) {
        log.debug("REST request to delete UserMembership : {}", id);
        userMembershipRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
