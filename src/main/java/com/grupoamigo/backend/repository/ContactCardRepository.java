package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.ContactCard;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContactCard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactCardRepository extends JpaRepository<ContactCard, Long> {

}
