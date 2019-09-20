import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './service.reducer';
import { IService } from 'app/shared/model/service.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServiceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Service extends React.Component<IServiceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { serviceList, match } = this.props;
    return (
      <div>
        <h2 id="service-heading">
          <Translate contentKey="grupoAmigoBackendApp.service.home.title">Services</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.service.home.createLabel">Create a new Service</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {serviceList && serviceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.service.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.service.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.service.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.service.unit">Unit</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.service.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.service.manouver">Manouver</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {serviceList.map((service, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${service.id}`} color="link" size="sm">
                        {service.id}
                      </Button>
                    </td>
                    <td>{service.title}</td>
                    <td>{service.description}</td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.ServiceType.${service.type}`} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.ServiceUnitType.${service.unit}`} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.StatusType.${service.status}`} />
                    </td>
                    <td>
                      {service.manouvers
                        ? service.manouvers.map((val, j) => (
                            <span key={j}>
                              <Link to={`manouver/${val.id}`}>{val.title}</Link>
                              {j === service.manouvers.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${service.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${service.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${service.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.service.home.notFound">No Services found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ service }: IRootState) => ({
  serviceList: service.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Service);