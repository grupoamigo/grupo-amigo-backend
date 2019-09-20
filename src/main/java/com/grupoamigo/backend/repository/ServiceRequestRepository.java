package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.ServiceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ServiceRequest entity.
 */
@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    @Query(value = "select distinct serviceRequest from ServiceRequest serviceRequest left join fetch serviceRequest.services",
        countQuery = "select count(distinct serviceRequest) from ServiceRequest serviceRequest")
    Page<ServiceRequest> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct serviceRequest from ServiceRequest serviceRequest left join fetch serviceRequest.services")
    List<ServiceRequest> findAllWithEagerRelationships();

    @Query("select serviceRequest from ServiceRequest serviceRequest left join fetch serviceRequest.services where serviceRequest.id =:id")
    Optional<ServiceRequest> findOneWithEagerRelationships(@Param("id") Long id);

}
