package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.ExtraField;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExtraField entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtraFieldRepository extends JpaRepository<ExtraField, Long> {

}
