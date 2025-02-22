import { Page } from '@playwright/test';

/**
 * Represents a logger that writes messages to the console log.
 */
export interface ILogger
{
    /**
     * Writes the specified message to the given log.
     * @param message The message to write.
     */
    write(message: string): void

    /**
     * Writes the specified message to the given log as a debug message.
     * @param message The debug message to write.
     */
    debug(message: string): void

    /**
     * Writes the specified message to the given log as an info message.
     * @param message The info message to write.
     */
    info(message: string): void

    /**
     * Writes the specified message to the given log as a warning message.
     * @param message The warning message to write.
     */
    warn(message: string): void

    /**
     * Writes the specified message to the given log as an error message.
     * @param message The error message to write.
     */
    error(message: string): void
    
    /**
     * Takes a screenshot of the given page.
     * @param page The page to take a screenshot of.
     * @param title The title of the screenshot.
     */
    screenshot(page: Page, title: string): Promise<void>
}