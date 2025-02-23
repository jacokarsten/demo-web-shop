import { ComputerTypes, Gender } from '../src/common/enums';
import { createBdd } from 'playwright-bdd';
import { DesktopsView } from '../src/pages/views/desktops-view';
import { enrichEmail } from '../src/utils/token';
import { LoginView } from '../src/pages/views/login-view';
import { MainNav } from '../src/nav/main-nav';
import { MainPage } from '../src/pages/main/main-page';
import { RegisterView } from '../src/pages/views/register-view';
import { test } from './order.fixture';

const { Given, When, Then } = createBdd(test);


Given('the user has registered {string}, {string}, {string}, {string}, and {string}', async ({ ctx }, name: string, surname: string, gender: Gender, email: string, password: string) => 
{
    const mainNav = ctx.getNav(MainNav);
    const mainPage = ctx.getPage(MainPage);
    const registerView = ctx.getPage(RegisterView);
    // const loginView = ctx.getPage(LoginView);

    await mainNav.navToHome();

    email = enrichEmail(email);

    await mainPage.ensureUserLoggedOut();
    await mainPage.clickRigister();
    await registerView.waitForLoad();
    await registerView.expressRegister(gender, name, surname, email, password);

    // await mainPage.clickLogin();
    // await loginView.expressLogin(email, password);
});

When('the user navigates to Computers and then {string} and the correct items are displayed', async ({ ctx }, computerType: ComputerTypes) =>
{
    const mainPage = ctx.getPage(MainPage);    

    await mainPage.hoverOverComputers();
    
    switch (computerType)
    {
        case 'Desktops':            
            const desktopsView = ctx.getPage(DesktopsView);

            await mainPage.clickDesktops();
            await desktopsView.waitForLoad();
            const originalItems = await desktopsView.getUnsortedItems();

            // Sort the array according to Position
            // const sortedPosition = [...originalItems].sort((a, b) => a.rating - b.rating);

            // Sort the array from A to Z by title
            const sortedAZ = [...originalItems].sort((a, b) => a.title.localeCompare(b.title));

            // Sort the array from Z to A by title
            const sortedZA = [...originalItems].sort((a, b) => b.title.localeCompare(a.title));

            // Sort the array by price from low to high
            const sortedLowToHigh = [...originalItems].sort((a, b) => a.price - b.price);

            // Sort the array by price from high to low
            const sortedHighToLow = [...originalItems].sort((a, b) => b.price - a.price);

            // Sort the array by created date
            // const sortedCreatedOn = [...originalItems].sort((a, b) => a.createdOn - b.createdOn);

            // await desktopsView.selectSorting('Position');
            // await desktopsView.waitForLoad();
            // await desktopsView.assertSortOrder(sortedPosition);            

            await desktopsView.selectSorting('Name: A to Z');
            await desktopsView.waitForLoad();
            await desktopsView.assertSortOrder(sortedAZ);            

            await desktopsView.selectSorting('Name: Z to A');
            await desktopsView.waitForLoad();
            await desktopsView.assertSortOrder(sortedZA);

            await desktopsView.selectSorting('Price: Low to High'),
            await desktopsView.waitForLoad();
            await desktopsView.assertSortOrder(sortedLowToHigh);

            await desktopsView.selectSorting('Price: High to Low'),
            await desktopsView.waitForLoad();
            await desktopsView.assertSortOrder(sortedHighToLow);

            await desktopsView.selectSorting('Created on');
            // await desktopsView.assertSortOrder(sortedCreatedOn)
            break;
        case 'Notebooks':
            
            await mainPage.clickNotebooks();
            break;
        case 'Accessories':

            await mainPage.clickAccessories();
            break;
        default:
            throw new Error(`Unknown computer type: ${computerType}`);
    }
});