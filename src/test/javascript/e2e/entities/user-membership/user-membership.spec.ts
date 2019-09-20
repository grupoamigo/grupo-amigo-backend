/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserMembershipComponentsPage from './user-membership.page-object';
import { UserMembershipDeleteDialog } from './user-membership.page-object';
import UserMembershipUpdatePage from './user-membership-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('UserMembership e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userMembershipUpdatePage: UserMembershipUpdatePage;
  let userMembershipComponentsPage: UserMembershipComponentsPage;
  let userMembershipDeleteDialog: UserMembershipDeleteDialog;

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

  it('should load UserMemberships', async () => {
    await navBarPage.getEntityPage('user-membership');
    userMembershipComponentsPage = new UserMembershipComponentsPage();
    expect(await userMembershipComponentsPage.getTitle().getText()).to.match(/User Memberships/);
  });

  it('should load create UserMembership page', async () => {
    await userMembershipComponentsPage.clickOnCreateButton();
    userMembershipUpdatePage = new UserMembershipUpdatePage();
    expect(await userMembershipUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /grupoAmigoBackendApp.userMembership.home.createOrEditLabel/
    );
    await userMembershipUpdatePage.cancel();
  });

  it('should create and save UserMemberships', async () => {
    async function createUserMembership() {
      await userMembershipComponentsPage.clickOnCreateButton();
      await userMembershipUpdatePage.setPhoneInput('phone');
      expect(await userMembershipUpdatePage.getPhoneInput()).to.match(/phone/);
      await waitUntilDisplayed(userMembershipUpdatePage.getSaveButton());
      await userMembershipUpdatePage.save();
      await waitUntilHidden(userMembershipUpdatePage.getSaveButton());
      expect(await userMembershipUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createUserMembership();
    await userMembershipComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await userMembershipComponentsPage.countDeleteButtons();
    await createUserMembership();

    await userMembershipComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await userMembershipComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last UserMembership', async () => {
    await userMembershipComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await userMembershipComponentsPage.countDeleteButtons();
    await userMembershipComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    userMembershipDeleteDialog = new UserMembershipDeleteDialog();
    expect(await userMembershipDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /grupoAmigoBackendApp.userMembership.delete.question/
    );
    await userMembershipDeleteDialog.clickOnConfirmButton();

    await userMembershipComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await userMembershipComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
