import { BrowserName } from '../common/enums';
import { ILogger } from './ilogger';
import { now } from './date';
import { Page, TestInfo, WorkerInfo } from '@playwright/test';

/**
 * Writes messages to the console log.
 */
export class Logger implements ILogger
{
    private _browserName: BrowserName;
    private _workerInfo?: WorkerInfo;
    private _testInfo?: TestInfo;
    private _order = 0;

    /**
     * Constructs a Logger that writes messages to the console log.
     * @param browserName The browser being used to run the test.
     * @param workerInfo The object that provides info on the worker where the test is running on.
     * @param testInfo The object that provides info on the test being run.
     */
    public constructor(browserName: BrowserName, workerInfo?: WorkerInfo, testInfo?: TestInfo)
    {
        this._browserName = browserName;
        this._workerInfo = workerInfo;
        this._testInfo = testInfo;
    }

    /**
     * Writes the specified message to the console log.
     * @param message The message to write.
     */
    public write(message: string): void
    {
        console.log(`${this.getBrowserAcronym(this._browserName)} ${this._workerInfo?.workerIndex ?? '-'} ${now()}: ${message}`);
    }

    /**
     * Writes the specified message to the console log as a debug message.
     * @param message The debug message to write.
     */
    public debug(message: string): void
    {
        console.debug(`${this.getBrowserAcronym(this._browserName)} ${this._workerInfo?.workerIndex ?? '-'} ${now()}: ${message}`);
    }

    /**
     * Writes the specified message to the console log as an info message.
     * @param message The info message to write.
     */
    public info(message: string): void
    {
        console.info(`${this.getBrowserAcronym(this._browserName)} ${this._workerInfo?.workerIndex ?? '-'} ${now()}: ${message}`);
    }

    /**
     * Writes the specified message to the console log as a warning message.
     * @param message The warning message to write.
     */
    public warn(message: string): void
    {
        console.warn(`${this.getBrowserAcronym(this._browserName)} ${this._workerInfo?.workerIndex ?? '-'} ${now()}: ${message}`);
    }

    /**
     * Writes the specified message to the console log as an error message.
     * @param message The error message to write.
     */
    public error(message: string): void
    {
        console.error(`${this.getBrowserAcronym(this._browserName)} ${this._workerInfo?.workerIndex ?? '-'} ${now()}: ${message}`);
    }

    /**
     * Takes a screenshot of the specified page and attaches it to the test.
     * @param page The page to take a screenshot of.
     * @param title The title of the screenshot.
     */
    public async screenshot(page: Page, title: string): Promise<void>
    {
        if (this._testInfo)
        {
            await this._testInfo.attach(title, { contentType: 'image/png', body: await page.screenshot() });
        }
        else
        {
            this._order++;
            await page.screenshot({
                path: `./screenshots/${this.getBrowserAcronym(this._browserName)}_${this._workerInfo?.workerIndex ?? '-'}_${this._order.toString().padStart(3, '0')}_` +
                    `${title.replace(/[/,:.\s\W]/g, '')}.png`
            });
        }
    }

    // #region Helper functions

    /**
     * Obtains the acronym of the specified browser name.
     * @param browserName The browser name for which to obtain the acronym.
     * @returns The acronym of the specified browser name.
     */
    private getBrowserAcronym(browserName: BrowserName): string
    {
        let result = 'X';

        switch (browserName)
        {
            case 'chromium':
                result = 'C';
                break;
            case 'firefox':
                result = 'F';
                break;
            case 'webkit':
                result = 'S';
                break;
            default:
                throw Error('Unknown browserName');
        }

        return result;
    }

    // #endregion
}