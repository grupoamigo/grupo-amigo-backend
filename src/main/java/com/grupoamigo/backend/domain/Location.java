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
 * A Location.
 */
@Entity
@Table(name = "location")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "lat")
    private String lat;

    @Column(name = "lng")
    private String lng;

    @OneToOne(mappedBy = "location")
    @JsonIgnore
    private CountryCode countryCode;

    @OneToOne(mappedBy = "location")
    @JsonIgnore
    private StateCode stateCode;

    @OneToOne(mappedBy = "origin")
    @JsonIgnore
    private ManouverRequest manouverRequestOrigin;

    @OneToOne(mappedBy = "destiny")
    @JsonIgnore
    private ManouverRequest manouverRequestDestiny;

    @ManyToMany(mappedBy = "locations")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Client> clients = new HashSet<>();

    @ManyToMany(mappedBy = "locations")
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

    public String getAddress() {
        return address;
    }

    public Location address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLat() {
        return lat;
    }

    public Location lat(String lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public Location lng(String lng) {
        this.lng = lng;
        return this;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public CountryCode getCountryCode() {
        return countryCode;
    }

    public Location countryCode(CountryCode countryCode) {
        this.countryCode = countryCode;
        return this;
    }

    public void setCountryCode(CountryCode countryCode) {
        this.countryCode = countryCode;
    }

    public StateCode getStateCode() {
        return stateCode;
    }

    public Location stateCode(StateCode stateCode) {
        this.stateCode = stateCode;
        return this;
    }

    public void setStateCode(StateCode stateCode) {
        this.stateCode = stateCode;
    }

    public ManouverRequest getManouverRequestOrigin() {
        return manouverRequestOrigin;
    }

    public Location manouverRequestOrigin(ManouverRequest manouverRequest) {
        this.manouverRequestOrigin = manouverRequest;
        return this;
    }

    public void setManouverRequestOrigin(ManouverRequest manouverRequest) {
        this.manouverRequestOrigin = manouverRequest;
    }

    public ManouverRequest getManouverRequestDestiny() {
        return manouverRequestDestiny;
    }

    public Location manouverRequestDestiny(ManouverRequest manouverRequest) {
        this.manouverRequestDestiny = manouverRequest;
        return this;
    }

    public void setManouverRequestDestiny(ManouverRequest manouverRequest) {
        this.manouverRequestDestiny = manouverRequest;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Location clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Location addClient(Client client) {
        this.clients.add(client);
        client.getLocations().add(this);
        return this;
    }

    public Location removeClient(Client client) {
        this.clients.remove(client);
        client.getLocations().remove(this);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public Location companies(Set<Company> companies) {
        this.companies = companies;
        return this;
    }

    public Location addCompany(Company company) {
        this.companies.add(company);
        company.getLocations().add(this);
        return this;
    }

    public Location removeCompany(Company company) {
        this.companies.remove(company);
        company.getLocations().remove(this);
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
        if (!(o instanceof Location)) {
            return false;
        }
        return id != null && id.equals(((Location) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", lat='" + getLat() + "'" +
            ", lng='" + getLng() + "'" +
            "}";
    }
}
