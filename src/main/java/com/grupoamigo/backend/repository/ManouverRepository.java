package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.Manouver;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Manouver entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManouverRepository extends JpaRepository<Manouver, Long> {

}
