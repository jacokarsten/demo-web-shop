import { ILogger } from '../../utils/ilogger';
import { Page } from 'playwright';

/**
 * Represents a base navigation class that provides common functionality for navigating pages.
 */
export abstract class BaseNav
{
    protected _page: Page;
    protected _logger: ILogger;
 
    /**
     * Constructs a BaseNav that provides common functionality for navigating pages.
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