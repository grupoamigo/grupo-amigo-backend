/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LoadComponentsPage from './load.page-object';
import { LoadDeleteDialog } from './load.page-object';
import LoadUpdatePage from './load-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Load e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let loadUpdatePage: LoadUpdatePage;
  let loadComponentsPage: LoadComponentsPage;
  let loadDeleteDialog: LoadDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Loads', async () => {
    await navBarPage.getEntityPage('load');
    loadComponentsPage = new LoadComponentsPage();
    expect(await loadComponentsPage.getTitle().getText()).to.match(/Loads/);
  });

  it('should load create Load page', async () => {
    await loadComponentsPage.clickOnCreateButton();
    loadUpdatePage = new LoadUpdatePage();
    expect(await loadUpdatePage.getPageTitle().getAttribute('id')).to.match(/grupoAmigoBackendApp.load.home.createOrEditLabel/);
    await loadUpdatePage.cancel();
  });

  it('should create and save Loads', async () => {
    async function createLoad() {
      await loadComponentsPage.clickOnCreateButton();
      await loadUpdatePage.typeSelectLastOption();
      await loadUpdatePage.setUniqueIdInput('uniqueId');
      expect(await loadUpdatePage.getUniqueIdInput()).to.match(/uniqueId/);
      // loadUpdatePage.sealSelectLastOption();
      await waitUntilDisplayed(loadUpdatePage.getSaveButton());
      await loadUpdatePage.save();
      await waitUntilHidden(loadUpdatePage.getSaveButton());
      expect(await loadUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createLoad();
    await loadComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await loadComponentsPage.countDeleteButtons();
    await createLoad();

    await loadComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await loadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Load', async () => {
    await loadComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await loadComponentsPage.countDeleteButtons();
    await loadComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    loadDeleteDialog = new LoadDeleteDialog();
    expect(await loadDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/grupoAmigoBackendApp.load.delete.question/);
    await loadDeleteDialog.clickOnConfirmButton();

    await loadComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await loadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
