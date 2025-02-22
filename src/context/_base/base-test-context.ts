import { BrowserName } from '../../common/enums';
import { ILogger } from '../../utils/ilogger';
import { Logger } from '../../utils/logger';
import { TestInfo } from '@playwright/test';
import { WorkerContext } from '../worker-context';


export abstract class BaseTestContext
{
    /**
     * Constructs a BaseTestContext that provides contextual info on the test being run. 
     * @param workerContext The worker context where the test is running.
     * @param testInfo The object that provides info on the test being run.
     */
    public constructor(workerContext: WorkerContext, testInfo: TestInfo)
    {
        this.browserName = workerContext.browserName;
        this.workerContext = workerContext;
        this.testInfo = testInfo;
        this.logger = new Logger(workerContext.browserName, workerContext.workerInfo, testInfo);
    }

    // #region Properties

    public readonly browserName: BrowserName;
    public readonly workerContext: WorkerContext;
    public readonly testInfo: TestInfo;
    public readonly logger: ILogger;

    // #endregion
}