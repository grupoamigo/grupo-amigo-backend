import { element, by, ElementFinder } from 'protractor';

export default class ManouverRequestUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.manouverRequest.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#manouver-request-title'));
  descriptionInput: ElementFinder = element(by.css('input#manouver-request-description'));
  dateInput: ElementFinder = element(by.css('input#manouver-request-date'));
  transportSelect: ElementFinder = element(by.css('select#manouver-request-transport'));
  priceInput: ElementFinder = element(by.css('input#manouver-request-price'));
  currencySelect: ElementFinder = element(by.css('select#manouver-request-currency'));
  qrCodeInput: ElementFinder = element(by.css('input#file_qrCode'));
  originSelect: ElementFinder = element(by.css('select#manouver-request-origin'));
  destinySelect: ElementFinder = element(by.css('select#manouver-request-destiny'));
  manouverClientSelect: ElementFinder = element(by.css('select#manouver-request-manouverClient'));
  loadSelect: ElementFinder = element(by.css('select#manouver-request-load'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setTransportSelect(transport) {
    await this.transportSelect.sendKeys(transport);
  }

  async getTransportSelect() {
    return this.transportSelect.element(by.css('option:checked')).getText();
  }

  async transportSelectLastOption() {
    await this.transportSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async setCurrencySelect(currency) {
    await this.currencySelect.sendKeys(currency);
  }

  async getCurrencySelect() {
    return this.currencySelect.element(by.css('option:checked')).getText();
  }

  async currencySelectLastOption() {
    await this.currencySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setQrCodeInput(qrCode) {
    await this.qrCodeInput.sendKeys(qrCode);
  }

  async getQrCodeInput() {
    return this.qrCodeInput.getAttribute('value');
  }

  async originSelectLastOption() {
    await this.originSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async originSelectOption(option) {
    await this.originSelect.sendKeys(option);
  }

  getOriginSelect() {
    return this.originSelect;
  }

  async getOriginSelectedOption() {
    return this.originSelect.element(by.css('option:checked')).getText();
  }

  async destinySelectLastOption() {
    await this.destinySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async destinySelectOption(option) {
    await this.destinySelect.sendKeys(option);
  }

  getDestinySelect() {
    return this.destinySelect;
  }

  async getDestinySelectedOption() {
    return this.destinySelect.element(by.css('option:checked')).getText();
  }

  async manouverClientSelectLastOption() {
    await this.manouverClientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async manouverClientSelectOption(option) {
    await this.manouverClientSelect.sendKeys(option);
  }

  getManouverClientSelect() {
    return this.manouverClientSelect;
  }

  async getManouverClientSelectedOption() {
    return this.manouverClientSelect.element(by.css('option:checked')).getText();
  }

  async loadSelectLastOption() {
    await this.loadSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async loadSelectOption(option) {
    await this.loadSelect.sendKeys(option);
  }

  getLoadSelect() {
    return this.loadSelect;
  }

  async getLoadSelectedOption() {
    return this.loadSelect.element(by.css('option:checked')).getText();
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
