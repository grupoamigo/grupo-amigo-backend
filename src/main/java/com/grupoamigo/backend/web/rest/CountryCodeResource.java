package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.domain.CountryCode;
import com.grupoamigo.backend.repository.CountryCodeRepository;
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
 * REST controller for managing {@link com.grupoamigo.backend.domain.CountryCode}.
 */
@RestController
@RequestMapping("/api")
public class CountryCodeResource {

    private final Logger log = LoggerFactory.getLogger(CountryCodeResource.class);

    private static final String ENTITY_NAME = "countryCode";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CountryCodeRepository countryCodeRepository;

    public CountryCodeResource(CountryCodeRepository countryCodeRepository) {
        this.countryCodeRepository = countryCodeRepository;
    }

    /**
     * {@code POST  /country-codes} : Create a new countryCode.
     *
     * @param countryCode the countryCode to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new countryCode, or with status {@code 400 (Bad Request)} if the countryCode has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/country-codes")
    public ResponseEntity<CountryCode> createCountryCode(@Valid @RequestBody CountryCode countryCode) throws URISyntaxException {
        log.debug("REST request to save CountryCode : {}", countryCode);
        if (countryCode.getId() != null) {
            throw new BadRequestAlertException("A new countryCode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CountryCode result = countryCodeRepository.save(countryCode);
        return ResponseEntity.created(new URI("/api/country-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /country-codes} : Updates an existing countryCode.
     *
     * @param countryCode the countryCode to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated countryCode,
     * or with status {@code 400 (Bad Request)} if the countryCode is not valid,
     * or with status {@code 500 (Internal Server Error)} if the countryCode couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/country-codes")
    public ResponseEntity<CountryCode> updateCountryCode(@Valid @RequestBody CountryCode countryCode) throws URISyntaxException {
        log.debug("REST request to update CountryCode : {}", countryCode);
        if (countryCode.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CountryCode result = countryCodeRepository.save(countryCode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, countryCode.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /country-codes} : get all the countryCodes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of countryCodes in body.
     */
    @GetMapping("/country-codes")
    public List<CountryCode> getAllCountryCodes() {
        log.debug("REST request to get all CountryCodes");
        return countryCodeRepository.findAll();
    }

    /**
     * {@code GET  /country-codes/:id} : get the "id" countryCode.
     *
     * @param id the id of the countryCode to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the countryCode, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/country-codes/{id}")
    public ResponseEntity<CountryCode> getCountryCode(@PathVariable Long id) {
        log.debug("REST request to get CountryCode : {}", id);
        Optional<CountryCode> countryCode = countryCodeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(countryCode);
    }

    /**
     * {@code DELETE  /country-codes/:id} : delete the "id" countryCode.
     *
     * @param id the id of the countryCode to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/country-codes/{id}")
    public ResponseEntity<Void> deleteCountryCode(@PathVariable Long id) {
        log.debug("REST request to delete CountryCode : {}", id);
        countryCodeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
