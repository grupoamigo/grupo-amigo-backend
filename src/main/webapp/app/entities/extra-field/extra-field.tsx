import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './extra-field.reducer';
import { IExtraField } from 'app/shared/model/extra-field.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExtraFieldProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ExtraField extends React.Component<IExtraFieldProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { extraFieldList, match } = this.props;
    return (
      <div>
        <h2 id="extra-field-heading">
          <Translate contentKey="grupoAmigoBackendApp.extraField.home.title">Extra Fields</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.extraField.home.createLabel">Create a new Extra Field</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {extraFieldList && extraFieldList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.extraField.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.extraField.value">Value</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {extraFieldList.map((extraField, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${extraField.id}`} color="link" size="sm">
                        {extraField.id}
                      </Button>
                    </td>
                    <td>{extraField.name}</td>
                    <td>{extraField.value}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${extraField.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${extraField.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${extraField.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.extraField.home.notFound">No Extra Fields found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ extraField }: IRootState) => ({
  extraFieldList: extraField.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraField);
