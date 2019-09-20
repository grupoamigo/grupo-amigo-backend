import { element, by, ElementFinder } from 'protractor';

export default class LocationUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoAmigoBackendApp.location.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressInput: ElementFinder = element(by.css('input#location-address'));
  latInput: ElementFinder = element(by.css('input#location-lat'));
  lngInput: ElementFinder = element(by.css('input#location-lng'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setLatInput(lat) {
    await this.latInput.sendKeys(lat);
  }

  async getLatInput() {
    return this.latInput.getAttribute('value');
  }

  async setLngInput(lng) {
    await this.lngInput.sendKeys(lng);
  }

  async getLngInput() {
    return this.lngInput.getAttribute('value');
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
