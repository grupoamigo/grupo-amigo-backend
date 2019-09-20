import { element, by, ElementFinder } from 'protractor';

export default class MembershipUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.membership.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#membership-title'));
  priceInput: ElementFinder = element(by.css('input#membership-price'));
  currencySelect: ElementFinder = element(by.css('select#membership-currency'));
  createdInput: ElementFinder = element(by.css('input#membership-created'));
  expiresInput: ElementFinder = element(by.css('input#membership-expires'));
  typeSelect: ElementFinder = element(by.css('select#membership-type'));
  companySelect: ElementFinder = element(by.css('select#membership-company'));
  userSelect: ElementFinder = element(by.css('select#membership-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
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
  async setCreatedInput(created) {
    await this.createdInput.sendKeys(created);
  }

  async getCreatedInput() {
    return this.createdInput.getAttribute('value');
  }

  async setExpiresInput(expires) {
    await this.expiresInput.sendKeys(expires);
  }

  async getExpiresInput() {
    return this.expiresInput.getAttribute('value');
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
  async companySelectLastOption() {
    await this.companySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async companySelectOption(option) {
    await this.companySelect.sendKeys(option);
  }

  getCompanySelect() {
    return this.companySelect;
  }

  async getCompanySelectedOption() {
    return this.companySelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
