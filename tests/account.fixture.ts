import { MainNav } from '../src/nav/main-nav';
import { MainPage } from '../src/pages/main/main-page';
import { RegisterView } from '../src/pages/views/register-view';
import { test as base } from 'playwright-bdd';
import { TestContext } from '../src/context/test-context';
import { WorkerContext } from '../src/context/worker-context';

/**
 * Represents the test fixture for the account tests.
 */
export const test = base.extend<{ ctx: TestContext; }, { workerCtx: WorkerContext; }>({

    /**
     * Provides the worker context for the test.
     */
    workerCtx: [async ({ playwright, browserName }, use, workerInfo): Promise<void> =>
    {
        await use(new WorkerContext(browserName, workerInfo, playwright.request));
    }, { scope: 'worker' }],

    /**
     * Provides the test context for the test.
     */
    ctx: async ({ workerCtx, page }, use, testInfo): Promise<void> => 
    {
        const context = new TestContext(workerCtx, testInfo);

        context.addNav(new MainNav(page, context.logger));
        context.addPage(new MainPage(page, context.logger));
        context.addPage(new RegisterView(page, context.logger));

        await use(context);
    }
});