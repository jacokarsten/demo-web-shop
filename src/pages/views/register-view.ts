import { BasePage } from '../_base/base-page';
import { ILogger } from '../../utils/ilogger';
import { Locator, Page } from '@playwright/test';

// #region Locator Types

type YourPassword =
    {
        root: Locator;

        lblPassword: Locator;
        txtPassword: Locator;
        lblPasswordError: Locator;
        lblConfirmPassword: Locator;
        txtConfirmPassword: Locator;
        lblConfirmPasswordError: Locator;
    };

type YourPersonalDetails =
    {
        root: Locator;

        lblGender: Locator;
        rdoMale: Locator;
        rdoFemale: Locator;
        lblFirstName: Locator;
        txtFirstName: Locator;
        lblFirstNameError: Locator;
        lblLastName: Locator;
        txtLastName: Locator;
        lblLastNameError: Locator;        
        lblEmail: Locator;
        txtEmail: Locator;
        lblEmailError: Locator;
    };

type PageBody =
    {
        root: Locator;

        lblError: Locator;
        yourPersonalDetails: YourPersonalDetails;
        yourPassword: YourPassword;
        butRegister: Locator;
    };

type RegPage =
    {
        root: Locator;

        lblTitle: Locator;
        pageBody: PageBody;
    };

type Locators =
    {
        root: Locator;

        page: RegPage;
    };

// #endregion

export class RegisterView extends BasePage
{
    private _locators: Locators;

    public constructor(page: Page, logger: ILogger)
    {
        super(page, logger);

        this._locators =
        {
            root: this._page.locator('form[action="/register"]'),

            page:
            {
                root: this._page.locator('div.page.registration-page'),

                lblTitle: this._page.locator('div.page.registration-page div.page-title > h1'),

                pageBody:
                {
                    root: this._page.locator('div.page.registration-page div.page-body'),

                    lblError: this._page.locator('div.page.registration-page div.message-error'),

                    yourPersonalDetails:
                    {
                        root: this._page.locator('div.fieldset:has(div.title:has-text("Your Personal Details"))'),

                        lblGender: this._page.locator('div.fieldset:has(div.title:has-text("Your Personal Details")) div.form-fields > label'),
                        rdoMale: this._page.locator('#gender-male'),
                        rdoFemale: this._page.locator('#gender-female'),
                        
                        lblFirstName: this._page.locator('label[for="FirstName"]'),
                        txtFirstName: this._page.locator('#FirstName'),
                        lblFirstNameError: this._page.locator('span[data-valmsg-for="FirstName"]'),

                        lblLastName: this._page.locator('label[for="LastName"]'),
                        txtLastName: this._page.locator('#LastName'),
                        lblLastNameError: this._page.locator('span[data-valmsg-for="LastName"]'),

                        lblEmail: this._page.locator('label[for="Email"]'),
                        txtEmail: this._page.locator('#Email'),
                        lblEmailError: this._page.locator('span[data-valmsg-for="Email"]')
                    },
                    yourPassword:
                    {
                        root: this._page.locator('div.fieldset:has(div.title:has-text("Your Password"))'),

                        lblPassword: this._page.locator('label[for="Password"]'),
                        txtPassword: this._page.locator('#Password'),
                        lblPasswordError: this._page.locator('span[data-valmsg-for="Password"]'),

                        lblConfirmPassword: this._page.locator('label[for="ConfirmPassword"]'),
                        txtConfirmPassword: this._page.locator('#ConfirmPassword'),
                        lblConfirmPasswordError: this._page.locator('span[data-valmsg-for="ConfirmPassword"]')
                    },
                    butRegister: this._page.locator('#register-button')
                }
            }
        };
    }

    /**
     * Waits for the home page to load.
     */
    public async waitForLoad(): Promise<void>
    {
        this.logger.write('Wait for the register view to load.');
        await this._locators.root.waitFor();
    }

    public async checkElement(): Promise<void>
    {
        const works = await this._locators.page.pageBody.yourPersonalDetails.root.isVisible();

        const a = works;
    }
}