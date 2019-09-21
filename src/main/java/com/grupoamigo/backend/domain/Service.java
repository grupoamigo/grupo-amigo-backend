package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.ServiceType;

import com.grupoamigo.backend.domain.enumeration.ServiceUnitType;

import com.grupoamigo.backend.domain.enumeration.StatusType;

/**
 * A Service.
 */
@Entity
@Table(name = "service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Service implements Serializable {

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
    @Column(name = "type", nullable = false)
    private ServiceType type;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false)
    private ServiceUnitType unit;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusType status;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "service_manouvers",
               joinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "manouvers_id", referencedColumnName = "id"))
    private Set<Manouver> manouvers = new HashSet<>();

    @ManyToMany(mappedBy = "serviceTitles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Contract> contracts = new HashSet<>();

    @ManyToMany(mappedBy = "services")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Company> companies = new HashSet<>();

    @ManyToMany(mappedBy = "services")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<ServiceRequest> serviceRequests = new HashSet<>();

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

    public Service title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Service description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ServiceType getType() {
        return type;
    }

    public Service type(ServiceType type) {
        this.type = type;
        return this;
    }

    public void setType(ServiceType type) {
        this.type = type;
    }

    public ServiceUnitType getUnit() {
        return unit;
    }

    public Service unit(ServiceUnitType unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(ServiceUnitType unit) {
        this.unit = unit;
    }

    public StatusType getStatus() {
        return status;
    }

    public Service status(StatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    public Set<Manouver> getManouvers() {
        return manouvers;
    }

    public Service manouvers(Set<Manouver> manouvers) {
        this.manouvers = manouvers;
        return this;
    }

    public Service addManouvers(Manouver manouver) {
        this.manouvers.add(manouver);
        manouver.getServices().add(this);
        return this;
    }

    public Service removeManouvers(Manouver manouver) {
        this.manouvers.remove(manouver);
        manouver.getServices().remove(this);
        return this;
    }

    public void setManouvers(Set<Manouver> manouvers) {
        this.manouvers = manouvers;
    }

    public Set<Contract> getContracts() {
        return contracts;
    }

    public Service contracts(Set<Contract> contracts) {
        this.contracts = contracts;
        return this;
    }

    public Service addContract(Contract contract) {
        this.contracts.add(contract);
        contract.getServiceTitles().add(this);
        return this;
    }

    public Service removeContract(Contract contract) {
        this.contracts.remove(contract);
        contract.getServiceTitles().remove(this);
        return this;
    }

    public void setContracts(Set<Contract> contracts) {
        this.contracts = contracts;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public Service companies(Set<Company> companies) {
        this.companies = companies;
        return this;
    }

    public Service addCompany(Company company) {
        this.companies.add(company);
        company.getServices().add(this);
        return this;
    }

    public Service removeCompany(Company company) {
        this.companies.remove(company);
        company.getServices().remove(this);
        return this;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }

    public Set<ServiceRequest> getServiceRequests() {
        return serviceRequests;
    }

    public Service serviceRequests(Set<ServiceRequest> serviceRequests) {
        this.serviceRequests = serviceRequests;
        return this;
    }

    public Service addServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequests.add(serviceRequest);
        serviceRequest.getServices().add(this);
        return this;
    }

    public Service removeServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequests.remove(serviceRequest);
        serviceRequest.getServices().remove(this);
        return this;
    }

    public void setServiceRequests(Set<ServiceRequest> serviceRequests) {
        this.serviceRequests = serviceRequests;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Service)) {
            return false;
        }
        return id != null && id.equals(((Service) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Service{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ", unit='" + getUnit() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
