import { element, by, ElementFinder } from 'protractor';

export default class UserMembershipUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.userMembership.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  phoneInput: ElementFinder = element(by.css('input#user-membership-phone'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
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
