import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Company extends React.Component<ICompanyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { companyList, match } = this.props;
    return (
      <div>
        <h2 id="company-heading">
          <Translate contentKey="grupoAmigoBackendApp.company.home.title">Companies</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.company.home.createLabel">Create a new Company</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {companyList && companyList.length > 0 ? (
            <Table responsive aria-describedby="company-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.legalName">Legal Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.taxId">Tax Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.logo">Logo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.client">Client</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.contactCards">Contact Cards</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.services">Services</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.locations">Locations</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.manouvers">Manouvers</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.company.contracts">Contracts</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {companyList.map((company, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${company.id}`} color="link" size="sm">
                        {company.id}
                      </Button>
                    </td>
                    <td>{company.legalName}</td>
                    <td>{company.taxId}</td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.CompanyType.${company.type}`} />
                    </td>
                    <td>
                      {company.logo ? (
                        <div>
                          <a onClick={openFile(company.logoContentType, company.logo)}>
                            <img src={`data:${company.logoContentType};base64,${company.logo}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {company.logoContentType}, {byteSize(company.logo)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{company.client ? <Link to={`client/${company.client.id}`}>{company.client.legalName}</Link> : ''}</td>
                    <td>
                      {company.contactCards
                        ? company.contactCards.map((val, j) => (
                            <span key={j}>
                              <Link to={`contact-card/${val.id}`}>{val.value}</Link>
                              {j === company.contactCards.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {company.services
                        ? company.services.map((val, j) => (
                            <span key={j}>
                              <Link to={`service/${val.id}`}>{val.title}</Link>
                              {j === company.services.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {company.locations
                        ? company.locations.map((val, j) => (
                            <span key={j}>
                              <Link to={`location/${val.id}`}>{val.address}</Link>
                              {j === company.locations.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {company.manouvers
                        ? company.manouvers.map((val, j) => (
                            <span key={j}>
                              <Link to={`manouver/${val.id}`}>{val.title}</Link>
                              {j === company.manouvers.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {company.contracts
                        ? company.contracts.map((val, j) => (
                            <span key={j}>
                              <Link to={`contract/${val.id}`}>{val.title}</Link>
                              {j === company.contracts.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${company.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${company.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${company.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.company.home.notFound">No Companies found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ company }: IRootState) => ({
  companyList: company.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
