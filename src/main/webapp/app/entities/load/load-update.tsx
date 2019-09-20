import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISeal } from 'app/shared/model/seal.model';
import { getEntities as getSeals } from 'app/entities/seal/seal.reducer';
import { IManouverRequest } from 'app/shared/model/manouver-request.model';
import { getEntities as getManouverRequests } from 'app/entities/manouver-request/manouver-request.reducer';
import { getEntity, updateEntity, createEntity, reset } from './load.reducer';
import { ILoad } from 'app/shared/model/load.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILoadUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILoadUpdateState {
  isNew: boolean;
  idsseal: any[];
  manouverRequestId: string;
}

export class LoadUpdate extends React.Component<ILoadUpdateProps, ILoadUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsseal: [],
      manouverRequestId: '0',
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

    this.props.getSeals();
    this.props.getManouverRequests();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { loadEntity } = this.props;
      const entity = {
        ...loadEntity,
        ...values,
        seals: mapIdList(values.seals)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/load');
  };

  render() {
    const { loadEntity, seals, manouverRequests, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.load.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.load.home.createOrEditLabel">Create or edit a Load</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : loadEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="load-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="load-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="load-type">
                    <Translate contentKey="grupoAmigoBackendApp.load.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="load-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && loadEntity.type) || 'CONTENEDOR'}
                  >
                    <option value="CONTENEDOR">{translate('grupoAmigoBackendApp.LoadType.CONTENEDOR')}</option>
                    <option value="GRANEL">{translate('grupoAmigoBackendApp.LoadType.GRANEL')}</option>
                    <option value="PALLETS">{translate('grupoAmigoBackendApp.LoadType.PALLETS')}</option>
                    <option value="TUBERIA">{translate('grupoAmigoBackendApp.LoadType.TUBERIA')}</option>
                    <option value="CERVEZA">{translate('grupoAmigoBackendApp.LoadType.CERVEZA')}</option>
                    <option value="LECHE">{translate('grupoAmigoBackendApp.LoadType.LECHE')}</option>
                    <option value="POLIETILENO">{translate('grupoAmigoBackendApp.LoadType.POLIETILENO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="uniqueIdLabel" for="load-uniqueId">
                    <Translate contentKey="grupoAmigoBackendApp.load.uniqueId">Unique Id</Translate>
                  </Label>
                  <AvField
                    id="load-uniqueId"
                    type="text"
                    name="uniqueId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="load-seal">
                    <Translate contentKey="grupoAmigoBackendApp.load.seal">Seal</Translate>
                  </Label>
                  <AvInput
                    id="load-seal"
                    type="select"
                    multiple
                    className="form-control"
                    name="seals"
                    value={loadEntity.seals && loadEntity.seals.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {seals
                      ? seals.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.uniqueId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/load" replace color="info">
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
  seals: storeState.seal.entities,
  manouverRequests: storeState.manouverRequest.entities,
  loadEntity: storeState.load.entity,
  loading: storeState.load.loading,
  updating: storeState.load.updating,
  updateSuccess: storeState.load.updateSuccess
});

const mapDispatchToProps = {
  getSeals,
  getManouverRequests,
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
)(LoadUpdate);
