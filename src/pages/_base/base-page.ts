import { ILogger } from '../../utils/ilogger';
import { Page } from 'playwright';

/**
 * Represents a base page class that provides common functionality for pages.
 */
export abstract class BasePage
{    
    protected _page: Page;
    protected _logger: ILogger;

    /**
     * Constructs a BasePage that provides common functionality for pages.
     * @param page The page to navigate.
     * @param logger The logger to use for logging messages.
     */
    public constructor(page: Page, logger: ILogger)
    {
        this._page = page;        
        this._logger = logger;
    }

    // #region Properites

    /**
     * Gets the page to navigate.
     */
    protected get page(): Page
    {
        return this._page;
    }

    /**
     * Gets the logger to use for logging messages.
     */
    protected get logger(): ILogger
    {
        return this._logger;
    }

    // #endregion
}