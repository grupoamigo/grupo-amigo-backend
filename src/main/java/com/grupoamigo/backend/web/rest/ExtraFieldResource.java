package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.domain.ExtraField;
import com.grupoamigo.backend.repository.ExtraFieldRepository;
import com.grupoamigo.backend.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.grupoamigo.backend.domain.ExtraField}.
 */
@RestController
@RequestMapping("/api")
public class ExtraFieldResource {

    private final Logger log = LoggerFactory.getLogger(ExtraFieldResource.class);

    private static final String ENTITY_NAME = "extraField";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtraFieldRepository extraFieldRepository;

    public ExtraFieldResource(ExtraFieldRepository extraFieldRepository) {
        this.extraFieldRepository = extraFieldRepository;
    }

    /**
     * {@code POST  /extra-fields} : Create a new extraField.
     *
     * @param extraField the extraField to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extraField, or with status {@code 400 (Bad Request)} if the extraField has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extra-fields")
    public ResponseEntity<ExtraField> createExtraField(@Valid @RequestBody ExtraField extraField) throws URISyntaxException {
        log.debug("REST request to save ExtraField : {}", extraField);
        if (extraField.getId() != null) {
            throw new BadRequestAlertException("A new extraField cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtraField result = extraFieldRepository.save(extraField);
        return ResponseEntity.created(new URI("/api/extra-fields/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extra-fields} : Updates an existing extraField.
     *
     * @param extraField the extraField to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extraField,
     * or with status {@code 400 (Bad Request)} if the extraField is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extraField couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extra-fields")
    public ResponseEntity<ExtraField> updateExtraField(@Valid @RequestBody ExtraField extraField) throws URISyntaxException {
        log.debug("REST request to update ExtraField : {}", extraField);
        if (extraField.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExtraField result = extraFieldRepository.save(extraField);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extraField.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extra-fields} : get all the extraFields.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extraFields in body.
     */
    @GetMapping("/extra-fields")
    public List<ExtraField> getAllExtraFields() {
        log.debug("REST request to get all ExtraFields");
        return extraFieldRepository.findAll();
    }

    /**
     * {@code GET  /extra-fields/:id} : get the "id" extraField.
     *
     * @param id the id of the extraField to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extraField, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extra-fields/{id}")
    public ResponseEntity<ExtraField> getExtraField(@PathVariable Long id) {
        log.debug("REST request to get ExtraField : {}", id);
        Optional<ExtraField> extraField = extraFieldRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(extraField);
    }

    /**
     * {@code DELETE  /extra-fields/:id} : delete the "id" extraField.
     *
     * @param id the id of the extraField to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extra-fields/{id}")
    public ResponseEntity<Void> deleteExtraField(@PathVariable Long id) {
        log.debug("REST request to delete ExtraField : {}", id);
        extraFieldRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
