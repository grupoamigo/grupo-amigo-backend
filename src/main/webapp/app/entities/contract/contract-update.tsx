import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { getEntities as getServiceQuotes } from 'app/entities/service-quote/service-quote.reducer';
import { IService } from 'app/shared/model/service.model';
import { getEntities as getServices } from 'app/entities/service/service.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './contract.reducer';
import { IContract } from 'app/shared/model/contract.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContractUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IContractUpdateState {
  isNew: boolean;
  idsservice: any[];
  serviceQuoteId: string;
  supplierId: string;
  clientId: string;
}

export class ContractUpdate extends React.Component<IContractUpdateProps, IContractUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsservice: [],
      serviceQuoteId: '0',
      supplierId: '0',
      clientId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getServiceQuotes();
    this.props.getServices();
    this.props.getCompanies();
    this.props.getClients();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.dateSigned = convertDateTimeToServer(values.dateSigned);

    if (errors.length === 0) {
      const { contractEntity } = this.props;
      const entity = {
        ...contractEntity,
        ...values,
        services: mapIdList(values.services)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/contract');
  };

  render() {
    const { contractEntity, serviceQuotes, services, companies, clients, loading, updating } = this.props;
    const { isNew } = this.state;

    const { signature, signatureContentType, contractFile, contractFileContentType } = contractEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.contract.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.contract.home.createOrEditLabel">Create or edit a Contract</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : contractEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="contract-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="contract-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="contract-type">
                    <Translate contentKey="grupoAmigoBackendApp.contract.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="contract-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && contractEntity.type) || 'PRESTACION_DE_SERVICIO'}
                  >
                    <option value="PRESTACION_DE_SERVICIO">{translate('grupoAmigoBackendApp.ContractType.PRESTACION_DE_SERVICIO')}</option>
                    <option value="TERMINOS_Y_CONDICIONES">{translate('grupoAmigoBackendApp.ContractType.TERMINOS_Y_CONDICIONES')}</option>
                    <option value="DECISION_INTERNA">{translate('grupoAmigoBackendApp.ContractType.DECISION_INTERNA')}</option>
                    <option value="SOLICITUD_DE_SERVICIO">{translate('grupoAmigoBackendApp.ContractType.SOLICITUD_DE_SERVICIO')}</option>
                    <option value="SOLICITU_DE_MANIOBRA">{translate('grupoAmigoBackendApp.ContractType.SOLICITU_DE_MANIOBRA')}</option>
                    <option value="INSPECCION">{translate('grupoAmigoBackendApp.ContractType.INSPECCION')}</option>
                    <option value="EMPLEADO">{translate('grupoAmigoBackendApp.ContractType.EMPLEADO')}</option>
                    <option value="CONFIDENCIALIDAD">{translate('grupoAmigoBackendApp.ContractType.CONFIDENCIALIDAD')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="contract-title">
                    <Translate contentKey="grupoAmigoBackendApp.contract.title">Title</Translate>
                  </Label>
                  <AvField
                    id="contract-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="legalProseLabel" for="contract-legalProse">
                    <Translate contentKey="grupoAmigoBackendApp.contract.legalProse">Legal Prose</Translate>
                  </Label>
                  <AvField
                    id="contract-legalProse"
                    type="text"
                    name="legalProse"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="signatureLabel" for="signature">
                      <Translate contentKey="grupoAmigoBackendApp.contract.signature">Signature</Translate>
                    </Label>
                    <br />
                    {signature ? (
                      <div>
                        <a onClick={openFile(signatureContentType, signature)}>
                          <img src={`data:${signatureContentType};base64,${signature}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {signatureContentType}, {byteSize(signature)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('signature')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_signature" type="file" onChange={this.onBlobChange(true, 'signature')} accept="image/*" />
                    <AvInput type="hidden" name="signature" value={signature} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="contractFileLabel" for="contractFile">
                      <Translate contentKey="grupoAmigoBackendApp.contract.contractFile">Contract File</Translate>
                    </Label>
                    <br />
                    {contractFile ? (
                      <div>
                        <a onClick={openFile(contractFileContentType, contractFile)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {contractFileContentType}, {byteSize(contractFile)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('contractFile')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_contractFile" type="file" onChange={this.onBlobChange(false, 'contractFile')} />
                    <AvInput type="hidden" name="contractFile" value={contractFile} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="digitalFingerprintLabel" for="contract-digitalFingerprint">
                    <Translate contentKey="grupoAmigoBackendApp.contract.digitalFingerprint">Digital Fingerprint</Translate>
                  </Label>
                  <AvField id="contract-digitalFingerprint" type="text" name="digitalFingerprint" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateSignedLabel" for="contract-dateSigned">
                    <Translate contentKey="grupoAmigoBackendApp.contract.dateSigned">Date Signed</Translate>
                  </Label>
                  <AvInput
                    id="contract-dateSigned"
                    type="datetime-local"
                    className="form-control"
                    name="dateSigned"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.contractEntity.dateSigned)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="expirationDateLabel" for="contract-expirationDate">
                    <Translate contentKey="grupoAmigoBackendApp.contract.expirationDate">Expiration Date</Translate>
                  </Label>
                  <AvField id="contract-expirationDate" type="date" className="form-control" name="expirationDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="contract-status">
                    <Translate contentKey="grupoAmigoBackendApp.contract.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="contract-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && contractEntity.status) || 'EMITIDO'}
                  >
                    <option value="EMITIDO">{translate('grupoAmigoBackendApp.ContractStatusType.EMITIDO')}</option>
                    <option value="FIRMADO">{translate('grupoAmigoBackendApp.ContractStatusType.FIRMADO')}</option>
                    <option value="ACTIVO">{translate('grupoAmigoBackendApp.ContractStatusType.ACTIVO')}</option>
                    <option value="CANCELADO">{translate('grupoAmigoBackendApp.ContractStatusType.CANCELADO')}</option>
                    <option value="PAUSADO">{translate('grupoAmigoBackendApp.ContractStatusType.PAUSADO')}</option>
                    <option value="TERMINADO">{translate('grupoAmigoBackendApp.ContractStatusType.TERMINADO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="contract-serviceQuote">
                    <Translate contentKey="grupoAmigoBackendApp.contract.serviceQuote">Service Quote</Translate>
                  </Label>
                  <AvInput id="contract-serviceQuote" type="select" className="form-control" name="serviceQuote.id">
                    <option value="" key="0" />
                    {serviceQuotes
                      ? serviceQuotes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="contract-service">
                    <Translate contentKey="grupoAmigoBackendApp.contract.service">Service</Translate>
                  </Label>
                  <AvInput
                    id="contract-service"
                    type="select"
                    multiple
                    className="form-control"
                    name="services"
                    value={contractEntity.services && contractEntity.services.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {services
                      ? services.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/contract" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  serviceQuotes: storeState.serviceQuote.entities,
  services: storeState.service.entities,
  companies: storeState.company.entities,
  clients: storeState.client.entities,
  contractEntity: storeState.contract.entity,
  loading: storeState.contract.loading,
  updating: storeState.contract.updating,
  updateSuccess: storeState.contract.updateSuccess
});

const mapDispatchToProps = {
  getServiceQuotes,
  getServices,
  getCompanies,
  getClients,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractUpdate);
