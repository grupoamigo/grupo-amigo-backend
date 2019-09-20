import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { getEntities as getServiceQuotes } from 'app/entities/service-quote/service-quote.reducer';
import { IService } from 'app/shared/model/service.model';
import { getEntities as getServices } from 'app/entities/service/service.reducer';
import { getEntity, updateEntity, createEntity, reset } from './service-request.reducer';
import { IServiceRequest } from 'app/shared/model/service-request.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServiceRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IServiceRequestUpdateState {
  isNew: boolean;
  idsservices: any[];
  clientId: string;
  serviceQuoteId: string;
}

export class ServiceRequestUpdate extends React.Component<IServiceRequestUpdateProps, IServiceRequestUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsservices: [],
      clientId: '0',
      serviceQuoteId: '0',
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
    this.props.getServiceQuotes();
    this.props.getServices();
  }

  saveEntity = (event, errors, values) => {
    values.dateRequested = convertDateTimeToServer(values.dateRequested);

    if (errors.length === 0) {
      const { serviceRequestEntity } = this.props;
      const entity = {
        ...serviceRequestEntity,
        ...values,
        services: mapIdList(values.services)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/service-request');
  };

  render() {
    const { serviceRequestEntity, clients, serviceQuotes, services, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.serviceRequest.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.serviceRequest.home.createOrEditLabel">Create or edit a ServiceRequest</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : serviceRequestEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="service-request-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="service-request-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="service-request-title">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.title">Title</Translate>
                  </Label>
                  <AvField
                    id="service-request-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="service-request-description">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.description">Description</Translate>
                  </Label>
                  <AvField
                    id="service-request-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateRequestedLabel" for="service-request-dateRequested">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateRequested">Date Requested</Translate>
                  </Label>
                  <AvInput
                    id="service-request-dateRequested"
                    type="datetime-local"
                    className="form-control"
                    name="dateRequested"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.serviceRequestEntity.dateRequested)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateBeginLabel" for="service-request-dateBegin">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateBegin">Date Begin</Translate>
                  </Label>
                  <AvField
                    id="service-request-dateBegin"
                    type="date"
                    className="form-control"
                    name="dateBegin"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateEndLabel" for="service-request-dateEnd">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateEnd">Date End</Translate>
                  </Label>
                  <AvField id="service-request-dateEnd" type="date" className="form-control" name="dateEnd" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="service-request-status">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="service-request-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && serviceRequestEntity.status) || 'PROCESANDO'}
                  >
                    <option value="PROCESANDO">{translate('grupoAmigoBackendApp.StatusType.PROCESANDO')}</option>
                    <option value="CONFIRMADO">{translate('grupoAmigoBackendApp.StatusType.CONFIRMADO')}</option>
                    <option value="ACTIVO">{translate('grupoAmigoBackendApp.StatusType.ACTIVO')}</option>
                    <option value="EN_ESPERA">{translate('grupoAmigoBackendApp.StatusType.EN_ESPERA')}</option>
                    <option value="TERMINADO">{translate('grupoAmigoBackendApp.StatusType.TERMINADO')}</option>
                    <option value="CANCELADO">{translate('grupoAmigoBackendApp.StatusType.CANCELADO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="service-request-client">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.client">Client</Translate>
                  </Label>
                  <AvInput id="service-request-client" type="select" className="form-control" name="client.id">
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
                  <Label for="service-request-serviceQuote">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.serviceQuote">Service Quote</Translate>
                  </Label>
                  <AvInput id="service-request-serviceQuote" type="select" className="form-control" name="serviceQuote.id">
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
                <AvGroup>
                  <Label for="service-request-services">
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.services">Services</Translate>
                  </Label>
                  <AvInput
                    id="service-request-services"
                    type="select"
                    multiple
                    className="form-control"
                    name="services"
                    value={serviceRequestEntity.services && serviceRequestEntity.services.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/entity/service-request" replace color="info">
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
  serviceQuotes: storeState.serviceQuote.entities,
  services: storeState.service.entities,
  serviceRequestEntity: storeState.serviceRequest.entity,
  loading: storeState.serviceRequest.loading,
  updating: storeState.serviceRequest.updating,
  updateSuccess: storeState.serviceRequest.updateSuccess
});

const mapDispatchToProps = {
  getClients,
  getServiceQuotes,
  getServices,
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
)(ServiceRequestUpdate);
