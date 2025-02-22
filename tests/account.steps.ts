import { createBdd } from 'playwright-bdd';
import { MainNav } from '../src/nav/main-nav';
import { MainPage } from '../src/pages/main/main-page';
import { RegisterView } from '../src/pages/views/register-view';
import { test } from './account.fixture';

const { Given, When, Then } = createBdd(test);


Given('the user is on the registration page', async ({ ctx }) =>
{
    const mainNav = ctx.getNav(MainNav);
    await mainNav.navToHome();


});

When('the user complete the registration form', async ({ ctx }) =>
{
    const mainPage = ctx.getPage(MainPage);
    const registerView = ctx.getPage(RegisterView);

    await mainPage.clickRigister();
    await registerView.waitForLoad();
    await registerView.checkElement();    

});

Then('the user should be registered', async ({ ctx }) =>
{

});