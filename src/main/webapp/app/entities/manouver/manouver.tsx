import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './manouver.reducer';
import { IManouver } from 'app/shared/model/manouver.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IManouverProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Manouver extends React.Component<IManouverProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { manouverList, match } = this.props;
    return (
      <div>
        <h2 id="manouver-heading">
          <Translate contentKey="grupoAmigoBackendApp.manouver.home.title">Manouvers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.manouver.home.createLabel">Create a new Manouver</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {manouverList && manouverList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.manouver.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.manouver.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.manouver.unit">Unit</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.manouver.division">Division</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {manouverList.map((manouver, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${manouver.id}`} color="link" size="sm">
                        {manouver.id}
                      </Button>
                    </td>
                    <td>{manouver.title}</td>
                    <td>{manouver.description}</td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.ServiceUnitType.${manouver.unit}`} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.DivisionType.${manouver.division}`} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${manouver.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${manouver.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${manouver.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.manouver.home.notFound">No Manouvers found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ manouver }: IRootState) => ({
  manouverList: manouver.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manouver);
