import { BasePage } from '../_base/base-page';
import { checkLocator } from '../../helpers/locator-functions';
import { expect, Locator, Page } from '@playwright/test';
import { ILogger } from '../../utils/ilogger';

// #region Locator Types

type NewCustomerBlock =
    {
        root: Locator;

        lblTitle: Locator;
        lblPrompt: Locator;
        butRegister: Locator;
    };

type SignInErrorContainer =
    {
        root: Locator;

        lblSummaryError: Locator;
        lblErrors: Locator;
    };

type ReturningCustomerBlock =
    {
        root: Locator;

        errorContainer: SignInErrorContainer;
        lblTitle: Locator;
        lblEmail: Locator;
        txtEmail: Locator;
        lblEmailError: Locator;
        lblPassword: Locator;
        txtPassword: Locator;
        lblPasswordError: Locator;
        chkRememberMe: Locator;
        lblRememberMe: Locator;
        lnkForgotPassword: Locator;
        btnLogin: Locator;
    };

type CustomerBlocks =
    {
        root: Locator;

        newCustomer: NewCustomerBlock;
        returningCustomer: ReturningCustomerBlock;
    };

type TopicContent =
    {
        root: Locator;

        lblTitle: Locator;
        lblContent: Locator;
    };

type PageBody =
    {
        root: Locator;

        customerBlocks: CustomerBlocks;
        topicContent: TopicContent;
    };

type Locators =
    {
        root: Locator;

        lblTitle: Locator;
        pageBody: PageBody;
    };

// #endregion

export class LoginView extends BasePage
{
    private _locators: Locators;
    private _nextScreen?: Locator;

    public constructor(page: Page, logger: ILogger)
    {
        super(page, logger);

        this._locators =
        {
            root: this._page.locator('div.page.login-page'),

            lblTitle: this._page.locator('div.page.login-page div.page-title > h1'),
            pageBody:
            {
                root: this._page.locator('div.page.login-page div.page-body'),

                customerBlocks:
                {
                    root: this._page.locator('div.page.login-page div.page-body div.customer-blocks'),

                    newCustomer:
                    {
                        root: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.new-wrapper'),

                        lblTitle: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.new-wrapper div.title'),
                        lblPrompt: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.new-wrapper div.text'),
                        butRegister: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.new-wrapper input.register-button')
                    },
                    returningCustomer:
                    {
                        root: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper'),

                        errorContainer:
                        {
                            root: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper div.validation-summary-errors'),

                            lblSummaryError: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper div.validation-summary-errors span'),
                            lblErrors: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper div.validation-summary-errors ul li')
                        },
                        lblTitle: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper div.title'),
                        lblEmail: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper label[for="Email"]'),
                        txtEmail: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper input#Email'),
                        lblEmailError: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper span[data-valmsg-for="Email"]'),
                        lblPassword: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper label[for="Password"]'),
                        txtPassword: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper input#Password'),
                        lblPasswordError: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper span[data-valmsg-for="Password"]'),
                        chkRememberMe: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper input#RememberMe'),
                        lblRememberMe: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper label[for="RememberMe"]'),
                        lnkForgotPassword: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper a[href*="/passwordrecovery"]'),
                        btnLogin: this._page.locator('div.page.login-page div.page-body div.customer-blocks div.returning-wrapper input.login-button')
                    }
                },
                topicContent:
                {
                    root: this._page.locator('div.page.login-page div.page-body div.topic-html-content'),

                    lblTitle: this._page.locator('div.page.login-page div.page-body div.topic-html-content-title h2'),
                    lblContent: this._page.locator('div.page.login-page div.page-body div.topic-html-content-body p')
                }
            }

        };
        this._nextScreen = this._page.locator('div.page.home-page');
    }

    /**
     * Waits for the login view to load.
     */
    public async waitForLoad(): Promise<void>
    {
        this.logger.write('Wait for the login view to load.');
        await this._locators.root.waitFor();
    }

