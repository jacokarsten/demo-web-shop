import { expect, Locator } from '@playwright/test';
import { ILogger } from '../utils/ilogger';


/**
 * Set checkbox/radio to true - use fallback way if first attempt fails.
 * 
 * @param locator The locator for the element to check.
 * @param timeout The number of milliseconds to wait for the checkbox's value to change to true.
 */
export async function check(locator: Locator, timeout ?: number): Promise<boolean>
{
    let result = false;

    try
    {
        if (timeout)
        {
            await locator.check({ timeout: timeout });
        }
        else
        {
            await locator.check();
        }

        result = true;
    }
    catch (exception: unknown)
    {
        await (await locator.elementHandle())!.evaluate(e => (e as HTMLInputElement).checked = true);
    }

    return result;
}

/**
 * Evaluates if the element contains the specified class value.
 * 
 * @param locator The locator for the element.
 * @param classToLook The class to check for on the element.
 */
export async function containsClass(locator: Locator, classToLook: string): Promise<boolean>
{
    const actualClassValue = await locator.getAttribute('class') ?? '';
    return actualClassValue.split(' ').includes(classToLook);
}

/**
 * Evaluates if the locator's element contains the specified class value and throws error when it doesn't.
 * 
 * @param logger The logger to write to.
 * @param locator The locator for the element.
 * @param expectedClass The class expected to be present for the element.
 */
export async function expectClass(logger: ILogger, locator: Locator, expectedClass: string): Promise<void>
{
    const actualClassValue = await locator.getAttribute('class') ?? '';
    expect(actualClassValue.split(' ')).toContain(expectedClass);
    // if (!actualClassValue.split(' ').includes(expectedClass))
    // {
    //     logger.error(`The class value "${expectedClass}" is expected to be present on the element, but it is not. Actual class value: "${actualClassValue}".`);
    //     throw new Error(`The class value "${expectedClass}" is expected to be present on the element, but it is not. Actual class value: "${actualClassValue}".`);
    // }
}

/**
 * Evaluates if the locator's element does NOT contain the specified class value and throws error when it does.
 * 
 * @param logger The logger to write to.
 * @param locator The locator for the element.
 * @param expectedClass The class expected to be absent for the element.
 */
export async function expectClassAbsent(logger: ILogger, locator: Locator, expectedClass: string): Promise<void>
{
    const actualClassValue = await locator.getAttribute('class') ?? '';
    expect(actualClassValue.split(' ')).not.toContain(expectedClass);
    // if (actualClassValue.split(' ').includes(expectedClass))
    // {
    //     logger.error(`The class value "${expectedClass}" is expected to be absent on the element, but it is not. Actual class value: "${actualClassValue}".`);
    //     throw new Error(`The class value "${expectedClass}" is expected to be absent on the element, but it is not. Actual class value: "${actualClassValue}".`);
    // }
}

/**
 * Waits for the first available locator (up to timeout) from the specified array of locators.
 * 
 * @param locators The locators to wait for.
 * @param timeout Waits for the given timeout in milliseconds.
 * @returns The locator if found within timeout, otherwise undefined.
 */
export async function waitForFirstAvailable(locators: Locator[], timeout: number): Promise<Locator | undefined>
{
    return await Promise.any(locators.map(loc => waitForLocator(loc, timeout)));
}

/**
 * Waits for the locator's element (up to timeout) to be present on the page.
 * 
 * @param locator The locator for the element.
 * @param timeout Waits for the given timeout in milliseconds. 
 * @returns true if the element was found, otherwise false.
 */
export async function checkLocator(locator: Locator, timeout: number): Promise<boolean>
{
    const foundLocator = await Promise.any([
        locator.page().waitForTimeout(timeout),
        checkLocatorWithTimeout(locator, timeout + 5000)
    ]);

    return foundLocator ? foundLocator : false;
}

// #region Helper functions

/**
 * Waits for the locator's element (up to timeout) to be present on the page.
 * 
 * @param locator The locator for the element.
 * @param timeout Waits for the given timeout in milliseconds. 
 * @returns The locator if found within timeout, otherwise undefined.
 */
async function waitForLocator(locator: Locator, timeout: number): Promise<Locator | undefined>
{
    const foundLocator = await Promise.any([
        locator.page().waitForTimeout(timeout),
        waitForLocatorWithTimeout(locator, timeout + 5000)
    ]);

    return foundLocator ? foundLocator : undefined;
}

/**
 * Waits for the locator (up to timeout).
 * 
 * @param locator The locator to wait for.
 * @param timeout Waits for the given timeout in milliseconds.
 * @returns The locator if found within timeout, otherwise undefined.
 */
async function waitForLocatorWithTimeout(locator: Locator, timeout: number): Promise<Locator>
{
    await locator.waitFor({ timeout: timeout });
    return locator;
}

/**
 * Checks if the locator's element is available (within the specified timeout).
 * 
 * @param locator The locator to wait for.
 * @param timeout Waits for the given timeout in milliseconds.
 * @returns true if the locator is found within timeout, otherwise false.
 */
async function checkLocatorWithTimeout(locator: Locator, timeout: number): Promise<boolean>
{
    await locator.waitFor({ timeout: timeout });
    return true;
}

// #endregion