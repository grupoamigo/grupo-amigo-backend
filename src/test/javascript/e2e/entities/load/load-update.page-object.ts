import { element, by, ElementFinder } from 'protractor';

export default class LoadUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.load.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeSelect: ElementFinder = element(by.css('select#load-type'));
  uniqueIdInput: ElementFinder = element(by.css('input#load-uniqueId'));
  sealSelect: ElementFinder = element(by.css('select#load-seal'));

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
  async setUniqueIdInput(uniqueId) {
    await this.uniqueIdInput.sendKeys(uniqueId);
  }

  async getUniqueIdInput() {
    return this.uniqueIdInput.getAttribute('value');
  }

  async sealSelectLastOption() {
    await this.sealSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sealSelectOption(option) {
    await this.sealSelect.sendKeys(option);
  }

  getSealSelect() {
    return this.sealSelect;
  }

  async getSealSelectedOption() {
    return this.sealSelect.element(by.css('option:checked')).getText();
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
