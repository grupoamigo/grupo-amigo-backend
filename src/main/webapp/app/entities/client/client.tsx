import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Client extends React.Component<IClientProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { clientList, match } = this.props;
    return (
      <div>
        <h2 id="client-heading">
          <Translate contentKey="grupoAmigoBackendApp.client.home.title">Clients</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.client.home.createLabel">Create a new Client</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {clientList && clientList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.legalName">Legal Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.memberSince">Member Since</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.internalNotes">Internal Notes</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.contactCards">Contact Cards</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.locations">Locations</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.manouverRequest">Manouver Request</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.contract">Contract</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.client.serviceQuote">Service Quote</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clientList.map((client, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${client.id}`} color="link" size="sm">
                        {client.id}
                      </Button>
                    </td>
                    <td>{client.legalName}</td>
                    <td>
                      <TextFormat type="date" value={client.memberSince} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.ClientStatusType.${client.status}`} />
                    </td>
                    <td>{client.internalNotes}</td>
                    <td>
                      {client.contactCards
                        ? client.contactCards.map((val, j) => (
                            <span key={j}>
                              <Link to={`contact-card/${val.id}`}>{val.value}</Link>
                              {j === client.contactCards.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {client.locations
                        ? client.locations.map((val, j) => (
                            <span key={j}>
                              <Link to={`location/${val.id}`}>{val.address}</Link>
                              {j === client.locations.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {client.manouverRequests
                        ? client.manouverRequests.map((val, j) => (
                            <span key={j}>
                              <Link to={`manouver-request/${val.id}`}>{val.title}</Link>
                              {j === client.manouverRequests.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {client.contracts
                        ? client.contracts.map((val, j) => (
                            <span key={j}>
                              <Link to={`contract/${val.id}`}>{val.title}</Link>
                              {j === client.contracts.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {client.serviceQuotes
                        ? client.serviceQuotes.map((val, j) => (
                            <span key={j}>
                              <Link to={`service-quote/${val.id}`}>{val.title}</Link>
                              {j === client.serviceQuotes.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${client.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${client.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${client.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="grupoAmigoBackendApp.client.home.notFound">No Clients found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ client }: IRootState) => ({
  clientList: client.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client);
