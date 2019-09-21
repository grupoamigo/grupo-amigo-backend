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

import com.grupoamigo.backend.domain.enumeration.ContractType;

import com.grupoamigo.backend.domain.enumeration.ContractStatusType;

/**
 * A Contract.
 */
@Entity
@Table(name = "contract")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ContractType type;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "legal_prose", nullable = false)
    private String legalProse;

    @Lob
    @Column(name = "signature")
    private byte[] signature;

    @Column(name = "signature_content_type")
    private String signatureContentType;

    @Lob
    @Column(name = "contract_file")
    private byte[] contractFile;

    @Column(name = "contract_file_content_type")
    private String contractFileContentType;

    @Lob
    @Column(name = "qr_code")
    private byte[] qrCode;

    @Column(name = "qr_code_content_type")
    private String qrCodeContentType;

    @Column(name = "digital_fingerprint")
    private String digitalFingerprint;

    @Column(name = "date_signed")
    private Instant dateSigned;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ContractStatusType status;

    @OneToOne
    @JoinColumn(unique = true)
    private ServiceQuote serviceQuote;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "contract_service_title",
               joinColumns = @JoinColumn(name = "contract_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "service_title_id", referencedColumnName = "id"))
    private Set<Service> serviceTitles = new HashSet<>();

    @ManyToMany(mappedBy = "contracts")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Company> suppliers = new HashSet<>();

    @ManyToMany(mappedBy = "contracts")
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

    public ContractType getType() {
        return type;
    }

    public Contract type(ContractType type) {
        this.type = type;
        return this;
    }

    public void setType(ContractType type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public Contract title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLegalProse() {
        return legalProse;
    }

    public Contract legalProse(String legalProse) {
        this.legalProse = legalProse;
        return this;
    }

    public void setLegalProse(String legalProse) {
        this.legalProse = legalProse;
    }

    public byte[] getSignature() {
        return signature;
    }

    public Contract signature(byte[] signature) {
        this.signature = signature;
        return this;
    }

    public void setSignature(byte[] signature) {
        this.signature = signature;
    }

    public String getSignatureContentType() {
        return signatureContentType;
    }

    public Contract signatureContentType(String signatureContentType) {
        this.signatureContentType = signatureContentType;
        return this;
    }

    public void setSignatureContentType(String signatureContentType) {
        this.signatureContentType = signatureContentType;
    }

    public byte[] getContractFile() {
        return contractFile;
    }

    public Contract contractFile(byte[] contractFile) {
        this.contractFile = contractFile;
        return this;
    }

    public void setContractFile(byte[] contractFile) {
        this.contractFile = contractFile;
    }

    public String getContractFileContentType() {
        return contractFileContentType;
    }

    public Contract contractFileContentType(String contractFileContentType) {
        this.contractFileContentType = contractFileContentType;
        return this;
    }

    public void setContractFileContentType(String contractFileContentType) {
        this.contractFileContentType = contractFileContentType;
    }

    public byte[] getQrCode() {
        return qrCode;
    }

    public Contract qrCode(byte[] qrCode) {
        this.qrCode = qrCode;
        return this;
    }

    public void setQrCode(byte[] qrCode) {
        this.qrCode = qrCode;
    }

    public String getQrCodeContentType() {
        return qrCodeContentType;
    }

    public Contract qrCodeContentType(String qrCodeContentType) {
        this.qrCodeContentType = qrCodeContentType;
        return this;
    }

    public void setQrCodeContentType(String qrCodeContentType) {
        this.qrCodeContentType = qrCodeContentType;
    }

    public String getDigitalFingerprint() {
        return digitalFingerprint;
    }

    public Contract digitalFingerprint(String digitalFingerprint) {
        this.digitalFingerprint = digitalFingerprint;
        return this;
    }

    public void setDigitalFingerprint(String digitalFingerprint) {
        this.digitalFingerprint = digitalFingerprint;
    }

    public Instant getDateSigned() {
        return dateSigned;
    }

    public Contract dateSigned(Instant dateSigned) {
        this.dateSigned = dateSigned;
        return this;
    }

    public void setDateSigned(Instant dateSigned) {
        this.dateSigned = dateSigned;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public Contract expirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
        return this;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public ContractStatusType getStatus() {
        return status;
    }

    public Contract status(ContractStatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(ContractStatusType status) {
        this.status = status;
    }

    public ServiceQuote getServiceQuote() {
        return serviceQuote;
    }

    public Contract serviceQuote(ServiceQuote serviceQuote) {
        this.serviceQuote = serviceQuote;
        return this;
    }

    public void setServiceQuote(ServiceQuote serviceQuote) {
        this.serviceQuote = serviceQuote;
    }

    public Set<Service> getServiceTitles() {
        return serviceTitles;
    }

    public Contract serviceTitles(Set<Service> services) {
        this.serviceTitles = services;
        return this;
    }

    public Contract addServiceTitle(Service service) {
        this.serviceTitles.add(service);
        service.getContracts().add(this);
        return this;
    }

    public Contract removeServiceTitle(Service service) {
        this.serviceTitles.remove(service);
        service.getContracts().remove(this);
        return this;
    }

    public void setServiceTitles(Set<Service> services) {
        this.serviceTitles = services;
    }

    public Set<Company> getSuppliers() {
        return suppliers;
    }

    public Contract suppliers(Set<Company> companies) {
        this.suppliers = companies;
        return this;
    }

    public Contract addSupplier(Company company) {
        this.suppliers.add(company);
        company.getContracts().add(this);
        return this;
    }

    public Contract removeSupplier(Company company) {
        this.suppliers.remove(company);
        company.getContracts().remove(this);
        return this;
    }

    public void setSuppliers(Set<Company> companies) {
        this.suppliers = companies;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Contract clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Contract addClient(Client client) {
        this.clients.add(client);
        client.getContracts().add(this);
        return this;
    }

    public Contract removeClient(Client client) {
        this.clients.remove(client);
        client.getContracts().remove(this);
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
        if (!(o instanceof Contract)) {
            return false;
        }
        return id != null && id.equals(((Contract) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Contract{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", title='" + getTitle() + "'" +
            ", legalProse='" + getLegalProse() + "'" +
            ", signature='" + getSignature() + "'" +
            ", signatureContentType='" + getSignatureContentType() + "'" +
            ", contractFile='" + getContractFile() + "'" +
            ", contractFileContentType='" + getContractFileContentType() + "'" +
            ", qrCode='" + getQrCode() + "'" +
            ", qrCodeContentType='" + getQrCodeContentType() + "'" +
            ", digitalFingerprint='" + getDigitalFingerprint() + "'" +
            ", dateSigned='" + getDateSigned() + "'" +
            ", expirationDate='" + getExpirationDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
