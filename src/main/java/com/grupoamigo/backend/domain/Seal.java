package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Seal.
 */
@Entity
@Table(name = "seal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Seal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "issuer", nullable = false)
    private String issuer;

    @NotNull
    @Column(name = "unique_id", nullable = false)
    private String uniqueId;

    @ManyToMany(mappedBy = "seals")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Load> loads = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIssuer() {
        return issuer;
    }

    public Seal issuer(String issuer) {
        this.issuer = issuer;
        return this;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public Seal uniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
        return this;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public Set<Load> getLoads() {
        return loads;
    }

    public Seal loads(Set<Load> loads) {
        this.loads = loads;
        return this;
    }

    public Seal addLoad(Load load) {
        this.loads.add(load);
        load.getSeals().add(this);
        return this;
    }

    public Seal removeLoad(Load load) {
        this.loads.remove(load);
        load.getSeals().remove(this);
        return this;
    }

    public void setLoads(Set<Load> loads) {
        this.loads = loads;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Seal)) {
            return false;
        }
        return id != null && id.equals(((Seal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Seal{" +
            "id=" + getId() +
            ", issuer='" + getIssuer() + "'" +
            ", uniqueId='" + getUniqueId() + "'" +
            "}";
    }
}
