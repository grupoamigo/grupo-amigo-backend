import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contract.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ContractDetail extends React.Component<IContractDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { contractEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="grupoAmigoBackendApp.contract.detail.title">Contract</Translate> [<b>{contractEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">
                <Translate contentKey="grupoAmigoBackendApp.contract.type">Type</Translate>
              </span>
            </dt>
            <dd>{contractEntity.type}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="grupoAmigoBackendApp.contract.title">Title</Translate>
              </span>
            </dt>
            <dd>{contractEntity.title}</dd>
            <dt>
              <span id="legalProse">
                <Translate contentKey="grupoAmigoBackendApp.contract.legalProse">Legal Prose</Translate>
              </span>
            </dt>
            <dd>{contractEntity.legalProse}</dd>
            <dt>
              <span id="signature">
                <Translate contentKey="grupoAmigoBackendApp.contract.signature">Signature</Translate>
              </span>
            </dt>
            <dd>
              {contractEntity.signature ? (
                <div>
                  <a onClick={openFile(contractEntity.signatureContentType, contractEntity.signature)}>
                    <img
                      src={`data:${contractEntity.signatureContentType};base64,${contractEntity.signature}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {contractEntity.signatureContentType}, {byteSize(contractEntity.signature)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="contractFile">
                <Translate contentKey="grupoAmigoBackendApp.contract.contractFile">Contract File</Translate>
              </span>
            </dt>
            <dd>
              {contractEntity.contractFile ? (
                <div>
                  <a onClick={openFile(contractEntity.contractFileContentType, contractEntity.contractFile)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {contractEntity.contractFileContentType}, {byteSize(contractEntity.contractFile)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="qrCode">
                <Translate contentKey="grupoAmigoBackendApp.contract.qrCode">Qr Code</Translate>
              </span>
            </dt>
            <dd>
              {contractEntity.qrCode ? (
                <div>
                  <a onClick={openFile(contractEntity.qrCodeContentType, contractEntity.qrCode)}>
                    <img src={`data:${contractEntity.qrCodeContentType};base64,${contractEntity.qrCode}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {contractEntity.qrCodeContentType}, {byteSize(contractEntity.qrCode)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="digitalFingerprint">
                <Translate contentKey="grupoAmigoBackendApp.contract.digitalFingerprint">Digital Fingerprint</Translate>
              </span>
            </dt>
            <dd>{contractEntity.digitalFingerprint}</dd>
            <dt>
              <span id="dateSigned">
                <Translate contentKey="grupoAmigoBackendApp.contract.dateSigned">Date Signed</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={contractEntity.dateSigned} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="expirationDate">
                <Translate contentKey="grupoAmigoBackendApp.contract.expirationDate">Expiration Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={contractEntity.expirationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="grupoAmigoBackendApp.contract.status">Status</Translate>
              </span>
            </dt>
            <dd>{contractEntity.status}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.contract.serviceQuote">Service Quote</Translate>
            </dt>
            <dd>{contractEntity.serviceQuote ? contractEntity.serviceQuote.title : ''}</dd>
            <dt>
              <Translate contentKey="grupoAmigoBackendApp.contract.serviceTitle">Service Title</Translate>
            </dt>
            <dd>
              {contractEntity.serviceTitles
                ? contractEntity.serviceTitles.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === contractEntity.serviceTitles.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/contract" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/contract/${contractEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ contract }: IRootState) => ({
  contractEntity: contract.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDetail);
