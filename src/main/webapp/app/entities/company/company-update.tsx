import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { IContactCard } from 'app/shared/model/contact-card.model';
import { getEntities as getContactCards } from 'app/entities/contact-card/contact-card.reducer';
import { IService } from 'app/shared/model/service.model';
import { getEntities as getServices } from 'app/entities/service/service.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IManouver } from 'app/shared/model/manouver.model';
import { getEntities as getManouvers } from 'app/entities/manouver/manouver.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { IMembership } from 'app/shared/model/membership.model';
import { getEntities as getMemberships } from 'app/entities/membership/membership.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICompanyUpdateState {
  isNew: boolean;
  idscontactCards: any[];
  idsservices: any[];
  idslocations: any[];
  idsmanouvers: any[];
  idscontract: any[];
  clientId: string;
  membershipId: string;
}

export class CompanyUpdate extends React.Component<ICompanyUpdateProps, ICompanyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscontactCards: [],
      idsservices: [],
      idslocations: [],
      idsmanouvers: [],
      idscontract: [],
      clientId: '0',
      membershipId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getClients();
    this.props.getContactCards();
    this.props.getServices();
    this.props.getLocations();
    this.props.getManouvers();
    this.props.getContracts();
    this.props.getMemberships();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { companyEntity } = this.props;
      const entity = {
        ...companyEntity,
        ...values,
        contactCards: mapIdList(values.contactCards),
        services: mapIdList(values.services),
        locations: mapIdList(values.locations),
        manouvers: mapIdList(values.manouvers),
        contracts: mapIdList(values.contracts)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/company');
  };

  render() {
    const { companyEntity, clients, contactCards, services, locations, manouvers, contracts, memberships, loading, updating } = this.props;
    const { isNew } = this.state;

    const { logo, logoContentType } = companyEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.company.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.company.home.createOrEditLabel">Create or edit a Company</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : companyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="company-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="company-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="legalNameLabel" for="company-legalName">
                    <Translate contentKey="grupoAmigoBackendApp.company.legalName">Legal Name</Translate>
                  </Label>
                  <AvField
                    id="company-legalName"
                    type="text"
                    name="legalName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="taxIdLabel" for="company-taxId">
                    <Translate contentKey="grupoAmigoBackendApp.company.taxId">Tax Id</Translate>
                  </Label>
                  <AvField
                    id="company-taxId"
                    type="text"
                    name="taxId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="company-type">
                    <Translate contentKey="grupoAmigoBackendApp.company.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="company-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && companyEntity.type) || 'NAVIERA'}
                  >
                    <option value="NAVIERA">{translate('grupoAmigoBackendApp.CompanyType.NAVIERA')}</option>
                    <option value="TRANSPORTISTA">{translate('grupoAmigoBackendApp.CompanyType.TRANSPORTISTA')}</option>
                    <option value="PERSONA_MORAL">{translate('grupoAmigoBackendApp.CompanyType.PERSONA_MORAL')}</option>
                    <option value="PERSONA_FISICA">{translate('grupoAmigoBackendApp.CompanyType.PERSONA_FISICA')}</option>
                    <option value="CONTRATISTA">{translate('grupoAmigoBackendApp.CompanyType.CONTRATISTA')}</option>
                    <option value="AGENTE_ADUANAL">{translate('grupoAmigoBackendApp.CompanyType.AGENTE_ADUANAL')}</option>
                    <option value="GOBIERNO">{translate('grupoAmigoBackendApp.CompanyType.GOBIERNO')}</option>
                    <option value="CENTRO_DE_DISTRIBUCION">{translate('grupoAmigoBackendApp.CompanyType.CENTRO_DE_DISTRIBUCION')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="logoLabel" for="logo">
                      <Translate contentKey="grupoAmigoBackendApp.company.logo">Logo</Translate>
                    </Label>
                    <br />
                    {logo ? (
                      <div>
                        <a onClick={openFile(logoContentType, logo)}>
                          <img src={`data:${logoContentType};base64,${logo}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {logoContentType}, {byteSize(logo)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('logo')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_logo" type="file" onChange={this.onBlobChange(true, 'logo')} accept="image/*" />
                    <AvInput type="hidden" name="logo" value={logo} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="company-client">
                    <Translate contentKey="grupoAmigoBackendApp.company.client">Client</Translate>
                  </Label>
                  <AvInput id="company-client" type="select" className="form-control" name="client.id">
                    <option value="" key="0" />
                    {clients
                      ? clients.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.legalName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="company-contactCards">
                    <Translate contentKey="grupoAmigoBackendApp.company.contactCards">Contact Cards</Translate>
                  </Label>
                  <AvInput
                    id="company-contactCards"
                    type="select"
                    multiple
                    className="form-control"
                    name="contactCards"
                    value={companyEntity.contactCards && companyEntity.contactCards.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {contactCards
                      ? contactCards.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.value}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="company-services">
                    <Translate contentKey="grupoAmigoBackendApp.company.services">Services</Translate>
                  </Label>
                  <AvInput
                    id="company-services"
                    type="select"
                    multiple
                    className="form-control"
                    name="services"
                    value={companyEntity.services && companyEntity.services.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {services
                      ? services.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="company-locations">
                    <Translate contentKey="grupoAmigoBackendApp.company.locations">Locations</Translate>
                  </Label>
                  <AvInput
                    id="company-locations"
                    type="select"
                    multiple
                    className="form-control"
                    name="locations"
                    value={companyEntity.locations && companyEntity.locations.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {locations
                      ? locations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.address}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="company-manouvers">
                    <Translate contentKey="grupoAmigoBackendApp.company.manouvers">Manouvers</Translate>
                  </Label>
                  <AvInput
                    id="company-manouvers"
                    type="select"
                    multiple
                    className="form-control"
                    name="manouvers"
                    value={companyEntity.manouvers && companyEntity.manouvers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {manouvers
                      ? manouvers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="company-contract">
                    <Translate contentKey="grupoAmigoBackendApp.company.contract">Contract</Translate>
                  </Label>
                  <AvInput
                    id="company-contract"
                    type="select"
                    multiple
                    className="form-control"
                    name="contracts"
                    value={companyEntity.contracts && companyEntity.contracts.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {contracts
                      ? contracts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/company" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  clients: storeState.client.entities,
  contactCards: storeState.contactCard.entities,
  services: storeState.service.entities,
  locations: storeState.location.entities,
  manouvers: storeState.manouver.entities,
  contracts: storeState.contract.entities,
  memberships: storeState.membership.entities,
  companyEntity: storeState.company.entity,
  loading: storeState.company.loading,
  updating: storeState.company.updating,
  updateSuccess: storeState.company.updateSuccess
});

const mapDispatchToProps = {
  getClients,
  getContactCards,
  getServices,
  getLocations,
  getManouvers,
  getContracts,
  getMemberships,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyUpdate);
