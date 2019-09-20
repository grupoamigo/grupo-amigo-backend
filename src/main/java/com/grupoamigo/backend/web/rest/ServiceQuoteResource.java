package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.domain.ServiceQuote;
import com.grupoamigo.backend.repository.ServiceQuoteRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.grupoamigo.backend.domain.ServiceQuote}.
 */
@RestController
@RequestMapping("/api")
public class ServiceQuoteResource {

    private final Logger log = LoggerFactory.getLogger(ServiceQuoteResource.class);

    private static final String ENTITY_NAME = "serviceQuote";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceQuoteRepository serviceQuoteRepository;

    public ServiceQuoteResource(ServiceQuoteRepository serviceQuoteRepository) {
        this.serviceQuoteRepository = serviceQuoteRepository;
    }

    /**
     * {@code POST  /service-quotes} : Create a new serviceQuote.
     *
     * @param serviceQuote the serviceQuote to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceQuote, or with status {@code 400 (Bad Request)} if the serviceQuote has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-quotes")
    public ResponseEntity<ServiceQuote> createServiceQuote(@Valid @RequestBody ServiceQuote serviceQuote) throws URISyntaxException {
        log.debug("REST request to save ServiceQuote : {}", serviceQuote);
        if (serviceQuote.getId() != null) {
            throw new BadRequestAlertException("A new serviceQuote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceQuote result = serviceQuoteRepository.save(serviceQuote);
        return ResponseEntity.created(new URI("/api/service-quotes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-quotes} : Updates an existing serviceQuote.
     *
     * @param serviceQuote the serviceQuote to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceQuote,
     * or with status {@code 400 (Bad Request)} if the serviceQuote is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceQuote couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-quotes")
    public ResponseEntity<ServiceQuote> updateServiceQuote(@Valid @RequestBody ServiceQuote serviceQuote) throws URISyntaxException {
        log.debug("REST request to update ServiceQuote : {}", serviceQuote);
        if (serviceQuote.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceQuote result = serviceQuoteRepository.save(serviceQuote);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceQuote.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-quotes} : get all the serviceQuotes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceQuotes in body.
     */
    @GetMapping("/service-quotes")
    public List<ServiceQuote> getAllServiceQuotes(@RequestParam(required = false) String filter,@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("contract-is-null".equals(filter)) {
            log.debug("REST request to get all ServiceQuotes where contract is null");
            return StreamSupport
                .stream(serviceQuoteRepository.findAll().spliterator(), false)
                .filter(serviceQuote -> serviceQuote.getContract() == null)
                .collect(Collectors.toList());
        }
        if ("servicerequest-is-null".equals(filter)) {
            log.debug("REST request to get all ServiceQuotes where serviceRequest is null");
            return StreamSupport
                .stream(serviceQuoteRepository.findAll().spliterator(), false)
                .filter(serviceQuote -> serviceQuote.getServiceRequest() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ServiceQuotes");
        return serviceQuoteRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /service-quotes/:id} : get the "id" serviceQuote.
     *
     * @param id the id of the serviceQuote to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceQuote, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-quotes/{id}")
    public ResponseEntity<ServiceQuote> getServiceQuote(@PathVariable Long id) {
        log.debug("REST request to get ServiceQuote : {}", id);
        Optional<ServiceQuote> serviceQuote = serviceQuoteRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(serviceQuote);
    }

    /**
     * {@code DELETE  /service-quotes/:id} : delete the "id" serviceQuote.
     *
     * @param id the id of the serviceQuote to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-quotes/{id}")
    public ResponseEntity<Void> deleteServiceQuote(@PathVariable Long id) {
        log.debug("REST request to delete ServiceQuote : {}", id);
        serviceQuoteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
