package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.ClientStatusType;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "legal_name", nullable = false)
    private String legalName;

    @Column(name = "member_since")
    private Instant memberSince;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ClientStatusType status;

    @Column(name = "internal_notes")
    private String internalNotes;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "client_contact_cards",
               joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "contact_cards_id", referencedColumnName = "id"))
    private Set<ContactCard> contactCards = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "client_locations",
               joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "locations_id", referencedColumnName = "id"))
    private Set<Location> locations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "client_contracts",
               joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "contracts_id", referencedColumnName = "id"))
    private Set<Contract> contracts = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "client_service_quotes",
               joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "service_quotes_id", referencedColumnName = "id"))
    private Set<ServiceQuote> serviceQuotes = new HashSet<>();

    @OneToOne(mappedBy = "client")
    @JsonIgnore
    private ServiceRequest serviceRequest;

    @OneToOne(mappedBy = "client")
    @JsonIgnore
    private Company hirer;

    @OneToMany(mappedBy = "manouverClient")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ManouverRequest> manouverRequestClients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLegalName() {
        return legalName;
    }

    public Client legalName(String legalName) {
        this.legalName = legalName;
        return this;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public Instant getMemberSince() {
        return memberSince;
    }

    public Client memberSince(Instant memberSince) {
        this.memberSince = memberSince;
        return this;
    }

    public void setMemberSince(Instant memberSince) {
        this.memberSince = memberSince;
    }

    public ClientStatusType getStatus() {
        return status;
    }

    public Client status(ClientStatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(ClientStatusType status) {
        this.status = status;
    }

    public String getInternalNotes() {
        return internalNotes;
    }

    public Client internalNotes(String internalNotes) {
        this.internalNotes = internalNotes;
        return this;
    }

    public void setInternalNotes(String internalNotes) {
        this.internalNotes = internalNotes;
    }

    public Set<ContactCard> getContactCards() {
        return contactCards;
    }

    public Client contactCards(Set<ContactCard> contactCards) {
        this.contactCards = contactCards;
        return this;
    }

    public Client addContactCards(ContactCard contactCard) {
        this.contactCards.add(contactCard);
        contactCard.getClients().add(this);
        return this;
    }

    public Client removeContactCards(ContactCard contactCard) {
        this.contactCards.remove(contactCard);
        contactCard.getClients().remove(this);
        return this;
    }

    public void setContactCards(Set<ContactCard> contactCards) {
        this.contactCards = contactCards;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Client locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Client addLocations(Location location) {
        this.locations.add(location);
        location.getClients().add(this);
        return this;
    }

    public Client removeLocations(Location location) {
        this.locations.remove(location);
        location.getClients().remove(this);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<Contract> getContracts() {
        return contracts;
    }

    public Client contracts(Set<Contract> contracts) {
        this.contracts = contracts;
        return this;
    }

    public Client addContracts(Contract contract) {
        this.contracts.add(contract);
        contract.getClients().add(this);
        return this;
    }

    public Client removeContracts(Contract contract) {
        this.contracts.remove(contract);
        contract.getClients().remove(this);
        return this;
    }

    public void setContracts(Set<Contract> contracts) {
        this.contracts = contracts;
    }

    public Set<ServiceQuote> getServiceQuotes() {
        return serviceQuotes;
    }

    public Client serviceQuotes(Set<ServiceQuote> serviceQuotes) {
        this.serviceQuotes = serviceQuotes;
        return this;
    }

    public Client addServiceQuotes(ServiceQuote serviceQuote) {
        this.serviceQuotes.add(serviceQuote);
        serviceQuote.getClients().add(this);
        return this;
    }

    public Client removeServiceQuotes(ServiceQuote serviceQuote) {
        this.serviceQuotes.remove(serviceQuote);
        serviceQuote.getClients().remove(this);
        return this;
    }

    public void setServiceQuotes(Set<ServiceQuote> serviceQuotes) {
        this.serviceQuotes = serviceQuotes;
    }

    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    public Client serviceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
        return this;
    }

    public void setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
    }

    public Company getHirer() {
        return hirer;
    }

    public Client hirer(Company company) {
        this.hirer = company;
        return this;
    }

    public void setHirer(Company company) {
        this.hirer = company;
    }

    public Set<ManouverRequest> getManouverRequestClients() {
        return manouverRequestClients;
    }

    public Client manouverRequestClients(Set<ManouverRequest> manouverRequests) {
        this.manouverRequestClients = manouverRequests;
        return this;
    }

    public Client addManouverRequestClient(ManouverRequest manouverRequest) {
        this.manouverRequestClients.add(manouverRequest);
        manouverRequest.setManouverClient(this);
        return this;
    }

    public Client removeManouverRequestClient(ManouverRequest manouverRequest) {
        this.manouverRequestClients.remove(manouverRequest);
        manouverRequest.setManouverClient(null);
        return this;
    }

    public void setManouverRequestClients(Set<ManouverRequest> manouverRequests) {
        this.manouverRequestClients = manouverRequests;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", legalName='" + getLegalName() + "'" +
            ", memberSince='" + getMemberSince() + "'" +
            ", status='" + getStatus() + "'" +
            ", internalNotes='" + getInternalNotes() + "'" +
            "}";
    }
}