    /**
     * Logs the user in with the specified username and password.
     * @param email The email address to log in with.
     * @param password The password to log in with.
     */
    public async expressLogin(email: string, password: string): Promise<void>
    {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    /**
     * Fill the email address to log in with.
     * @param email The email address to log in with.
     * @param expectedError The expected error message to be displayed when the email address is filled.
     */
    public async fillEmail(email: string, expectedError?: string): Promise<void>
    {
        this.logger.write('Fill the email.');
        await this._locators.pageBody.customerBlocks.returningCustomer.txtEmail.fill(email);

        this.logger.write('Wait up to 200ms second for possible email error to show.');
        if (await checkLocator(this._locators.pageBody.customerBlocks.returningCustomer.lblEmailError, 200))
        {
            if (expectedError)
            {
                this._logger.write(`Verify email error contains "${expectedError}".`);
                await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblEmailError).toContainText(expectedError);
            }
            else
            {
                this._logger.write('Verify no email error.');
                await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblEmailError).toBeEmpty();
            }
        }
        else if (expectedError)
        {
            this._logger.write('Verify email error detected.');
            await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblEmailError).toHaveCount(1);
        }
    }

    /**
     * Fill the password to log in with.
     * @param password The password to log in with.
     * @param expectedError The expected error message to be displayed when the password is filled.
     */
    public async fillPassword(password: string, expectedError?: string): Promise<void>
    {
        this.logger.write('Fill the password.');
        await this._locators.pageBody.customerBlocks.returningCustomer.txtPassword.fill(password);

        this.logger.write('Wait up to 200ms second for possible email error to show.');
        if (await checkLocator(this._locators.pageBody.customerBlocks.returningCustomer.lblPasswordError, 200))
        {
            if (expectedError)
            {
                this._logger.write(`Verify password error contains "${expectedError}".`);
                await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblPasswordError).toContainText(expectedError);
            }
            else
            {
                this._logger.write('Verify no password error.');
                await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblPasswordError).toBeEmpty();
            }
        }
        else if (expectedError)
        {
            this._logger.write('Verify password error detected.');
            await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblPasswordError).toHaveCount(1);
        }
    }

    /**
     * Click the login button.
     * @param expectedError The expected error message to show for the email.
     * @param expectedPageError The expected error message to show for the page.
     */
    public async clickLogin(expectedEmailError?: string, expectedPageError?: string): Promise<void>
    {
        if (this._nextScreen)
        {
            this.logger.write('Take screenshot: Login => Verify email.');
            await this.logger.screenshot(this.page, 'Login => Verify email.');

            if (expectedEmailError || expectedPageError)
            {
                await Promise.all([
                    this.clickLoginActual(),
                    this.checkEmailError(expectedEmailError),
                    this.checkPageError(expectedPageError)
                ]);
            }
            else
            {
                await Promise.all([
                    this._nextScreen.waitFor(),
                    this.clickLoginActual(),
                    this.checkEmailError(expectedEmailError),
                    this.checkPageError(expectedPageError)
                ]);
            }
        }
    }

    private async clickLoginActual(): Promise<void>    
    {
        this.logger.write('Click the login button.');
        await this._locators.pageBody.customerBlocks.returningCustomer.btnLogin.click();
    }

    private async checkEmailError(expectedEmailError?: string): Promise<void>
    {
        this.logger.write('Wait up to 1s for possible email error to show.');
        if (await checkLocator(this._locators.pageBody.customerBlocks.returningCustomer.lblEmailError, 1000))
        {
            if (expectedEmailError)
            {
                this._logger.write(`Verify email error contains "${expectedEmailError}".`);
                await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblEmailError).toContainText(expectedEmailError);
            }
            else
            {
                this._logger.write('Verify no email error.');
                await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblEmailError).toBeEmpty();
            }
        }
        else if (expectedEmailError)
        {
            this._logger.write('Verify email error detected.');
            await expect(this._locators.pageBody.customerBlocks.returningCustomer.lblEmailError).toHaveCount(1);
        }
    }

    private async checkPageError(expectedPageError?: string): Promise<void>
    {
        this.logger.write('Wait up to 1s for possible page error to show.');
        if (await checkLocator(this._locators.pageBody.customerBlocks.returningCustomer.errorContainer.lblSummaryError, 1000))
        {
            if (expectedPageError)
            {
                this._logger.write(`Verify page error contains "${expectedPageError}".`);
                await expect(this._locators.pageBody.customerBlocks.returningCustomer.errorContainer.lblSummaryError).toContainText(expectedPageError);
            }
            else
            {
                this._logger.write('Verify no page error.');
                await expect(this._locators.pageBody.customerBlocks.returningCustomer.errorContainer.lblSummaryError).toBeEmpty();
            }
        }
        else if (expectedPageError)
        {
            this._logger.write('Verify page error detected.');
            await expect(this._locators.pageBody.customerBlocks.returningCustomer.errorContainer.lblSummaryError).toBeEmpty();
        }
    }
}