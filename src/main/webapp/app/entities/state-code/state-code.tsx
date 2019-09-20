import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './state-code.reducer';
import { IStateCode } from 'app/shared/model/state-code.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStateCodeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class StateCode extends React.Component<IStateCodeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { stateCodeList, match } = this.props;
    return (
      <div>
        <h2 id="state-code-heading">
          <Translate contentKey="grupoAmigoBackendApp.stateCode.home.title">State Codes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.stateCode.home.createLabel">Create a new State Code</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {stateCodeList && stateCodeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.stateCode.code">Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.stateCode.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.stateCode.location">Location</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {stateCodeList.map((stateCode, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${stateCode.id}`} color="link" size="sm">
                        {stateCode.id}
                      </Button>
                    </td>
                    <td>{stateCode.code}</td>
                    <td>{stateCode.name}</td>
                    <td>{stateCode.location ? <Link to={`location/${stateCode.location.id}`}>{stateCode.location.address}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${stateCode.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${stateCode.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${stateCode.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.stateCode.home.notFound">No State Codes found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stateCode }: IRootState) => ({
  stateCodeList: stateCode.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateCode);
