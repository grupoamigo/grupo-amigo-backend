package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Contract entity.
 */
@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {

    @Query(value = "select distinct contract from Contract contract left join fetch contract.services",
        countQuery = "select count(distinct contract) from Contract contract")
    Page<Contract> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct contract from Contract contract left join fetch contract.services")
    List<Contract> findAllWithEagerRelationships();

    @Query("select contract from Contract contract left join fetch contract.services where contract.id =:id")
    Optional<Contract> findOneWithEagerRelationships(@Param("id") Long id);

}
