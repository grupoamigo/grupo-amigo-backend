package com.grupoamigo.backend.repository;

import com.grupoamigo.backend.domain.Load;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Load entity.
 */
@Repository
public interface LoadRepository extends JpaRepository<Load, Long> {

    @Query(value = "select distinct load from Load load left join fetch load.seals",
        countQuery = "select count(distinct load) from Load load")
    Page<Load> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct load from Load load left join fetch load.seals")
    List<Load> findAllWithEagerRelationships();

    @Query("select load from Load load left join fetch load.seals where load.id =:id")
    Optional<Load> findOneWithEagerRelationships(@Param("id") Long id);

}
