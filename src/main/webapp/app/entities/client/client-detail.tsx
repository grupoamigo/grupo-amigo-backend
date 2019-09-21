import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClientDetail extends React.Component<IClientDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clientEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="grupoAmigoBackendApp.client.detail.title">Client</Translate> [<b>{clientEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="legalName">
                <Translate contentKey="grupoAmigoBackendApp.client.legalName">Legal Name</Translate>
              </span>
            </dt>
            <dd>{clientEntity.legalName}</dd>
            <dt>
              <span id="memberSince">
                <Translate contentKey="grupoAmigoBackendApp.client.memberSince">Member Since</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={clientEntity.memberSince} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="grupoAmigoBackendApp.client.status">Status</Translate>
              </span>
            </dt>
            <dd>{clientEntity.status}</dd>
            <dt>
              <span id="internalNotes">
                <Translate contentKey="grupoAmigoBackendApp.client.internalNotes">Internal Notes</Translate>
              </span>
            </dt>
            <dd>{clientEntity.internalNotes}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.client.contactCards">Contact Cards</Translate>
            </dt>
            <dd>
              {clientEntity.contactCards
                ? clientEntity.contactCards.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.value}</a>
                      {i === clientEntity.contactCards.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.client.locations">Locations</Translate>
            </dt>
            <dd>
              {clientEntity.locations
                ? clientEntity.locations.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.address}</a>
                      {i === clientEntity.locations.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.client.contracts">Contracts</Translate>
            </dt>
            <dd>
              {clientEntity.contracts
                ? clientEntity.contracts.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === clientEntity.contracts.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.client.serviceQuotes">Service Quotes</Translate>
            </dt>
            <dd>
              {clientEntity.serviceQuotes
                ? clientEntity.serviceQuotes.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === clientEntity.serviceQuotes.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/client" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/client/${clientEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ client }: IRootState) => ({
  clientEntity: client.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientDetail);
