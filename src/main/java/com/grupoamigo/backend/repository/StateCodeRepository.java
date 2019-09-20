package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.StateCode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StateCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StateCodeRepository extends JpaRepository<StateCode, Long> {

}
