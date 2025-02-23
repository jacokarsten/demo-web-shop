import { BasePage } from '../_base/base-page';
import { expect, Locator, Page } from '@playwright/test';
import { ILogger } from '../../utils/ilogger';

// #region Locator Types

type PageBody =
    {
        root: Locator;

        lblResultMessage: Locator;
        butContinue: Locator;
    };

type Locators =
    {
        root: Locator;

        lblTitle: Locator;
        pageBody: PageBody;
    };

// #endregion

export class RegisterResultView extends BasePage
{
    private _locators: Locators;

    public constructor(page: Page, logger: ILogger)
    {
        super(page, logger);

        this._locators =
        {
            root: this._page.locator('div.page.registration-result-page'),

            lblTitle: this._page.locator('div.page.registration-result-page div.page-title > h1'),

            pageBody:
            {
                root: this._page.locator('div.page.registration-result-page div.page-body'),

                lblResultMessage: this._page.locator('div.page.registration-result-page div.page-body div.result'),
                butContinue: this._page.locator('input.register-continue-button')
            }
        };
    }

    /**
     * Waits for the register result view to load.
     */
    public async waitForLoad(): Promise<void>
    {
        this.logger.write('Wait for the register result view to load.');
        await this._locators.root.waitFor();
    }

    /**
     * Verifies that the register result message matches the expected result message.
     * 
     * @param expectedMessage The expected result message on the register result view.
     */
    public async assertResultMessage(expectedMessage: string): Promise<void>
    {
        if (expectedMessage)
        {
            this.logger.write(`Verify that the result message on the register result view contains text "${expectedMessage}".`);
            await expect(this._locators.pageBody.lblResultMessage).toContainText(expectedMessage);
        }
        else
        {
            this.logger.write(`Verify that the result message on the register result view has text "${expectedMessage}".`);
            await expect(this._locators.pageBody.lblResultMessage).toHaveText(expectedMessage);
        }
    }
}