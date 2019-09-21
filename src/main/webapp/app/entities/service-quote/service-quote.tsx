import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './service-quote.reducer';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServiceQuoteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ServiceQuote extends React.Component<IServiceQuoteProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { serviceQuoteList, match } = this.props;
    return (
      <div>
        <h2 id="service-quote-heading">
          <Translate contentKey="grupoAmigoBackendApp.serviceQuote.home.title">Service Quotes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.serviceQuote.home.createLabel">Create a new Service Quote</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {serviceQuoteList && serviceQuoteList.length > 0 ? (
            <Table responsive aria-describedby="service-quote-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.quantity">Quantity</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.price">Price</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.unit">Unit</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.expeditionDate">Expedition Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.expirationDate">Expiration Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.currency">Currency</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.approvedBy">Approved By</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.qrCode">Qr Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.manouver">Manouver</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {serviceQuoteList.map((serviceQuote, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${serviceQuote.id}`} color="link" size="sm">
                        {serviceQuote.id}
                      </Button>
                    </td>
                    <td>{serviceQuote.title}</td>
                    <td>{serviceQuote.description}</td>
                    <td>{serviceQuote.quantity}</td>
                    <td>{serviceQuote.price}</td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.ServiceUnitType.${serviceQuote.unit}`} />
                    </td>
                    <td>
                      <TextFormat type="date" value={serviceQuote.expeditionDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={serviceQuote.expirationDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.StatusType.${serviceQuote.status}`} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.CurrencyType.${serviceQuote.currency}`} />
                    </td>
                    <td>{serviceQuote.approvedBy}</td>
                    <td>
                      {serviceQuote.qrCode ? (
                        <div>
                          <a onClick={openFile(serviceQuote.qrCodeContentType, serviceQuote.qrCode)}>
                            <img
                              src={`data:${serviceQuote.qrCodeContentType};base64,${serviceQuote.qrCode}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {serviceQuote.qrCodeContentType}, {byteSize(serviceQuote.qrCode)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {serviceQuote.manouvers
                        ? serviceQuote.manouvers.map((val, j) => (
                            <span key={j}>
                              <Link to={`manouver/${val.id}`}>{val.title}</Link>
                              {j === serviceQuote.manouvers.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${serviceQuote.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${serviceQuote.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${serviceQuote.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.serviceQuote.home.notFound">No Service Quotes found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ serviceQuote }: IRootState) => ({
  serviceQuoteList: serviceQuote.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceQuote);
