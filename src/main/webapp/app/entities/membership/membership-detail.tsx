import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './membership.reducer';
import { IMembership } from 'app/shared/model/membership.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMembershipDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MembershipDetail extends React.Component<IMembershipDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { membershipEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="grupoAmigoBackendApp.membership.detail.title">Membership</Translate> [<b>{membershipEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="grupoAmigoBackendApp.membership.title">Title</Translate>
              </span>
            </dt>
            <dd>{membershipEntity.title}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="grupoAmigoBackendApp.membership.price">Price</Translate>
              </span>
            </dt>
            <dd>{membershipEntity.price}</dd>
            <dt>
              <span id="currency">
                <Translate contentKey="grupoAmigoBackendApp.membership.currency">Currency</Translate>
              </span>
            </dt>
            <dd>{membershipEntity.currency}</dd>
            <dt>
              <span id="created">
                <Translate contentKey="grupoAmigoBackendApp.membership.created">Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={membershipEntity.created} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="expires">
                <Translate contentKey="grupoAmigoBackendApp.membership.expires">Expires</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={membershipEntity.expires} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="type">
                <Translate contentKey="grupoAmigoBackendApp.membership.type">Type</Translate>
              </span>
            </dt>
            <dd>{membershipEntity.type}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.membership.company">Company</Translate>
            </dt>
            <dd>{membershipEntity.company ? membershipEntity.company.legalName : ''}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.membership.user">User</Translate>
            </dt>
            <dd>{membershipEntity.user ? membershipEntity.user.email : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/membership" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/membership/${membershipEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ membership }: IRootState) => ({
  membershipEntity: membership.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipDetail);
