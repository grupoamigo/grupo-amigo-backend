package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.ServiceUnitType;

import com.grupoamigo.backend.domain.enumeration.StatusType;

import com.grupoamigo.backend.domain.enumeration.CurrencyType;

/**
 * A ServiceQuote.
 */
@Entity
@Table(name = "service_quote")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceQuote implements Serializable {

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

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Float price;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false)
    private ServiceUnitType unit;

    @Column(name = "expedition_date")
    private Instant expeditionDate;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusType status;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "currency", nullable = false)
    private CurrencyType currency;

    @Column(name = "approved_by")
    private String approvedBy;

    @Lob
    @Column(name = "qr_code")
    private byte[] qrCode;

    @Column(name = "qr_code_content_type")
    private String qrCodeContentType;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "service_quote_manouver",
               joinColumns = @JoinColumn(name = "service_quote_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "manouver_id", referencedColumnName = "id"))
    private Set<Manouver> manouvers = new HashSet<>();

    @OneToOne(mappedBy = "serviceQuote")
    @JsonIgnore
    private Contract contract;

    @OneToOne(mappedBy = "serviceQuote")
    @JsonIgnore
    private ServiceRequest serviceRequest;

    @ManyToMany(mappedBy = "serviceQuotes")
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

    public ServiceQuote title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public ServiceQuote description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public ServiceQuote quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getPrice() {
        return price;
    }

    public ServiceQuote price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public ServiceUnitType getUnit() {
        return unit;
    }

    public ServiceQuote unit(ServiceUnitType unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(ServiceUnitType unit) {
        this.unit = unit;
    }

    public Instant getExpeditionDate() {
        return expeditionDate;
    }

    public ServiceQuote expeditionDate(Instant expeditionDate) {
        this.expeditionDate = expeditionDate;
        return this;
    }

    public void setExpeditionDate(Instant expeditionDate) {
        this.expeditionDate = expeditionDate;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public ServiceQuote expirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
        return this;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public StatusType getStatus() {
        return status;
    }

    public ServiceQuote status(StatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    public CurrencyType getCurrency() {
        return currency;
    }

    public ServiceQuote currency(CurrencyType currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(CurrencyType currency) {
        this.currency = currency;
    }

    public String getApprovedBy() {
        return approvedBy;
    }

    public ServiceQuote approvedBy(String approvedBy) {
        this.approvedBy = approvedBy;
        return this;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }

    public byte[] getQrCode() {
        return qrCode;
    }

    public ServiceQuote qrCode(byte[] qrCode) {
        this.qrCode = qrCode;
        return this;
    }

    public void setQrCode(byte[] qrCode) {
        this.qrCode = qrCode;
    }

    public String getQrCodeContentType() {
        return qrCodeContentType;
    }

    public ServiceQuote qrCodeContentType(String qrCodeContentType) {
        this.qrCodeContentType = qrCodeContentType;
        return this;
    }

    public void setQrCodeContentType(String qrCodeContentType) {
        this.qrCodeContentType = qrCodeContentType;
    }

    public Set<Manouver> getManouvers() {
        return manouvers;
    }

    public ServiceQuote manouvers(Set<Manouver> manouvers) {
        this.manouvers = manouvers;
        return this;
    }

    public ServiceQuote addManouver(Manouver manouver) {
        this.manouvers.add(manouver);
        manouver.getServiceQuotes().add(this);
        return this;
    }

    public ServiceQuote removeManouver(Manouver manouver) {
        this.manouvers.remove(manouver);
        manouver.getServiceQuotes().remove(this);
        return this;
    }

    public void setManouvers(Set<Manouver> manouvers) {
        this.manouvers = manouvers;
    }

    public Contract getContract() {
        return contract;
    }

    public ServiceQuote contract(Contract contract) {
        this.contract = contract;
        return this;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    public ServiceQuote serviceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
        return this;
    }

    public void setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public ServiceQuote clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public ServiceQuote addClient(Client client) {
        this.clients.add(client);
        client.getServiceQuotes().add(this);
        return this;
    }

    public ServiceQuote removeClient(Client client) {
        this.clients.remove(client);
        client.getServiceQuotes().remove(this);
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
        if (!(o instanceof ServiceQuote)) {
            return false;
        }
        return id != null && id.equals(((ServiceQuote) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ServiceQuote{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", quantity=" + getQuantity() +
            ", price=" + getPrice() +
            ", unit='" + getUnit() + "'" +
            ", expeditionDate='" + getExpeditionDate() + "'" +
            ", expirationDate='" + getExpirationDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", currency='" + getCurrency() + "'" +
            ", approvedBy='" + getApprovedBy() + "'" +
            ", qrCode='" + getQrCode() + "'" +
            ", qrCodeContentType='" + getQrCodeContentType() + "'" +
            "}";
    }
}
