import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './manouver.reducer';
import { IManouver } from 'app/shared/model/manouver.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IManouverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ManouverDetail extends React.Component<IManouverDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { manouverEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="grupoAmigoBackendApp.manouver.detail.title">Manouver</Translate> [<b>{manouverEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="grupoAmigoBackendApp.manouver.title">Title</Translate>
              </span>
            </dt>
            <dd>{manouverEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="grupoAmigoBackendApp.manouver.description">Description</Translate>
              </span>
            </dt>
            <dd>{manouverEntity.description}</dd>
            <dt>
              <span id="unit">
                <Translate contentKey="grupoAmigoBackendApp.manouver.unit">Unit</Translate>
              </span>
            </dt>
            <dd>{manouverEntity.unit}</dd>
            <dt>
              <span id="division">
                <Translate contentKey="grupoAmigoBackendApp.manouver.division">Division</Translate>
              </span>
            </dt>
            <dd>{manouverEntity.division}</dd>
          </dl>
          <Button tag={Link} to="/entity/manouver" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/manouver/${manouverEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ manouver }: IRootState) => ({
  manouverEntity: manouver.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManouverDetail);
