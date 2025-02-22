import { BasePage } from '../_base/base-page';
import { ILogger } from '../../utils/ilogger';
import { Page } from '@playwright/test';

export class LoginView extends BasePage
{
    public constructor(page: Page, logger: ILogger)
    {
        super(page, logger);
    }
}