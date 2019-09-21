package com.grupoamigo.backend.repository;
import com.grupoamigo.backend.domain.ServiceQuote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ServiceQuote entity.
 */
@Repository
public interface ServiceQuoteRepository extends JpaRepository<ServiceQuote, Long> {

    @Query(value = "select distinct serviceQuote from ServiceQuote serviceQuote left join fetch serviceQuote.manouvers",
        countQuery = "select count(distinct serviceQuote) from ServiceQuote serviceQuote")
    Page<ServiceQuote> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct serviceQuote from ServiceQuote serviceQuote left join fetch serviceQuote.manouvers")
    List<ServiceQuote> findAllWithEagerRelationships();

    @Query("select serviceQuote from ServiceQuote serviceQuote left join fetch serviceQuote.manouvers where serviceQuote.id =:id")
    Optional<ServiceQuote> findOneWithEagerRelationships(@Param("id") Long id);

}
