import { element, by, ElementFinder } from 'protractor';

export default class ClientUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.client.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  legalNameInput: ElementFinder = element(by.css('input#client-legalName'));
  memberSinceInput: ElementFinder = element(by.css('input#client-memberSince'));
  statusSelect: ElementFinder = element(by.css('select#client-status'));
  internalNotesInput: ElementFinder = element(by.css('input#client-internalNotes'));
  contactCardsSelect: ElementFinder = element(by.css('select#client-contactCards'));
  locationsSelect: ElementFinder = element(by.css('select#client-locations'));
  contractsSelect: ElementFinder = element(by.css('select#client-contracts'));
  serviceQuotesSelect: ElementFinder = element(by.css('select#client-serviceQuotes'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLegalNameInput(legalName) {
    await this.legalNameInput.sendKeys(legalName);
  }

  async getLegalNameInput() {
    return this.legalNameInput.getAttribute('value');
  }

  async setMemberSinceInput(memberSince) {
    await this.memberSinceInput.sendKeys(memberSince);
  }

  async getMemberSinceInput() {
    return this.memberSinceInput.getAttribute('value');
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
  async setInternalNotesInput(internalNotes) {
    await this.internalNotesInput.sendKeys(internalNotes);
  }

  async getInternalNotesInput() {
    return this.internalNotesInput.getAttribute('value');
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

  async contractsSelectLastOption() {
    await this.contractsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async contractsSelectOption(option) {
    await this.contractsSelect.sendKeys(option);
  }

  getContractsSelect() {
    return this.contractsSelect;
  }

  async getContractsSelectedOption() {
    return this.contractsSelect.element(by.css('option:checked')).getText();
  }

  async serviceQuotesSelectLastOption() {
    await this.serviceQuotesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async serviceQuotesSelectOption(option) {
    await this.serviceQuotesSelect.sendKeys(option);
  }

  getServiceQuotesSelect() {
    return this.serviceQuotesSelect;
  }

  async getServiceQuotesSelectedOption() {
    return this.serviceQuotesSelect.element(by.css('option:checked')).getText();
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
