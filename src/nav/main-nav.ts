import { BaseNav } from '../pages/_base/base-nav';
import { ILogger } from '../utils/ilogger';
import { Page } from 'playwright';

/**
 * Represents the main navigation class that provides functionality for navigating pages.
 */
export class MainNav extends BaseNav
{
    /**
     * Constructs a MainNav that provides functionality for navigating pages.
     * @param page The page to navigate.
     * @param logger The logger to use for logging messages.
     */
    public constructor(page: Page, logger: ILogger) 
    {
        super(page, logger);
    }

    /**
     * Navigates the specified page to the base url.
     */
    public async navToHome(): Promise<void>
    {
        this._logger.write(`Navigate to the base url.`);
        await this._page.goto("/");
    }
}