import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IManouver } from 'app/shared/model/manouver.model';
import { getEntities as getManouvers } from 'app/entities/manouver/manouver.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { getEntities as getServiceRequests } from 'app/entities/service-request/service-request.reducer';
import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './service-quote.reducer';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServiceQuoteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IServiceQuoteUpdateState {
  isNew: boolean;
  idsmanouver: any[];
  contractId: string;
  serviceRequestId: string;
  clientId: string;
}

export class ServiceQuoteUpdate extends React.Component<IServiceQuoteUpdateProps, IServiceQuoteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsmanouver: [],
      contractId: '0',
      serviceRequestId: '0',
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

    this.props.getManouvers();
    this.props.getContracts();
    this.props.getServiceRequests();
    this.props.getClients();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.expeditionDate = convertDateTimeToServer(values.expeditionDate);

    if (errors.length === 0) {
      const { serviceQuoteEntity } = this.props;
      const entity = {
        ...serviceQuoteEntity,
        ...values,
        manouvers: mapIdList(values.manouvers)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/service-quote');
  };

  render() {
    const { serviceQuoteEntity, manouvers, contracts, serviceRequests, clients, loading, updating } = this.props;
    const { isNew } = this.state;

    const { qrCode, qrCodeContentType } = serviceQuoteEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoAmigoBackendApp.serviceQuote.home.createOrEditLabel">
              <Translate contentKey="grupoAmigoBackendApp.serviceQuote.home.createOrEditLabel">Create or edit a ServiceQuote</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : serviceQuoteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="service-quote-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="service-quote-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="service-quote-title">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.title">Title</Translate>
                  </Label>
                  <AvField
                    id="service-quote-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="service-quote-description">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.description">Description</Translate>
                  </Label>
                  <AvField
                    id="service-quote-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="quantityLabel" for="service-quote-quantity">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.quantity">Quantity</Translate>
                  </Label>
                  <AvField id="service-quote-quantity" type="string" className="form-control" name="quantity" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="service-quote-price">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.price">Price</Translate>
                  </Label>
                  <AvField id="service-quote-price" type="string" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label id="unitLabel" for="service-quote-unit">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.unit">Unit</Translate>
                  </Label>
                  <AvInput
                    id="service-quote-unit"
                    type="select"
                    className="form-control"
                    name="unit"
                    value={(!isNew && serviceQuoteEntity.unit) || 'TM'}
                  >
                    <option value="TM">{translate('grupoAmigoBackendApp.ServiceUnitType.TM')}</option>
                    <option value="KG">{translate('grupoAmigoBackendApp.ServiceUnitType.KG')}</option>
                    <option value="CONTENEDOR_20TM">{translate('grupoAmigoBackendApp.ServiceUnitType.CONTENEDOR_20TM')}</option>
                    <option value="CONTENEDOR_40TM">{translate('grupoAmigoBackendApp.ServiceUnitType.CONTENEDOR_40TM')}</option>
                    <option value="M2">{translate('grupoAmigoBackendApp.ServiceUnitType.M2')}</option>
                    <option value="TARIMA">{translate('grupoAmigoBackendApp.ServiceUnitType.TARIMA')}</option>
                    <option value="KM">{translate('grupoAmigoBackendApp.ServiceUnitType.KM')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="expeditionDateLabel" for="service-quote-expeditionDate">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.expeditionDate">Expedition Date</Translate>
                  </Label>
                  <AvInput
                    id="service-quote-expeditionDate"
                    type="datetime-local"
                    className="form-control"
                    name="expeditionDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.serviceQuoteEntity.expeditionDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="expirationDateLabel" for="service-quote-expirationDate">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.expirationDate">Expiration Date</Translate>
                  </Label>
                  <AvField id="service-quote-expirationDate" type="date" className="form-control" name="expirationDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="service-quote-status">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="service-quote-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && serviceQuoteEntity.status) || 'PROCESANDO'}
                  >
                    <option value="PROCESANDO">{translate('grupoAmigoBackendApp.StatusType.PROCESANDO')}</option>
                    <option value="CONFIRMADO">{translate('grupoAmigoBackendApp.StatusType.CONFIRMADO')}</option>
                    <option value="ACTIVO">{translate('grupoAmigoBackendApp.StatusType.ACTIVO')}</option>
                    <option value="EN_ESPERA">{translate('grupoAmigoBackendApp.StatusType.EN_ESPERA')}</option>
                    <option value="TERMINADO">{translate('grupoAmigoBackendApp.StatusType.TERMINADO')}</option>
                    <option value="CANCELADO">{translate('grupoAmigoBackendApp.StatusType.CANCELADO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="currencyLabel" for="service-quote-currency">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.currency">Currency</Translate>
                  </Label>
                  <AvInput
                    id="service-quote-currency"
                    type="select"
                    className="form-control"
                    name="currency"
                    value={(!isNew && serviceQuoteEntity.currency) || 'MXN'}
                  >
                    <option value="MXN">{translate('grupoAmigoBackendApp.CurrencyType.MXN')}</option>
                    <option value="USD">{translate('grupoAmigoBackendApp.CurrencyType.USD')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="approvedByLabel" for="service-quote-approvedBy">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.approvedBy">Approved By</Translate>
                  </Label>
                  <AvField id="service-quote-approvedBy" type="text" name="approvedBy" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="qrCodeLabel" for="qrCode">
                      <Translate contentKey="grupoAmigoBackendApp.serviceQuote.qrCode">Qr Code</Translate>
                    </Label>
                    <br />
                    {qrCode ? (
                      <div>
                        <a onClick={openFile(qrCodeContentType, qrCode)}>
                          <img src={`data:${qrCodeContentType};base64,${qrCode}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {qrCodeContentType}, {byteSize(qrCode)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('qrCode')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_qrCode" type="file" onChange={this.onBlobChange(true, 'qrCode')} accept="image/*" />
                    <AvInput type="hidden" name="qrCode" value={qrCode} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="service-quote-manouver">
                    <Translate contentKey="grupoAmigoBackendApp.serviceQuote.manouver">Manouver</Translate>
                  </Label>
                  <AvInput
                    id="service-quote-manouver"
                    type="select"
                    multiple
                    className="form-control"
                    name="manouvers"
                    value={serviceQuoteEntity.manouvers && serviceQuoteEntity.manouvers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {manouvers
                      ? manouvers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/service-quote" replace color="info">
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
  manouvers: storeState.manouver.entities,
  contracts: storeState.contract.entities,
  serviceRequests: storeState.serviceRequest.entities,
  clients: storeState.client.entities,
  serviceQuoteEntity: storeState.serviceQuote.entity,
  loading: storeState.serviceQuote.loading,
  updating: storeState.serviceQuote.updating,
  updateSuccess: storeState.serviceQuote.updateSuccess
});

const mapDispatchToProps = {
  getManouvers,
  getContracts,
  getServiceRequests,
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
)(ServiceQuoteUpdate);
