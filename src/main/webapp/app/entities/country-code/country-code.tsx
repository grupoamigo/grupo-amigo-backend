import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './country-code.reducer';
import { ICountryCode } from 'app/shared/model/country-code.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryCodeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CountryCode extends React.Component<ICountryCodeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { countryCodeList, match } = this.props;
    return (
      <div>
        <h2 id="country-code-heading">
          <Translate contentKey="grupoAmigoBackendApp.countryCode.home.title">Country Codes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.countryCode.home.createLabel">Create a new Country Code</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {countryCodeList && countryCodeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.countryCode.code">Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.countryCode.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.countryCode.location">Location</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {countryCodeList.map((countryCode, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${countryCode.id}`} color="link" size="sm">
                        {countryCode.id}
                      </Button>
                    </td>
                    <td>{countryCode.code}</td>
                    <td>{countryCode.name}</td>
                    <td>
                      {countryCode.location ? <Link to={`location/${countryCode.location.id}`}>{countryCode.location.address}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${countryCode.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${countryCode.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${countryCode.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.countryCode.home.notFound">No Country Codes found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ countryCode }: IRootState) => ({
  countryCodeList: countryCode.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryCode);
