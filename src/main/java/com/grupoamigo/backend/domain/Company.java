package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.CompanyType;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "legal_name", nullable = false)
    private String legalName;

    @NotNull
    @Column(name = "tax_id", nullable = false)
    private String taxId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private CompanyType type;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Client client;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "company_contact_cards",
               joinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "contact_cards_id", referencedColumnName = "id"))
    private Set<ContactCard> contactCards = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "company_services",
               joinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "services_id", referencedColumnName = "id"))
    private Set<Service> services = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "company_locations",
               joinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "locations_id", referencedColumnName = "id"))
    private Set<Location> locations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "company_manouvers",
               joinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "manouvers_id", referencedColumnName = "id"))
    private Set<Manouver> manouvers = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "company_contracts",
               joinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "contracts_id", referencedColumnName = "id"))
    private Set<Contract> contracts = new HashSet<>();

    @OneToOne(mappedBy = "company")
    @JsonIgnore
    private Membership membership;

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

    public Company legalName(String legalName) {
        this.legalName = legalName;
        return this;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getTaxId() {
        return taxId;
    }

    public Company taxId(String taxId) {
        this.taxId = taxId;
        return this;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public CompanyType getType() {
        return type;
    }

    public Company type(CompanyType type) {
        this.type = type;
        return this;
    }

    public void setType(CompanyType type) {
        this.type = type;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Company logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Company logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public Client getClient() {
        return client;
    }

    public Company client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<ContactCard> getContactCards() {
        return contactCards;
    }

    public Company contactCards(Set<ContactCard> contactCards) {
        this.contactCards = contactCards;
        return this;
    }

    public Company addContactCards(ContactCard contactCard) {
        this.contactCards.add(contactCard);
        contactCard.getCompanies().add(this);
        return this;
    }

    public Company removeContactCards(ContactCard contactCard) {
        this.contactCards.remove(contactCard);
        contactCard.getCompanies().remove(this);
        return this;
    }

    public void setContactCards(Set<ContactCard> contactCards) {
        this.contactCards = contactCards;
    }

    public Set<Service> getServices() {
        return services;
    }

    public Company services(Set<Service> services) {
        this.services = services;
        return this;
    }

    public Company addServices(Service service) {
        this.services.add(service);
        service.getCompanies().add(this);
        return this;
    }

    public Company removeServices(Service service) {
        this.services.remove(service);
        service.getCompanies().remove(this);
        return this;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Company locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Company addLocations(Location location) {
        this.locations.add(location);
        location.getCompanies().add(this);
        return this;
    }

    public Company removeLocations(Location location) {
        this.locations.remove(location);
        location.getCompanies().remove(this);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<Manouver> getManouvers() {
        return manouvers;
    }

    public Company manouvers(Set<Manouver> manouvers) {
        this.manouvers = manouvers;
        return this;
    }

    public Company addManouvers(Manouver manouver) {
        this.manouvers.add(manouver);
        manouver.getCompanies().add(this);
        return this;
    }

    public Company removeManouvers(Manouver manouver) {
        this.manouvers.remove(manouver);
        manouver.getCompanies().remove(this);
        return this;
    }

    public void setManouvers(Set<Manouver> manouvers) {
        this.manouvers = manouvers;
    }

    public Set<Contract> getContracts() {
        return contracts;
    }

    public Company contracts(Set<Contract> contracts) {
        this.contracts = contracts;
        return this;
    }

    public Company addContracts(Contract contract) {
        this.contracts.add(contract);
        contract.getSuppliers().add(this);
        return this;
    }

    public Company removeContracts(Contract contract) {
        this.contracts.remove(contract);
        contract.getSuppliers().remove(this);
        return this;
    }

    public void setContracts(Set<Contract> contracts) {
        this.contracts = contracts;
    }

    public Membership getMembership() {
        return membership;
    }

    public Company membership(Membership membership) {
        this.membership = membership;
        return this;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return id != null && id.equals(((Company) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", legalName='" + getLegalName() + "'" +
            ", taxId='" + getTaxId() + "'" +
            ", type='" + getType() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            "}";
    }
}
