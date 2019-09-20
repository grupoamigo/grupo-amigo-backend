package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.LoadType;

/**
 * A Load.
 */
@Entity
@Table(name = "load")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Load implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private LoadType type;

    @NotNull
    @Column(name = "unique_id", nullable = false)
    private String uniqueId;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "load_seal",
               joinColumns = @JoinColumn(name = "load_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "seal_id", referencedColumnName = "id"))
    private Set<Seal> seals = new HashSet<>();

    @ManyToMany(mappedBy = "loads")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<ManouverRequest> manouverRequests = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LoadType getType() {
        return type;
    }

    public Load type(LoadType type) {
        this.type = type;
        return this;
    }

    public void setType(LoadType type) {
        this.type = type;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public Load uniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
        return this;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public Set<Seal> getSeals() {
        return seals;
    }

    public Load seals(Set<Seal> seals) {
        this.seals = seals;
        return this;
    }

    public Load addSeal(Seal seal) {
        this.seals.add(seal);
        seal.getLoads().add(this);
        return this;
    }

    public Load removeSeal(Seal seal) {
        this.seals.remove(seal);
        seal.getLoads().remove(this);
        return this;
    }

    public void setSeals(Set<Seal> seals) {
        this.seals = seals;
    }

    public Set<ManouverRequest> getManouverRequests() {
        return manouverRequests;
    }

    public Load manouverRequests(Set<ManouverRequest> manouverRequests) {
        this.manouverRequests = manouverRequests;
        return this;
    }

    public Load addManouverRequest(ManouverRequest manouverRequest) {
        this.manouverRequests.add(manouverRequest);
        manouverRequest.getLoads().add(this);
        return this;
    }

    public Load removeManouverRequest(ManouverRequest manouverRequest) {
        this.manouverRequests.remove(manouverRequest);
        manouverRequest.getLoads().remove(this);
        return this;
    }

    public void setManouverRequests(Set<ManouverRequest> manouverRequests) {
        this.manouverRequests = manouverRequests;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Load)) {
            return false;
        }
        return id != null && id.equals(((Load) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Load{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", uniqueId='" + getUniqueId() + "'" +
            "}";
    }
}
