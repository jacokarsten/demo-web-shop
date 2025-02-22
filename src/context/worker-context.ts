import { APIRequest, APIRequestContext, WorkerInfo } from '@playwright/test';
import { BrowserName } from '../common/enums';
import { ILogger } from '../utils/ilogger';
import { Logger } from '../utils/logger';


export class WorkerContext
{
    private _request: APIRequest;

    /**
     * Constructs a WorkerContext that provides contextual info on the worker where the test is running on. 
     * @param browserName The browser being used to run the test.
     * @param workerInfo The object that provides info on the worker where the test is running on.
     * @param request The object used to spin up new api request contexts.
     */
    public constructor(browserName: BrowserName, workerInfo: WorkerInfo, request: APIRequest)
    {
        this.workerInfo = workerInfo;
        this.browserName = browserName;
        this._request = request;
        this.logger = new Logger(browserName, workerInfo, undefined);
    }

    // #region Properties

    public readonly browserName: BrowserName;
    public readonly workerInfo: WorkerInfo;
    public readonly logger: ILogger;

    // #endregion

    // #region Methods

    /**
     * Spins up a new API request context.
     * @returns A new API request context.
     */
    public async newAPIRequestContext(): Promise<APIRequestContext>
    {
        return await this._request.newContext();
    }

    // #endregion
}