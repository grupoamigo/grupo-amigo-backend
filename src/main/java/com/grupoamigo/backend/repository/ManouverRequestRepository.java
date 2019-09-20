package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.ManouverRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ManouverRequest entity.
 */
@Repository
public interface ManouverRequestRepository extends JpaRepository<ManouverRequest, Long> {

    @Query(value = "select distinct manouverRequest from ManouverRequest manouverRequest left join fetch manouverRequest.loads",
        countQuery = "select count(distinct manouverRequest) from ManouverRequest manouverRequest")
    Page<ManouverRequest> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct manouverRequest from ManouverRequest manouverRequest left join fetch manouverRequest.loads")
    List<ManouverRequest> findAllWithEagerRelationships();

    @Query("select manouverRequest from ManouverRequest manouverRequest left join fetch manouverRequest.loads where manouverRequest.id =:id")
    Optional<ManouverRequest> findOneWithEagerRelationships(@Param("id") Long id);

}
