import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contact-card.reducer';
import { IContactCard } from 'app/shared/model/contact-card.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactCardProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ContactCard extends React.Component<IContactCardProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { contactCardList, match } = this.props;
    return (
      <div>
        <h2 id="contact-card-heading">
          <Translate contentKey="grupoAmigoBackendApp.contactCard.home.title">Contact Cards</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.contactCard.home.createLabel">Create a new Contact Card</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {contactCardList && contactCardList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contactCard.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contactCard.value">Value</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {contactCardList.map((contactCard, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${contactCard.id}`} color="link" size="sm">
                        {contactCard.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.ContactType.${contactCard.type}`} />
                    </td>
                    <td>{contactCard.value}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${contactCard.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${contactCard.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${contactCard.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.contactCard.home.notFound">No Contact Cards found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contactCard }: IRootState) => ({
  contactCardList: contactCard.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactCard);
