package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.TransportType;

import com.grupoamigo.backend.domain.enumeration.CurrencyType;

/**
 * A ManouverRequest.
 */
@Entity
@Table(name = "manouver_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ManouverRequest implements Serializable {

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
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "transport")
    private TransportType transport;

    @Column(name = "price")
    private Float price;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency")
    private CurrencyType currency;

    @Lob
    @Column(name = "qr_code")
    private byte[] qrCode;

    @Column(name = "qr_code_content_type")
    private String qrCodeContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Location origin;

    @OneToOne
    @JoinColumn(unique = true)
    private Location destiny;

    @ManyToOne
    @JsonIgnoreProperties("manouverRequestClients")
    private Client manouverClient;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "manouver_request_load",
               joinColumns = @JoinColumn(name = "manouver_request_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "load_id", referencedColumnName = "id"))
    private Set<Load> loads = new HashSet<>();

    @ManyToMany(mappedBy = "manouverRequests")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Client> clients = new HashSet<>();

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

    public ManouverRequest title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public ManouverRequest description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public ManouverRequest date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public TransportType getTransport() {
        return transport;
    }

    public ManouverRequest transport(TransportType transport) {
        this.transport = transport;
        return this;
    }

    public void setTransport(TransportType transport) {
        this.transport = transport;
    }

    public Float getPrice() {
        return price;
    }

    public ManouverRequest price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public CurrencyType getCurrency() {
        return currency;
    }

    public ManouverRequest currency(CurrencyType currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(CurrencyType currency) {
        this.currency = currency;
    }

    public byte[] getQrCode() {
        return qrCode;
    }

    public ManouverRequest qrCode(byte[] qrCode) {
        this.qrCode = qrCode;
        return this;
    }

    public void setQrCode(byte[] qrCode) {
        this.qrCode = qrCode;
    }

    public String getQrCodeContentType() {
        return qrCodeContentType;
    }

    public ManouverRequest qrCodeContentType(String qrCodeContentType) {
        this.qrCodeContentType = qrCodeContentType;
        return this;
    }

    public void setQrCodeContentType(String qrCodeContentType) {
        this.qrCodeContentType = qrCodeContentType;
    }

    public Location getOrigin() {
        return origin;
    }

    public ManouverRequest origin(Location location) {
        this.origin = location;
        return this;
    }

    public void setOrigin(Location location) {
        this.origin = location;
    }

    public Location getDestiny() {
        return destiny;
    }

    public ManouverRequest destiny(Location location) {
        this.destiny = location;
        return this;
    }

    public void setDestiny(Location location) {
        this.destiny = location;
    }

    public Client getManouverClient() {
        return manouverClient;
    }

    public ManouverRequest manouverClient(Client client) {
        this.manouverClient = client;
        return this;
    }

    public void setManouverClient(Client client) {
        this.manouverClient = client;
    }

    public Set<Load> getLoads() {
        return loads;
    }

    public ManouverRequest loads(Set<Load> loads) {
        this.loads = loads;
        return this;
    }

    public ManouverRequest addLoad(Load load) {
        this.loads.add(load);
        load.getManouverRequests().add(this);
        return this;
    }

    public ManouverRequest removeLoad(Load load) {
        this.loads.remove(load);
        load.getManouverRequests().remove(this);
        return this;
    }

    public void setLoads(Set<Load> loads) {
        this.loads = loads;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public ManouverRequest clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public ManouverRequest addClient(Client client) {
        this.clients.add(client);
        client.getManouverRequests().add(this);
        return this;
    }

    public ManouverRequest removeClient(Client client) {
        this.clients.remove(client);
        client.getManouverRequests().remove(this);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ManouverRequest)) {
            return false;
        }
        return id != null && id.equals(((ManouverRequest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ManouverRequest{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", transport='" + getTransport() + "'" +
            ", price=" + getPrice() +
            ", currency='" + getCurrency() + "'" +
            ", qrCode='" + getQrCode() + "'" +
            ", qrCodeContentType='" + getQrCodeContentType() + "'" +
            "}";
    }
}
