package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.CountryCode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CountryCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CountryCodeRepository extends JpaRepository<CountryCode, Long> {

}
