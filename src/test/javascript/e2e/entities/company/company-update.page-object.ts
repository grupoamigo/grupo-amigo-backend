import { element, by, ElementFinder } from 'protractor';

export default class CompanyUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.company.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  legalNameInput: ElementFinder = element(by.css('input#company-legalName'));
  taxIdInput: ElementFinder = element(by.css('input#company-taxId'));
  typeSelect: ElementFinder = element(by.css('select#company-type'));
  logoInput: ElementFinder = element(by.css('input#file_logo'));
  clientSelect: ElementFinder = element(by.css('select#company-client'));
  contactCardsSelect: ElementFinder = element(by.css('select#company-contactCards'));
  servicesSelect: ElementFinder = element(by.css('select#company-services'));
  locationsSelect: ElementFinder = element(by.css('select#company-locations'));
  manouversSelect: ElementFinder = element(by.css('select#company-manouvers'));
  contractSelect: ElementFinder = element(by.css('select#company-contract'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLegalNameInput(legalName) {
    await this.legalNameInput.sendKeys(legalName);
  }

  async getLegalNameInput() {
    return this.legalNameInput.getAttribute('value');
  }

  async setTaxIdInput(taxId) {
    await this.taxIdInput.sendKeys(taxId);
  }

  async getTaxIdInput() {
    return this.taxIdInput.getAttribute('value');
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
  async setLogoInput(logo) {
    await this.logoInput.sendKeys(logo);
  }

  async getLogoInput() {
    return this.logoInput.getAttribute('value');
  }

  async clientSelectLastOption() {
    await this.clientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clientSelectOption(option) {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect() {
    return this.clientSelect;
  }

  async getClientSelectedOption() {
    return this.clientSelect.element(by.css('option:checked')).getText();
  }

  async contactCardsSelectLastOption() {
    await this.contactCardsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async contactCardsSelectOption(option) {
    await this.contactCardsSelect.sendKeys(option);
  }

  getContactCardsSelect() {
    return this.contactCardsSelect;
  }

  async getContactCardsSelectedOption() {
    return this.contactCardsSelect.element(by.css('option:checked')).getText();
  }

  async servicesSelectLastOption() {
    await this.servicesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async servicesSelectOption(option) {
    await this.servicesSelect.sendKeys(option);
  }

  getServicesSelect() {
    return this.servicesSelect;
  }

  async getServicesSelectedOption() {
    return this.servicesSelect.element(by.css('option:checked')).getText();
  }

  async locationsSelectLastOption() {
    await this.locationsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async locationsSelectOption(option) {
    await this.locationsSelect.sendKeys(option);
  }

  getLocationsSelect() {
    return this.locationsSelect;
  }

  async getLocationsSelectedOption() {
    return this.locationsSelect.element(by.css('option:checked')).getText();
  }

  async manouversSelectLastOption() {
    await this.manouversSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async manouversSelectOption(option) {
    await this.manouversSelect.sendKeys(option);
  }

  getManouversSelect() {
    return this.manouversSelect;
  }

  async getManouversSelectedOption() {
    return this.manouversSelect.element(by.css('option:checked')).getText();
  }

  async contractSelectLastOption() {
    await this.contractSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async contractSelectOption(option) {
    await this.contractSelect.sendKeys(option);
  }

  getContractSelect() {
    return this.contractSelect;
  }

  async getContractSelectedOption() {
    return this.contractSelect.element(by.css('option:checked')).getText();
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
