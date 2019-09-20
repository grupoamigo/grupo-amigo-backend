package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.Seal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Seal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SealRepository extends JpaRepository<Seal, Long> {

}
