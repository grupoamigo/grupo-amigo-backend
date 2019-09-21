import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './membership.reducer';
import { IMembership } from 'app/shared/model/membership.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMembershipUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMembershipUpdateState {
  isNew: boolean;
  companyId: string;
  userId: string;
}

export class MembershipUpdate extends React.Component<IMembershipUpdateProps, IMembershipUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      companyId: '0',
      userId: '0',
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

    this.props.getCompanies();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.created = convertDateTimeToServer(values.created);

    if (errors.length === 0) {
      const { membershipEntity } = this.props;
      const entity = {
        ...membershipEntity,
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
    this.props.history.push('/entity/membership');
  };

  render() {
    const { membershipEntity, companies, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.membership.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.membership.home.createOrEditLabel">Create or edit a Membership</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : membershipEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="membership-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="membership-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="membership-title">
                    <Translate contentKey="grupoAmigoBackendApp.membership.title">Title</Translate>
                  </Label>
                  <AvField id="membership-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="membership-price">
                    <Translate contentKey="grupoAmigoBackendApp.membership.price">Price</Translate>
                  </Label>
                  <AvField id="membership-price" type="string" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label id="currencyLabel" for="membership-currency">
                    <Translate contentKey="grupoAmigoBackendApp.membership.currency">Currency</Translate>
                  </Label>
                  <AvInput
                    id="membership-currency"
                    type="select"
                    className="form-control"
                    name="currency"
                    value={(!isNew && membershipEntity.currency) || 'MXN'}
                  >
                    <option value="MXN">{translate('grupoAmigoBackendApp.CurrencyType.MXN')}</option>
                    <option value="USD">{translate('grupoAmigoBackendApp.CurrencyType.USD')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="createdLabel" for="membership-created">
                    <Translate contentKey="grupoAmigoBackendApp.membership.created">Created</Translate>
                  </Label>
                  <AvInput
                    id="membership-created"
                    type="datetime-local"
                    className="form-control"
                    name="created"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.membershipEntity.created)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="expiresLabel" for="membership-expires">
                    <Translate contentKey="grupoAmigoBackendApp.membership.expires">Expires</Translate>
                  </Label>
                  <AvField id="membership-expires" type="date" className="form-control" name="expires" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="membership-type">
                    <Translate contentKey="grupoAmigoBackendApp.membership.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="membership-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && membershipEntity.type) || 'CEO'}
                  >
                    <option value="CEO">{translate('grupoAmigoBackendApp.MembershipType.CEO')}</option>
                    <option value="VP">{translate('grupoAmigoBackendApp.MembershipType.VP')}</option>
                    <option value="JEFE_DE_DIVISION">{translate('grupoAmigoBackendApp.MembershipType.JEFE_DE_DIVISION')}</option>
                    <option value="SUPERVISOR">{translate('grupoAmigoBackendApp.MembershipType.SUPERVISOR')}</option>
                    <option value="INSPECTOR">{translate('grupoAmigoBackendApp.MembershipType.INSPECTOR')}</option>
                    <option value="VIGILANTE">{translate('grupoAmigoBackendApp.MembershipType.VIGILANTE')}</option>
                    <option value="CHOFER">{translate('grupoAmigoBackendApp.MembershipType.CHOFER')}</option>
                    <option value="ADMINISTRATIVO">{translate('grupoAmigoBackendApp.MembershipType.ADMINISTRATIVO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="membership-company">
                    <Translate contentKey="grupoAmigoBackendApp.membership.company">Company</Translate>
                  </Label>
                  <AvInput id="membership-company" type="select" className="form-control" name="company.id">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.legalName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="membership-user">
                    <Translate contentKey="grupoAmigoBackendApp.membership.user">User</Translate>
                  </Label>
                  <AvInput id="membership-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.email}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/membership" replace color="info">
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
  companies: storeState.company.entities,
  users: storeState.userManagement.users,
  membershipEntity: storeState.membership.entity,
  loading: storeState.membership.loading,
  updating: storeState.membership.updating,
  updateSuccess: storeState.membership.updateSuccess
});

const mapDispatchToProps = {
  getCompanies,
  getUsers,
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
)(MembershipUpdate);
