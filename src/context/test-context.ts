import { BaseNav } from '../pages/_base/base-nav';
import { BasePage } from '../pages/_base/base-page';
import { BaseTestContext } from './_base/base-test-context';
import { TestInfo } from '@playwright/test';
import { WorkerContext } from './worker-context';

export class TestContext extends BaseTestContext
{
    private _baseNavs: BaseNav[] = [];
    private _basePages: BasePage[] = [];

    /**
     * Constructs a WebTestContext capable of interacting with the browser context.
     * @param workerContext The context for the worker where the test is running on.
     * @param testInfo The object that provides info on the current running test.
     */
    public constructor(workerContext: WorkerContext, testInfo: TestInfo)
    {
        super(workerContext, testInfo);
    }

    /**
     * Adds the specified instance of a BaseNav to the test context.
     * @param baseNav The BaseNav instance to add to the test context.
     */
    public addNav(baseNav: BaseNav): void 
    {
        this._baseNavs.push(baseNav);
    }

    /**
     * Retrieves the stored BaseNav for the specified type.
     * @param className The type of NavObject to retrieve.
     * @returns The stored instance of the requested BaseNav.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getNav<T extends BaseNav>(className: new (...args: any[]) => T): T
    {
        const baseNav = this._baseNavs.find(bn => bn instanceof className);
        if (baseNav)
        {
            return baseNav as T;
        }
        else
        {
            throw new Error(`No instance of ${className.name} exist in the test context. Did you add it in the test's fixture?`);
        }  
    }

    /**
     * Adds the specified instance of a BasePage to the test context.
     * @param basePage The BasePage instance to add to the test context.
     */
    public addPage(basePage: BasePage): void 
    {
        this._basePages.push(basePage);
    }

    /**
     * Retrieves the stored BasePage for the specified type.
     * @param className The type of BasePage to retrieve.
     * @returns The stored instance of the requested BasePage.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getPage<T extends BasePage>(className: new (...args: any[]) => T): T
    {
        const basePage = this._basePages.find(bp => bp instanceof className);
        if (basePage)
        {
            return basePage as T;
        }
        else
        {
            throw new Error(`No instance of ${className.name} exist in the test context. Did you add it in the test's fixture?`);
        }        
    }
}