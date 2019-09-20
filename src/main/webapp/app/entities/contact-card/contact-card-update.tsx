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
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './contact-card.reducer';
import { IContactCard } from 'app/shared/model/contact-card.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContactCardUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IContactCardUpdateState {
  isNew: boolean;
  clientId: string;
  companyId: string;
}

export class ContactCardUpdate extends React.Component<IContactCardUpdateProps, IContactCardUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getClients();
    this.props.getCompanies();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { contactCardEntity } = this.props;
      const entity = {
        ...contactCardEntity,
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
    this.props.history.push('/entity/contact-card');
  };

  render() {
    const { contactCardEntity, clients, companies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.contactCard.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.contactCard.home.createOrEditLabel">Create or edit a ContactCard</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : contactCardEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="contact-card-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="contact-card-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="contact-card-type">
                    <Translate contentKey="grupoAmigoBackendApp.contactCard.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="contact-card-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && contactCardEntity.type) || 'TELEFONO'}
                  >
                    <option value="TELEFONO">{translate('grupoAmigoBackendApp.ContactType.TELEFONO')}</option>
                    <option value="EMAIL">{translate('grupoAmigoBackendApp.ContactType.EMAIL')}</option>
                    <option value="WEBSITE">{translate('grupoAmigoBackendApp.ContactType.WEBSITE')}</option>
                    <option value="FACEBOOK">{translate('grupoAmigoBackendApp.ContactType.FACEBOOK')}</option>
                    <option value="TWITTER">{translate('grupoAmigoBackendApp.ContactType.TWITTER')}</option>
                    <option value="INSTAGRAM">{translate('grupoAmigoBackendApp.ContactType.INSTAGRAM')}</option>
                    <option value="LINKEDIN">{translate('grupoAmigoBackendApp.ContactType.LINKEDIN')}</option>
                    <option value="WHATSAPP">{translate('grupoAmigoBackendApp.ContactType.WHATSAPP')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="valueLabel" for="contact-card-value">
                    <Translate contentKey="grupoAmigoBackendApp.contactCard.value">Value</Translate>
                  </Label>
                  <AvField
                    id="contact-card-value"
                    type="text"
                    name="value"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/contact-card" replace color="info">
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
  companies: storeState.company.entities,
  contactCardEntity: storeState.contactCard.entity,
  loading: storeState.contactCard.loading,
  updating: storeState.contactCard.updating,
  updateSuccess: storeState.contactCard.updateSuccess
});

const mapDispatchToProps = {
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
)(ContactCardUpdate);
