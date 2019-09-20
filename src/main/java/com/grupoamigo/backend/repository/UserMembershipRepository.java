package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.UserMembership;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserMembership entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserMembershipRepository extends JpaRepository<UserMembership, Long> {

}
