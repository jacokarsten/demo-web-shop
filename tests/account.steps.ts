import { createBdd } from 'playwright-bdd';
import { enrichEmail } from '../src/utils/token';
import { ExpectedResult, Gender } from '../src/common/enums';
import { MainNav } from '../src/nav/main-nav';
import { MainPage } from '../src/pages/main/main-page';
import { RegisterResultView } from '../src/pages/views/register-result-view';
import { RegisterView } from '../src/pages/views/register-view';
import { test } from './account.fixture';

const { Given, When, Then } = createBdd(test);


Given('the user is on the registration page', async ({ ctx }) =>
{
    const mainNav = ctx.getNav(MainNav);
    await mainNav.navToHome();
});

When('the user completes the registration form with {string}, {string}, {string}, {string}, {string}, {string}, {string}, and {string}', async ({ ctx }, name: string, surname: string, gender: Gender, email: string, password: string, result: ExpectedResult, emailError: string, pageError: string) => 
{
    const mainPage = ctx.getPage(MainPage);
    const registerView = ctx.getPage(RegisterView);

    email = enrichEmail(email);

    await mainPage.ensureUserLoggedOut();
    await mainPage.clickRigister();
    await registerView.waitForLoad();
    await registerView.chooseGender(gender);
    await registerView.captureName(name);
    await registerView.captureSurname(surname);
    await registerView.captureEmail(email);
    await registerView.capturePassword(password);
    await registerView.captureConfirmPassword(password);
    await registerView.clickRegister(emailError, pageError);
});

Then('the user should be registered with {string}, {string}, {string}, {string}, {string}, and {string}', async ({ ctx }, name: string, surname: string, gender: Gender, email: string, result: ExpectedResult, resultMsg: string) => 
{
    const mainPage = ctx.getPage(MainPage);

    if (result === "Success")
    {
        const registerResultView = ctx.getPage(RegisterResultView);

        email = enrichEmail(email);

        await registerResultView.waitForLoad();
        await registerResultView.assertResultMessage(resultMsg);
        await mainPage.assertCurrentUser(email);
    }

    await mainPage.ensureUserLoggedOut();
});

Then('the user should fail to be registered', async ({ ctx }) => 
{
    const mainPage = ctx.getPage(MainPage);
    await mainPage.ensureUserLoggedOut();
});