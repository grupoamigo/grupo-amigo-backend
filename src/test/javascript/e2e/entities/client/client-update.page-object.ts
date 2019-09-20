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
  manouverRequestSelect: ElementFinder = element(by.css('select#client-manouverRequest'));
  contractSelect: ElementFinder = element(by.css('select#client-contract'));
  serviceQuoteSelect: ElementFinder = element(by.css('select#client-serviceQuote'));

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

  async manouverRequestSelectLastOption() {
    await this.manouverRequestSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async manouverRequestSelectOption(option) {
    await this.manouverRequestSelect.sendKeys(option);
  }

  getManouverRequestSelect() {
    return this.manouverRequestSelect;
  }

  async getManouverRequestSelectedOption() {
    return this.manouverRequestSelect.element(by.css('option:checked')).getText();
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
