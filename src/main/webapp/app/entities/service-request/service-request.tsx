import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './service-request.reducer';
import { IServiceRequest } from 'app/shared/model/service-request.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServiceRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ServiceRequest extends React.Component<IServiceRequestProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { serviceRequestList, match } = this.props;
    return (
      <div>
        <h2 id="service-request-heading">
          <Translate contentKey="grupoAmigoBackendApp.serviceRequest.home.title">Service Requests</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.serviceRequest.home.createLabel">Create a new Service Request</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {serviceRequestList && serviceRequestList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateRequested">Date Requested</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateBegin">Date Begin</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateEnd">Date End</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.client">Client</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.serviceQuote">Service Quote</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceRequest.services">Services</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {serviceRequestList.map((serviceRequest, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${serviceRequest.id}`} color="link" size="sm">
                        {serviceRequest.id}
                      </Button>
                    </td>
                    <td>{serviceRequest.title}</td>
                    <td>{serviceRequest.description}</td>
                    <td>
                      <TextFormat type="date" value={serviceRequest.dateRequested} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={serviceRequest.dateBegin} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={serviceRequest.dateEnd} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.StatusType.${serviceRequest.status}`} />
                    </td>
                    <td>
                      {serviceRequest.client ? (
                        <Link to={`client/${serviceRequest.client.id}`}>{serviceRequest.client.legalName}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {serviceRequest.serviceQuote ? (
                        <Link to={`service-quote/${serviceRequest.serviceQuote.id}`}>{serviceRequest.serviceQuote.title}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {serviceRequest.services
                        ? serviceRequest.services.map((val, j) => (
                            <span key={j}>
                              <Link to={`service/${val.id}`}>{val.title}</Link>
                              {j === serviceRequest.services.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${serviceRequest.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${serviceRequest.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${serviceRequest.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.serviceRequest.home.notFound">No Service Requests found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ serviceRequest }: IRootState) => ({
  serviceRequestList: serviceRequest.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceRequest);
