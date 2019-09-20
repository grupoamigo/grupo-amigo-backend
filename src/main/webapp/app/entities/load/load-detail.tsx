import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './load.reducer';
import { ILoad } from 'app/shared/model/load.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoadDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LoadDetail extends React.Component<ILoadDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { loadEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="grupoAmigoBackendApp.load.detail.title">Load</Translate> [<b>{loadEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">
                <Translate contentKey="grupoAmigoBackendApp.load.type">Type</Translate>
              </span>
            </dt>
            <dd>{loadEntity.type}</dd>
            <dt>
              <span id="uniqueId">
                <Translate contentKey="grupoAmigoBackendApp.load.uniqueId">Unique Id</Translate>
              </span>
            </dt>
            <dd>{loadEntity.uniqueId}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.load.seal">Seal</Translate>
            </dt>
            <dd>
              {loadEntity.seals
                ? loadEntity.seals.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.uniqueId}</a>
                      {i === loadEntity.seals.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/load" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/load/${loadEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ load }: IRootState) => ({
  loadEntity: load.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadDetail);
