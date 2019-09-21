package com.grupoamigo.backend.repository;
import com.grupoamigo.backend.domain.Membership;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Membership entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {

    @Query("select membership from Membership membership where membership.user.login = ?#{principal.username}")
    List<Membership> findByUserIsCurrentUser();

}
