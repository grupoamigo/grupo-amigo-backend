import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './service-request.reducer';
import { IServiceRequest } from 'app/shared/model/service-request.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServiceRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ServiceRequestDetail extends React.Component<IServiceRequestDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { serviceRequestEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="grupoAmigoBackendApp.serviceRequest.detail.title">ServiceRequest</Translate> [
            <b>{serviceRequestEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="grupoAmigoBackendApp.serviceRequest.title">Title</Translate>
              </span>
            </dt>
            <dd>{serviceRequestEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="grupoAmigoBackendApp.serviceRequest.description">Description</Translate>
              </span>
            </dt>
            <dd>{serviceRequestEntity.description}</dd>
            <dt>
              <span id="dateRequested">
                <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateRequested">Date Requested</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={serviceRequestEntity.dateRequested} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dateBegin">
                <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateBegin">Date Begin</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={serviceRequestEntity.dateBegin} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dateEnd">
                <Translate contentKey="grupoAmigoBackendApp.serviceRequest.dateEnd">Date End</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={serviceRequestEntity.dateEnd} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="grupoAmigoBackendApp.serviceRequest.status">Status</Translate>
              </span>
            </dt>
            <dd>{serviceRequestEntity.status}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.serviceRequest.client">Client</Translate>
            </dt>
            <dd>{serviceRequestEntity.client ? serviceRequestEntity.client.legalName : ''}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.serviceRequest.serviceQuote">Service Quote</Translate>
            </dt>
            <dd>{serviceRequestEntity.serviceQuote ? serviceRequestEntity.serviceQuote.title : ''}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.serviceRequest.services">Services</Translate>
            </dt>
            <dd>
              {serviceRequestEntity.services
                ? serviceRequestEntity.services.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === serviceRequestEntity.services.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/service-request" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/service-request/${serviceRequestEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ serviceRequest }: IRootState) => ({
  serviceRequestEntity: serviceRequest.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceRequestDetail);
