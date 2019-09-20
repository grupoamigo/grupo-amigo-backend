import { element, by, ElementFinder } from 'protractor';

export default class ManouverUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.manouver.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#manouver-title'));
  descriptionInput: ElementFinder = element(by.css('input#manouver-description'));
  unitSelect: ElementFinder = element(by.css('select#manouver-unit'));
  divisionSelect: ElementFinder = element(by.css('select#manouver-division'));

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

  async setUnitSelect(unit) {
    await this.unitSelect.sendKeys(unit);
  }

  async getUnitSelect() {
    return this.unitSelect.element(by.css('option:checked')).getText();
  }

  async unitSelectLastOption() {
    await this.unitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setDivisionSelect(division) {
    await this.divisionSelect.sendKeys(division);
  }

  async getDivisionSelect() {
    return this.divisionSelect.element(by.css('option:checked')).getText();
  }

  async divisionSelectLastOption() {
    await this.divisionSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
