import { BasePage } from '../_base/base-page';
import { check, checkLocator, waitForFirstAvailable } from '../../helpers/locator-functions';
import { expect, Locator, Page } from '@playwright/test';
import { Gender } from '../../common/enums';
import { ILogger } from '../../utils/ilogger';

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
        rboMale: Locator;
        rboFemale: Locator;
        lblGenderError: Locator;
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
    private _nextScreen?: Locator;

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
                        rboMale: this._page.locator('#gender-male'),
                        rboFemale: this._page.locator('#gender-female'),
                        lblGenderError: this._page.locator('span[data-valmsg-for="gender"'),

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
        this._nextScreen = this._page.locator('div.page.registration-result-page');
    }

    // #region Methods

    // #region Basics

    /**
     * Waits for the register view to load.
     */
    public async waitForLoad(): Promise<void>
    {
        this.logger.write('Wait for the register view to load.');
        await this._locators.root.waitFor();
    }

    /**
     * Waits for the register view to disappear.
     */
    public async waitForUnload(): Promise<void>
    {
        this.logger.write('Wait for the register view to disappear.');
        await this._locators.root.waitFor({ state: 'hidden' });
    }

    // #endregion

    // #region Capture info

    /**
     * Capture and register the user.
     * @param gender The gender for the user to register.
     * @param name The name for the user to register.
     * @param surname The surname for the user to register.
     * @param email The email for the user to register.
     * @param password The password for the user to register.
     */
    public async expressRegister(gender: Gender, name: string, surname: string, email: string, password: string): Promise<void>
    {
        await this.chooseGender(gender);
        await this.captureName(name);
        await this.captureSurname(surname);
        await this.captureEmail(email);
        await this.capturePassword(password);
        await this.captureConfirmPassword(password);
        await this.clickRegister();
    }

    /**
     * Chooses the specified radio option (Male/Female).
     * 
     * @param gender The gender for the user to register.
     * @param expectedError The error expected to show when the gender is selected.
     */
    public async chooseGender(gender?: Gender, expectedError?: string): Promise<void>
    {
        switch (gender)
        {
            case 'Male':
                this.logger.write('Select radio rboMale');
                await check(this._locators.page.pageBody.yourPersonalDetails.rboMale);
                break;
            case 'Female':
                this.logger.write('Select radio rboFemale');
                await check(this._locators.page.pageBody.yourPersonalDetails.rboFemale);
                break;
            default:
                break;
        }

        // this.logger.write('Wait up to 200ms for possible gender error to show.');
        // if (await checkLocator(this._locators.page.pageBody.yourPersonalDetails.lblGenderError, 200))
        // {
        //     if (expectedError)
        //     {
        //         this._logger.write(`Verify gender error contains "${expectedError}".`);
        //         await expect(this._locators.page.pageBody.yourPersonalDetails.lblGenderError).toContainText(expectedError);
        //     }
        //     else
        //     {
        //         this._logger.write('Verify no gender error.');
        //         await expect(this._locators.page.pageBody.yourPersonalDetails.lblGenderError).toBeEmpty();
        //     }
        // }
        // else if (expectedError)
        // {
        //     this._logger.write('Verify gender error detected.');
        //     await expect(this._locators.page.pageBody.yourPersonalDetails.lblGenderError).toHaveCount(1);
        // }
    }

    /**
     * Fills in the name for the user to register.
     * 
     * @param name The name for the user to register.
     * @param expectedError The error expected to show when the first name is captured.
     */
    public async captureName(name: string, expectedError?: string): Promise<void>
    {
        this.logger.write(`Fill txtFirstName with name: "${name}".`);
        await this._locators.page.pageBody.yourPersonalDetails.txtFirstName.fill(name);

        this.logger.write('Wait up to 200ms for possible first name error to show.');
        if (await checkLocator(this._locators.page.pageBody.yourPersonalDetails.lblFirstNameError, 200))
        {
            if (expectedError)
            {
                this._logger.write(`Verify first name error contains "${expectedError}".`);
                await expect(this._locators.page.pageBody.yourPersonalDetails.lblFirstNameError).toContainText(expectedError);
            }
            else
            {
                this._logger.write('Verify no first name error.');
                await expect(this._locators.page.pageBody.yourPersonalDetails.lblFirstNameError).toBeEmpty();
            }
        }
        else if (expectedError)
        {
            this._logger.write('Verify first name error detected.');
            await expect(this._locators.page.pageBody.yourPersonalDetails.lblFirstNameError).toHaveCount(1);
        }
    }

    /**
     * Fills in the surname for the user to register.
     * 
     * @param surname The surname for the user to register.
     * @param expectedError The error expected to show when the surname is captured.
     */
    public async captureSurname(surname: string, expectedError?: string): Promise<void>
    {
        this.logger.write(`Fill txtSurname with surname: "${surname}".`);
        await this._locators.page.pageBody.yourPersonalDetails.txtLastName.fill(surname);

        this.logger.write('Wait up to 200ms for possible surname error to show.');
        if (await checkLocator(this._locators.page.pageBody.yourPersonalDetails.lblLastName, 200))
        {
            if (expectedError)
            {
                this._logger.write(`Verify surname error contains "${expectedError}".`);
                await expect(this._locators.page.pageBody.yourPersonalDetails.lblLastNameError).toContainText(expectedError);
            }
            else
            {
                this._logger.write('Verify no surname error.');
                await expect(this._locators.page.pageBody.yourPersonalDetails.lblLastNameError).toBeEmpty();
            }
        }
        else if (expectedError)
        {
            this._logger.write('Verify surname error detected.');
            await expect(this._locators.page.pageBody.yourPersonalDetails.lblLastNameError).toHaveCount(1);
        }
    }

    /**
     * Fills in the email for the user to register.
     * 
     * @param email The email for the user to register.
     * @param expectedError The error expected to show when the email is captured.
     */
    public async captureEmail(email: string, expectedError?: string): Promise<void>
    {
        this.logger.write(`Fill txtEmail with email: "${email}".`);
        await this._locators.page.pageBody.yourPersonalDetails.txtEmail.fill(email);

        this.logger.write('Wait up to 200ms for possible email error to show.');
        if (await checkLocator(this._locators.page.pageBody.yourPersonalDetails.lblEmailError, 200))
        {
            if (expectedError)
            {
                this._logger.write(`Verify email error contains "${expectedError}".`);
                await expect(this._locators.page.pageBody.yourPersonalDetails.lblEmailError).toContainText(expectedError);
            }
            else
            {
                this._logger.write('Verify no email error.');
                await expect(this._locators.page.pageBody.yourPersonalDetails.lblEmailError).toBeEmpty();
            }
        }
        else if (expectedError)
        {
            this._logger.write('Verify email error detected.');
            await expect(this._locators.page.pageBody.yourPersonalDetails.lblEmailError).toHaveCount(1);
        }
    }

    /**
     * Fills in the password for the user to register.
     * 
     * @param password The password for the user to register.
     * @param expectedError The error expected to show when the password is captured.
     */
    public async capturePassword(password: string, expectedError?: string): Promise<void>
    {
        this.logger.write('Fill txtPassword with password.');
        await this._locators.page.pageBody.yourPassword.txtPassword.fill(password);

        this.logger.write('Wait up to 200ms for possible password error to show.');
        if (await checkLocator(this._locators.page.pageBody.yourPassword.lblPasswordError, 200))
        {
            if (expectedError)
            {
                this._logger.write(`Verify password error contains "${expectedError}".`);
                await expect(this._locators.page.pageBody.yourPassword.lblPasswordError).toContainText(expectedError);
            }
            else
            {
                this._logger.write('Verify no password error.');
                await expect(this._locators.page.pageBody.yourPassword.lblPasswordError).toBeEmpty();
            }
        }
        else if (expectedError)
        {
            this._logger.write('Verify password error detected.');
            await expect(this._locators.page.pageBody.yourPassword.lblPasswordError).toHaveCount(1);
        }
    }

    /**
     * Fills in the confirm password for the user to register.
     * 
     * @param confirmPassword The confirm password for the user to register.
     * @param expectedError The error expected to show when the confirm password is captured.
     */
    public async captureConfirmPassword(confirmPassword: string, expectedError?: string): Promise<void>
    {
        this.logger.write('Fill txtConfirmPassword with confirm password.');
        await this._locators.page.pageBody.yourPassword.txtConfirmPassword.fill(confirmPassword);

        this.logger.write('Wait up to 200ms for possible confirm password error to show.');
        if (await checkLocator(this._locators.page.pageBody.yourPassword.lblConfirmPasswordError, 200))
        {
            if (expectedError)
            {
                this._logger.write(`Verify confirm password error contains "${expectedError}".`);
                await expect(this._locators.page.pageBody.yourPassword.lblConfirmPasswordError).toContainText(expectedError);
            }
            else
            {
                this._logger.write('Verify no confirm password error.');
                await expect(this._locators.page.pageBody.yourPassword.lblConfirmPasswordError).toBeEmpty();
            }
        }
        else if (expectedError)
        {
            this._logger.write('Verify confirm password error detected.');
            await expect(this._locators.page.pageBody.yourPassword.lblConfirmPasswordError).toHaveCount(1);
        }
    }

    // #endregion

    // #region Register

    /**
     * Clicks the 'Register' button.
     * @param expectedEmailError The error expected to show for the email.
     * @param expectedPageError The error expected to show for the page.
     */
    public async clickRegister(expectedEmailError?: string, expectedPageError?: string): Promise<void>
    {
        if (this._nextScreen)
        {
            // this.logger.write('Wait for butRegister to load.');
            // await this._locators.page.pageBody.butRegister.waitFor();

            this.logger.write('Take screenshot: Register => Verify email.');
            await this.logger.screenshot(this.page, 'Register => Verify email.');

            if (expectedEmailError || expectedPageError)
            {
                await Promise.all([
                    this.clickRegisterActual(),
                    this.checkEmailError(expectedEmailError),
                    this.checkPageError(expectedPageError)
                ]);
            }
            else
            {
                await Promise.all([
                    this._nextScreen.waitFor(),
                    this.clickRegisterActual(),
                    this.checkEmailError(expectedEmailError),
                    this.checkPageError(expectedPageError)
                ]);
            }
        }
    }

    private async clickRegisterActual(): Promise<void>    
    {
        this.logger.write('Click on butRegister.');
        await this._locators.page.pageBody.butRegister.click();
    }

    private async checkEmailError(expectedEmailError?: string): Promise<void>
    {
        this.logger.write('Wait up to 1s for possible email error to show.');
        if (await checkLocator(this._locators.page.pageBody.yourPersonalDetails.lblEmailError, 1000))
        {
            if (expectedEmailError)
            {
                this._logger.write(`Verify email error contains "${expectedEmailError}".`);
                await expect(this._locators.page.pageBody.yourPersonalDetails.lblEmailError).toContainText(expectedEmailError);
            }
            else
            {
                this._logger.write('Verify no email error.');
                await expect(this._locators.page.pageBody.yourPersonalDetails.lblEmailError).toBeEmpty();
            }
        }
        else if (expectedEmailError)
        {
            this._logger.write('Verify email error detected.');
            await expect(this._locators.page.pageBody.yourPersonalDetails.lblEmailError).toHaveCount(1);
        }
    }

    private async checkPageError(expectedPageError?: string): Promise<void>
    {
        this.logger.write('Wait up to 1s for possible page error to show.');
        if (await checkLocator(this._locators.page.pageBody.lblError, 1000))
        {
            if (expectedPageError)
            {
                this._logger.write(`Verify page error contains "${expectedPageError}".`);
                await expect(this._locators.page.pageBody.lblError).toContainText(expectedPageError);
            }
            else
            {
                this._logger.write('Verify no page error.');
                await expect(this._locators.page.pageBody.lblError).toBeEmpty();
            }
        }
        else if (expectedPageError)
        {
            this._logger.write('Verify page error detected.');
            await expect(this._locators.page.pageBody.lblError).toBeEmpty();
        }
    }

    // #endregion

    // #endregion
}