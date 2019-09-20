import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContactCard } from 'app/shared/model/contact-card.model';
import { getEntities as getContactCards } from 'app/entities/contact-card/contact-card.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IManouverRequest } from 'app/shared/model/manouver-request.model';
import { getEntities as getManouverRequests } from 'app/entities/manouver-request/manouver-request.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { getEntities as getServiceQuotes } from 'app/entities/service-quote/service-quote.reducer';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { getEntities as getServiceRequests } from 'app/entities/service-request/service-request.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClientUpdateState {
  isNew: boolean;
  idscontactCards: any[];
  idslocations: any[];
  idsmanouverRequest: any[];
  idscontract: any[];
  idsserviceQuote: any[];
  manouverRequestClientId: string;
  serviceRequestId: string;
  hirerId: string;
}

export class ClientUpdate extends React.Component<IClientUpdateProps, IClientUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscontactCards: [],
      idslocations: [],
      idsmanouverRequest: [],
      idscontract: [],
      idsserviceQuote: [],
      manouverRequestClientId: '0',
      serviceRequestId: '0',
      hirerId: '0',
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

    this.props.getContactCards();
    this.props.getLocations();
    this.props.getManouverRequests();
    this.props.getContracts();
    this.props.getServiceQuotes();
    this.props.getServiceRequests();
    this.props.getCompanies();
  }

  saveEntity = (event, errors, values) => {
    values.memberSince = convertDateTimeToServer(values.memberSince);

    if (errors.length === 0) {
      const { clientEntity } = this.props;
      const entity = {
        ...clientEntity,
        ...values,
        contactCards: mapIdList(values.contactCards),
        locations: mapIdList(values.locations),
        manouverRequests: mapIdList(values.manouverRequests),
        contracts: mapIdList(values.contracts),
        serviceQuotes: mapIdList(values.serviceQuotes)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/client');
  };

  render() {
    const {
      clientEntity,
      contactCards,
      locations,
      manouverRequests,
      contracts,
      serviceQuotes,
      serviceRequests,
      companies,
      loading,
      updating
    } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.client.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.client.home.createOrEditLabel">Create or edit a Client</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : clientEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="client-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="client-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="legalNameLabel" for="client-legalName">
                    <Translate contentKey="grupoAmigoBackendApp.client.legalName">Legal Name</Translate>
                  </Label>
                  <AvField
                    id="client-legalName"
                    type="text"
                    name="legalName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="memberSinceLabel" for="client-memberSince">
                    <Translate contentKey="grupoAmigoBackendApp.client.memberSince">Member Since</Translate>
                  </Label>
                  <AvInput
                    id="client-memberSince"
                    type="datetime-local"
                    className="form-control"
                    name="memberSince"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.clientEntity.memberSince)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="client-status">
                    <Translate contentKey="grupoAmigoBackendApp.client.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="client-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && clientEntity.status) || 'ACTIVO'}
                  >
                    <option value="ACTIVO">{translate('grupoAmigoBackendApp.ClientStatusType.ACTIVO')}</option>
                    <option value="SOLICITUD">{translate('grupoAmigoBackendApp.ClientStatusType.SOLICITUD')}</option>
                    <option value="APROBADO">{translate('grupoAmigoBackendApp.ClientStatusType.APROBADO')}</option>
                    <option value="VERIFICADO">{translate('grupoAmigoBackendApp.ClientStatusType.VERIFICADO')}</option>
                    <option value="DECLINADO">{translate('grupoAmigoBackendApp.ClientStatusType.DECLINADO')}</option>
                    <option value="CANCELADO">{translate('grupoAmigoBackendApp.ClientStatusType.CANCELADO')}</option>
                    <option value="PAUSADO">{translate('grupoAmigoBackendApp.ClientStatusType.PAUSADO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="internalNotesLabel" for="client-internalNotes">
                    <Translate contentKey="grupoAmigoBackendApp.client.internalNotes">Internal Notes</Translate>
                  </Label>
                  <AvField id="client-internalNotes" type="text" name="internalNotes" />
                </AvGroup>
                <AvGroup>
                  <Label for="client-contactCards">
                    <Translate contentKey="grupoAmigoBackendApp.client.contactCards">Contact Cards</Translate>
                  </Label>
                  <AvInput
                    id="client-contactCards"
                    type="select"
                    multiple
                    className="form-control"
                    name="contactCards"
                    value={clientEntity.contactCards && clientEntity.contactCards.map(e => e.id)}
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
                  <Label for="client-locations">
                    <Translate contentKey="grupoAmigoBackendApp.client.locations">Locations</Translate>
                  </Label>
                  <AvInput
                    id="client-locations"
                    type="select"
                    multiple
                    className="form-control"
                    name="locations"
                    value={clientEntity.locations && clientEntity.locations.map(e => e.id)}
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
                  <Label for="client-manouverRequest">
                    <Translate contentKey="grupoAmigoBackendApp.client.manouverRequest">Manouver Request</Translate>
                  </Label>
                  <AvInput
                    id="client-manouverRequest"
                    type="select"
                    multiple
                    className="form-control"
                    name="manouverRequests"
                    value={clientEntity.manouverRequests && clientEntity.manouverRequests.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {manouverRequests
                      ? manouverRequests.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="client-contract">
                    <Translate contentKey="grupoAmigoBackendApp.client.contract">Contract</Translate>
                  </Label>
                  <AvInput
                    id="client-contract"
                    type="select"
                    multiple
                    className="form-control"
                    name="contracts"
                    value={clientEntity.contracts && clientEntity.contracts.map(e => e.id)}
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
                <AvGroup>
                  <Label for="client-serviceQuote">
                    <Translate contentKey="grupoAmigoBackendApp.client.serviceQuote">Service Quote</Translate>
                  </Label>
                  <AvInput
                    id="client-serviceQuote"
                    type="select"
                    multiple
                    className="form-control"
                    name="serviceQuotes"
                    value={clientEntity.serviceQuotes && clientEntity.serviceQuotes.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {serviceQuotes
                      ? serviceQuotes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/client" replace color="info">
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
  contactCards: storeState.contactCard.entities,
  locations: storeState.location.entities,
  manouverRequests: storeState.manouverRequest.entities,
  contracts: storeState.contract.entities,
  serviceQuotes: storeState.serviceQuote.entities,
  serviceRequests: storeState.serviceRequest.entities,
  companies: storeState.company.entities,
  clientEntity: storeState.client.entity,
  loading: storeState.client.loading,
  updating: storeState.client.updating,
  updateSuccess: storeState.client.updateSuccess
});

const mapDispatchToProps = {
  getContactCards,
  getLocations,
  getManouverRequests,
  getContracts,
  getServiceQuotes,
  getServiceRequests,
  getCompanies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientUpdate);
