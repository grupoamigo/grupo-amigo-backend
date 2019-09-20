import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILoad } from 'app/shared/model/load.model';
import { getEntities as getLoads } from 'app/entities/load/load.reducer';
import { getEntity, updateEntity, createEntity, reset } from './seal.reducer';
import { ISeal } from 'app/shared/model/seal.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISealUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISealUpdateState {
  isNew: boolean;
  loadId: string;
}

export class SealUpdate extends React.Component<ISealUpdateProps, ISealUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      loadId: '0',
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

    this.props.getLoads();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { sealEntity } = this.props;
      const entity = {
        ...sealEntity,
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
    this.props.history.push('/entity/seal');
  };

  render() {
    const { sealEntity, loads, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.seal.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.seal.home.createOrEditLabel">Create or edit a Seal</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : sealEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="seal-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="seal-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="issuerLabel" for="seal-issuer">
                    <Translate contentKey="grupoAmigoBackendApp.seal.issuer">Issuer</Translate>
                  </Label>
                  <AvField
                    id="seal-issuer"
                    type="text"
                    name="issuer"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="uniqueIdLabel" for="seal-uniqueId">
                    <Translate contentKey="grupoAmigoBackendApp.seal.uniqueId">Unique Id</Translate>
                  </Label>
                  <AvField
                    id="seal-uniqueId"
                    type="text"
                    name="uniqueId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/seal" replace color="info">
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
  loads: storeState.load.entities,
  sealEntity: storeState.seal.entity,
  loading: storeState.seal.loading,
  updating: storeState.seal.updating,
  updateSuccess: storeState.seal.updateSuccess
});

const mapDispatchToProps = {
  getLoads,
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
)(SealUpdate);
