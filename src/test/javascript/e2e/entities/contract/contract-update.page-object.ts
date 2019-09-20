import { element, by, ElementFinder } from 'protractor';

export default class ContractUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.contract.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeSelect: ElementFinder = element(by.css('select#contract-type'));
  titleInput: ElementFinder = element(by.css('input#contract-title'));
  legalProseInput: ElementFinder = element(by.css('input#contract-legalProse'));
  signatureInput: ElementFinder = element(by.css('input#file_signature'));
  contractFileInput: ElementFinder = element(by.css('input#file_contractFile'));
  digitalFingerprintInput: ElementFinder = element(by.css('input#contract-digitalFingerprint'));
  dateSignedInput: ElementFinder = element(by.css('input#contract-dateSigned'));
  expirationDateInput: ElementFinder = element(by.css('input#contract-expirationDate'));
  statusSelect: ElementFinder = element(by.css('select#contract-status'));
  serviceQuoteSelect: ElementFinder = element(by.css('select#contract-serviceQuote'));
  serviceSelect: ElementFinder = element(by.css('select#contract-service'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setLegalProseInput(legalProse) {
    await this.legalProseInput.sendKeys(legalProse);
  }

  async getLegalProseInput() {
    return this.legalProseInput.getAttribute('value');
  }

  async setSignatureInput(signature) {
    await this.signatureInput.sendKeys(signature);
  }

  async getSignatureInput() {
    return this.signatureInput.getAttribute('value');
  }

  async setContractFileInput(contractFile) {
    await this.contractFileInput.sendKeys(contractFile);
  }

  async getContractFileInput() {
    return this.contractFileInput.getAttribute('value');
  }

  async setDigitalFingerprintInput(digitalFingerprint) {
    await this.digitalFingerprintInput.sendKeys(digitalFingerprint);
  }

  async getDigitalFingerprintInput() {
    return this.digitalFingerprintInput.getAttribute('value');
  }

  async setDateSignedInput(dateSigned) {
    await this.dateSignedInput.sendKeys(dateSigned);
  }

  async getDateSignedInput() {
    return this.dateSignedInput.getAttribute('value');
  }

  async setExpirationDateInput(expirationDate) {
    await this.expirationDateInput.sendKeys(expirationDate);
  }

  async getExpirationDateInput() {
    return this.expirationDateInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async serviceQuoteSelectLastOption() {
    await this.serviceQuoteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async serviceQuoteSelectOption(option) {
    await this.serviceQuoteSelect.sendKeys(option);
  }

  getServiceQuoteSelect() {
    return this.serviceQuoteSelect;
  }

  async getServiceQuoteSelectedOption() {
    return this.serviceQuoteSelect.element(by.css('option:checked')).getText();
  }

  async serviceSelectLastOption() {
    await this.serviceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async serviceSelectOption(option) {
    await this.serviceSelect.sendKeys(option);
  }

  getServiceSelect() {
    return this.serviceSelect;
  }

  async getServiceSelectedOption() {
    return this.serviceSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
