import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountryCode } from 'app/shared/model/country-code.model';
import { getEntities as getCountryCodes } from 'app/entities/country-code/country-code.reducer';
import { IStateCode } from 'app/shared/model/state-code.model';
import { getEntities as getStateCodes } from 'app/entities/state-code/state-code.reducer';
import { IManouverRequest } from 'app/shared/model/manouver-request.model';
import { getEntities as getManouverRequests } from 'app/entities/manouver-request/manouver-request.reducer';
import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILocationUpdateState {
  isNew: boolean;
  countryCodeId: string;
  stateCodeId: string;
  manouverRequestOriginId: string;
  manouverRequestDestinyId: string;
  clientId: string;
  companyId: string;
}

export class LocationUpdate extends React.Component<ILocationUpdateProps, ILocationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      countryCodeId: '0',
      stateCodeId: '0',
      manouverRequestOriginId: '0',
      manouverRequestDestinyId: '0',
      clientId: '0',
      companyId: '0',
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

    this.props.getCountryCodes();
    this.props.getStateCodes();
    this.props.getManouverRequests();
    this.props.getClients();
    this.props.getCompanies();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { locationEntity } = this.props;
      const entity = {
        ...locationEntity,
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
    this.props.history.push('/entity/location');
  };

  render() {
    const { locationEntity, countryCodes, stateCodes, manouverRequests, clients, companies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.location.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.location.home.createOrEditLabel">Create or edit a Location</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : locationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="location-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="location-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="addressLabel" for="location-address">
                    <Translate contentKey="grupoAmigoBackendApp.location.address">Address</Translate>
                  </Label>
                  <AvField
                    id="location-address"
                    type="text"
                    name="address"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="latLabel" for="location-lat">
                    <Translate contentKey="grupoAmigoBackendApp.location.lat">Lat</Translate>
                  </Label>
                  <AvField id="location-lat" type="text" name="lat" />
                </AvGroup>
                <AvGroup>
                  <Label id="lngLabel" for="location-lng">
                    <Translate contentKey="grupoAmigoBackendApp.location.lng">Lng</Translate>
                  </Label>
                  <AvField id="location-lng" type="text" name="lng" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/location" replace color="info">
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
  countryCodes: storeState.countryCode.entities,
  stateCodes: storeState.stateCode.entities,
  manouverRequests: storeState.manouverRequest.entities,
  clients: storeState.client.entities,
  companies: storeState.company.entities,
  locationEntity: storeState.location.entity,
  loading: storeState.location.loading,
  updating: storeState.location.updating,
  updateSuccess: storeState.location.updateSuccess
});

const mapDispatchToProps = {
  getCountryCodes,
  getStateCodes,
  getManouverRequests,
  getClients,
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
)(LocationUpdate);
