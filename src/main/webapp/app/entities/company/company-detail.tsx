import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CompanyDetail extends React.Component<ICompanyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { companyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="grupoAmigoBackendApp.company.detail.title">Company</Translate> [<b>{companyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="legalName">
                <Translate contentKey="grupoAmigoBackendApp.company.legalName">Legal Name</Translate>
              </span>
            </dt>
            <dd>{companyEntity.legalName}</dd>
            <dt>
              <span id="taxId">
                <Translate contentKey="grupoAmigoBackendApp.company.taxId">Tax Id</Translate>
              </span>
            </dt>
            <dd>{companyEntity.taxId}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="grupoAmigoBackendApp.company.type">Type</Translate>
              </span>
            </dt>
            <dd>{companyEntity.type}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="grupoAmigoBackendApp.company.logo">Logo</Translate>
              </span>
            </dt>
            <dd>
              {companyEntity.logo ? (
                <div>
                  <a onClick={openFile(companyEntity.logoContentType, companyEntity.logo)}>
                    <img src={`data:${companyEntity.logoContentType};base64,${companyEntity.logo}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {companyEntity.logoContentType}, {byteSize(companyEntity.logo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.company.client">Client</Translate>
            </dt>
            <dd>{companyEntity.client ? companyEntity.client.legalName : ''}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.company.contactCards">Contact Cards</Translate>
            </dt>
            <dd>
              {companyEntity.contactCards
                ? companyEntity.contactCards.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.value}</a>
                      {i === companyEntity.contactCards.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.company.services">Services</Translate>
            </dt>
            <dd>
              {companyEntity.services
                ? companyEntity.services.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === companyEntity.services.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.company.locations">Locations</Translate>
            </dt>
            <dd>
              {companyEntity.locations
                ? companyEntity.locations.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.address}</a>
                      {i === companyEntity.locations.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.company.manouvers">Manouvers</Translate>
            </dt>
            <dd>
              {companyEntity.manouvers
                ? companyEntity.manouvers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === companyEntity.manouvers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.company.contract">Contract</Translate>
            </dt>
            <dd>
              {companyEntity.contracts
                ? companyEntity.contracts.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === companyEntity.contracts.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/company" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/company/${companyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDetail);
