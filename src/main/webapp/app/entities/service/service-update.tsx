import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IManouver } from 'app/shared/model/manouver.model';
import { getEntities as getManouvers } from 'app/entities/manouver/manouver.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { getEntities as getServiceRequests } from 'app/entities/service-request/service-request.reducer';
import { getEntity, updateEntity, createEntity, reset } from './service.reducer';
import { IService } from 'app/shared/model/service.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IServiceUpdateState {
  isNew: boolean;
  idsmanouvers: any[];
  contractId: string;
  companyId: string;
  serviceRequestId: string;
}

export class ServiceUpdate extends React.Component<IServiceUpdateProps, IServiceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsmanouvers: [],
      contractId: '0',
      companyId: '0',
      serviceRequestId: '0',
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

    this.props.getManouvers();
    this.props.getContracts();
    this.props.getCompanies();
    this.props.getServiceRequests();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { serviceEntity } = this.props;
      const entity = {
        ...serviceEntity,
        ...values,
        manouvers: mapIdList(values.manouvers)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/service');
  };

  render() {
    const { serviceEntity, manouvers, contracts, companies, serviceRequests, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.service.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.service.home.createOrEditLabel">Create or edit a Service</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : serviceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="service-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="service-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="service-title">
                    <Translate contentKey="grupoAmigoBackendApp.service.title">Title</Translate>
                  </Label>
                  <AvField
                    id="service-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="service-description">
                    <Translate contentKey="grupoAmigoBackendApp.service.description">Description</Translate>
                  </Label>
                  <AvField
                    id="service-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="service-type">
                    <Translate contentKey="grupoAmigoBackendApp.service.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="service-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && serviceEntity.type) || 'CARGA'}
                  >
                    <option value="CARGA">{translate('grupoAmigoBackendApp.ServiceType.CARGA')}</option>
                    <option value="DESCARGA">{translate('grupoAmigoBackendApp.ServiceType.DESCARGA')}</option>
                    <option value="TRANSPORTE">{translate('grupoAmigoBackendApp.ServiceType.TRANSPORTE')}</option>
                    <option value="IMPORTACION">{translate('grupoAmigoBackendApp.ServiceType.IMPORTACION')}</option>
                    <option value="EXPORTACION">{translate('grupoAmigoBackendApp.ServiceType.EXPORTACION')}</option>
                    <option value="ALMACENAJE">{translate('grupoAmigoBackendApp.ServiceType.ALMACENAJE')}</option>
                    <option value="INSPECCION">{translate('grupoAmigoBackendApp.ServiceType.INSPECCION')}</option>
                    <option value="REPARACION">{translate('grupoAmigoBackendApp.ServiceType.REPARACION')}</option>
                    <option value="CROSS_DOCK">{translate('grupoAmigoBackendApp.ServiceType.CROSS_DOCK')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="unitLabel" for="service-unit">
                    <Translate contentKey="grupoAmigoBackendApp.service.unit">Unit</Translate>
                  </Label>
                  <AvInput
                    id="service-unit"
                    type="select"
                    className="form-control"
                    name="unit"
                    value={(!isNew && serviceEntity.unit) || 'TM'}
                  >
                    <option value="TM">{translate('grupoAmigoBackendApp.ServiceUnitType.TM')}</option>
                    <option value="KG">{translate('grupoAmigoBackendApp.ServiceUnitType.KG')}</option>
                    <option value="CONTENEDOR_20TM">{translate('grupoAmigoBackendApp.ServiceUnitType.CONTENEDOR_20TM')}</option>
                    <option value="CONTENEDOR_40TM">{translate('grupoAmigoBackendApp.ServiceUnitType.CONTENEDOR_40TM')}</option>
                    <option value="M2">{translate('grupoAmigoBackendApp.ServiceUnitType.M2')}</option>
                    <option value="TARIMA">{translate('grupoAmigoBackendApp.ServiceUnitType.TARIMA')}</option>
                    <option value="KM">{translate('grupoAmigoBackendApp.ServiceUnitType.KM')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="service-status">
                    <Translate contentKey="grupoAmigoBackendApp.service.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="service-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && serviceEntity.status) || 'PROCESANDO'}
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
                  <Label for="service-manouvers">
                    <Translate contentKey="grupoAmigoBackendApp.service.manouvers">Manouvers</Translate>
                  </Label>
                  <AvInput
                    id="service-manouvers"
                    type="select"
                    multiple
                    className="form-control"
                    name="manouvers"
                    value={serviceEntity.manouvers && serviceEntity.manouvers.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/entity/service" replace color="info">
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
  manouvers: storeState.manouver.entities,
  contracts: storeState.contract.entities,
  companies: storeState.company.entities,
  serviceRequests: storeState.serviceRequest.entities,
  serviceEntity: storeState.service.entity,
  loading: storeState.service.loading,
  updating: storeState.service.updating,
  updateSuccess: storeState.service.updateSuccess
});

const mapDispatchToProps = {
  getManouvers,
  getContracts,
  getCompanies,
  getServiceRequests,
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
)(ServiceUpdate);
