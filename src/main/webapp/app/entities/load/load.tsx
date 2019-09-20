import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './load.reducer';
import { ILoad } from 'app/shared/model/load.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoadProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Load extends React.Component<ILoadProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { loadList, match } = this.props;
    return (
      <div>
        <h2 id="load-heading">
          <Translate contentKey="grupoAmigoBackendApp.load.home.title">Loads</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.load.home.createLabel">Create a new Load</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {loadList && loadList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.load.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.load.uniqueId">Unique Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.load.seal">Seal</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {loadList.map((load, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${load.id}`} color="link" size="sm">
                        {load.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.LoadType.${load.type}`} />
                    </td>
                    <td>{load.uniqueId}</td>
                    <td>
                      {load.seals
                        ? load.seals.map((val, j) => (
                            <span key={j}>
                              <Link to={`seal/${val.id}`}>{val.uniqueId}</Link>
                              {j === load.seals.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${load.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${load.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${load.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.load.home.notFound">No Loads found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ load }: IRootState) => ({
  loadList: load.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Load);
