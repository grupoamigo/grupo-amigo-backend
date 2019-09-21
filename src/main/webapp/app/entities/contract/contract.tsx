import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contract.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Contract extends React.Component<IContractProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { contractList, match } = this.props;
    return (
      <div>
        <h2 id="contract-heading">
          <Translate contentKey="grupoAmigoBackendApp.contract.home.title">Contracts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoAmigoBackendApp.contract.home.createLabel">Create a new Contract</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {contractList && contractList.length > 0 ? (
            <Table responsive aria-describedby="contract-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.legalProse">Legal Prose</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.signature">Signature</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.contractFile">Contract File</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.qrCode">Qr Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.digitalFingerprint">Digital Fingerprint</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.dateSigned">Date Signed</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.expirationDate">Expiration Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.serviceQuote">Service Quote</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoAmigoBackendApp.contract.serviceTitle">Service Title</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {contractList.map((contract, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${contract.id}`} color="link" size="sm">
                        {contract.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.ContractType.${contract.type}`} />
                    </td>
                    <td>{contract.title}</td>
                    <td>{contract.legalProse}</td>
                    <td>
                      {contract.signature ? (
                        <div>
                          <a onClick={openFile(contract.signatureContentType, contract.signature)}>
                            <img src={`data:${contract.signatureContentType};base64,${contract.signature}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {contract.signatureContentType}, {byteSize(contract.signature)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {contract.contractFile ? (
                        <div>
                          <a onClick={openFile(contract.contractFileContentType, contract.contractFile)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                          <span>
                            {contract.contractFileContentType}, {byteSize(contract.contractFile)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {contract.qrCode ? (
                        <div>
                          <a onClick={openFile(contract.qrCodeContentType, contract.qrCode)}>
                            <img src={`data:${contract.qrCodeContentType};base64,${contract.qrCode}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {contract.qrCodeContentType}, {byteSize(contract.qrCode)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{contract.digitalFingerprint}</td>
                    <td>
                      <TextFormat type="date" value={contract.dateSigned} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={contract.expirationDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoAmigoBackendApp.ContractStatusType.${contract.status}`} />
                    </td>
                    <td>
                      {contract.serviceQuote ? (
                        <Link to={`service-quote/${contract.serviceQuote.id}`}>{contract.serviceQuote.title}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {contract.serviceTitles
                        ? contract.serviceTitles.map((val, j) => (
                            <span key={j}>
                              <Link to={`service/${val.id}`}>{val.title}</Link>
                              {j === contract.serviceTitles.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${contract.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${contract.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${contract.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoAmigoBackendApp.contract.home.notFound">No Contracts found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contract }: IRootState) => ({
  contractList: contract.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contract);
