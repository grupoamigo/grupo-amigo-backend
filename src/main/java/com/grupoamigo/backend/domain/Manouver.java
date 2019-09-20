package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.ServiceUnitType;

import com.grupoamigo.backend.domain.enumeration.DivisionType;

/**
 * A Manouver.
 */
@Entity
@Table(name = "manouver")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Manouver implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false)
    private ServiceUnitType unit;

    @Enumerated(EnumType.STRING)
    @Column(name = "division")
    private DivisionType division;

    @ManyToMany(mappedBy = "manouvers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<ServiceQuote> serviceQuotes = new HashSet<>();

    @ManyToMany(mappedBy = "manouvers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Company> companies = new HashSet<>();

    @ManyToMany(mappedBy = "manouvers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Service> services = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Manouver title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Manouver description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ServiceUnitType getUnit() {
        return unit;
    }

    public Manouver unit(ServiceUnitType unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(ServiceUnitType unit) {
        this.unit = unit;
    }

    public DivisionType getDivision() {
        return division;
    }

    public Manouver division(DivisionType division) {
        this.division = division;
        return this;
    }

    public void setDivision(DivisionType division) {
        this.division = division;
    }

    public Set<ServiceQuote> getServiceQuotes() {
        return serviceQuotes;
    }

    public Manouver serviceQuotes(Set<ServiceQuote> serviceQuotes) {
        this.serviceQuotes = serviceQuotes;
        return this;
    }

    public Manouver addServiceQuotes(ServiceQuote serviceQuote) {
        this.serviceQuotes.add(serviceQuote);
        serviceQuote.getManouvers().add(this);
        return this;
    }

    public Manouver removeServiceQuotes(ServiceQuote serviceQuote) {
        this.serviceQuotes.remove(serviceQuote);
        serviceQuote.getManouvers().remove(this);
        return this;
    }

    public void setServiceQuotes(Set<ServiceQuote> serviceQuotes) {
        this.serviceQuotes = serviceQuotes;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public Manouver companies(Set<Company> companies) {
        this.companies = companies;
        return this;
    }

    public Manouver addCompany(Company company) {
        this.companies.add(company);
        company.getManouvers().add(this);
        return this;
    }

    public Manouver removeCompany(Company company) {
        this.companies.remove(company);
        company.getManouvers().remove(this);
        return this;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }

    public Set<Service> getServices() {
        return services;
    }

    public Manouver services(Set<Service> services) {
        this.services = services;
        return this;
    }

    public Manouver addService(Service service) {
        this.services.add(service);
        service.getManouvers().add(this);
        return this;
    }

    public Manouver removeService(Service service) {
        this.services.remove(service);
        service.getManouvers().remove(this);
        return this;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Manouver)) {
            return false;
        }
        return id != null && id.equals(((Manouver) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Manouver{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", unit='" + getUnit() + "'" +
            ", division='" + getDivision() + "'" +
            "}";
    }
}
