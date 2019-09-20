package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.ContactType;

/**
 * A ContactCard.
 */
@Entity
@Table(name = "contact_card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ContactCard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ContactType type;

    @NotNull
    @Column(name = "value", nullable = false)
    private String value;

    @ManyToMany(mappedBy = "contactCards")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Client> clients = new HashSet<>();

    @ManyToMany(mappedBy = "contactCards")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Company> companies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ContactType getType() {
        return type;
    }

    public ContactCard type(ContactType type) {
        this.type = type;
        return this;
    }

    public void setType(ContactType type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public ContactCard value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public ContactCard clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public ContactCard addClient(Client client) {
        this.clients.add(client);
        client.getContactCards().add(this);
        return this;
    }

    public ContactCard removeClient(Client client) {
        this.clients.remove(client);
        client.getContactCards().remove(this);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public ContactCard companies(Set<Company> companies) {
        this.companies = companies;
        return this;
    }

    public ContactCard addCompany(Company company) {
        this.companies.add(company);
        company.getContactCards().add(this);
        return this;
    }

    public ContactCard removeCompany(Company company) {
        this.companies.remove(company);
        company.getContactCards().remove(this);
        return this;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContactCard)) {
            return false;
        }
        return id != null && id.equals(((ContactCard) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ContactCard{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
