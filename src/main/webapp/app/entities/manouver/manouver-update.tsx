import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { getEntities as getServiceQuotes } from 'app/entities/service-quote/service-quote.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IService } from 'app/shared/model/service.model';
import { getEntities as getServices } from 'app/entities/service/service.reducer';
import { getEntity, updateEntity, createEntity, reset } from './manouver.reducer';
import { IManouver } from 'app/shared/model/manouver.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IManouverUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IManouverUpdateState {
  isNew: boolean;
  serviceQuotesId: string;
  companyId: string;
  serviceId: string;
}

export class ManouverUpdate extends React.Component<IManouverUpdateProps, IManouverUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      serviceQuotesId: '0',
      companyId: '0',
      serviceId: '0',
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

    this.props.getServiceQuotes();
    this.props.getCompanies();
    this.props.getServices();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { manouverEntity } = this.props;
      const entity = {
        ...manouverEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/manouver');
  };

  render() {
    const { manouverEntity, serviceQuotes, companies, services, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.manouver.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.manouver.home.createOrEditLabel">Create or edit a Manouver</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : manouverEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="manouver-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="manouver-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="manouver-title">
                    <Translate contentKey="grupoAmigoBackendApp.manouver.title">Title</Translate>
                  </Label>
                  <AvField
                    id="manouver-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="manouver-description">
                    <Translate contentKey="grupoAmigoBackendApp.manouver.description">Description</Translate>
                  </Label>
                  <AvField
                    id="manouver-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unitLabel" for="manouver-unit">
                    <Translate contentKey="grupoAmigoBackendApp.manouver.unit">Unit</Translate>
                  </Label>
                  <AvInput
                    id="manouver-unit"
                    type="select"
                    className="form-control"
                    name="unit"
                    value={(!isNew && manouverEntity.unit) || 'TM'}
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
                  <Label id="divisionLabel" for="manouver-division">
                    <Translate contentKey="grupoAmigoBackendApp.manouver.division">Division</Translate>
                  </Label>
                  <AvInput
                    id="manouver-division"
                    type="select"
                    className="form-control"
                    name="division"
                    value={(!isNew && manouverEntity.division) || 'INTERMODAL'}
                  >
                    <option value="INTERMODAL">{translate('grupoAmigoBackendApp.DivisionType.INTERMODAL')}</option>
                    <option value="FERTILIZANTES">{translate('grupoAmigoBackendApp.DivisionType.FERTILIZANTES')}</option>
                    <option value="POLIETILENO">{translate('grupoAmigoBackendApp.DivisionType.POLIETILENO')}</option>
                    <option value="TUBERIA">{translate('grupoAmigoBackendApp.DivisionType.TUBERIA')}</option>
                    <option value="LACTEOS">{translate('grupoAmigoBackendApp.DivisionType.LACTEOS')}</option>
                    <option value="CERVEZA">{translate('grupoAmigoBackendApp.DivisionType.CERVEZA')}</option>
                    <option value="SAGARPA">{translate('grupoAmigoBackendApp.DivisionType.SAGARPA')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/manouver" replace color="info">
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
  serviceQuotes: storeState.serviceQuote.entities,
  companies: storeState.company.entities,
  services: storeState.service.entities,
  manouverEntity: storeState.manouver.entity,
  loading: storeState.manouver.loading,
  updating: storeState.manouver.updating,
  updateSuccess: storeState.manouver.updateSuccess
});

const mapDispatchToProps = {
  getServiceQuotes,
  getCompanies,
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
)(ManouverUpdate);
