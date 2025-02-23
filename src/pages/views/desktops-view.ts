import { BasePage } from '../_base/base-page';
import { checkLocator } from '../../helpers/locator-functions';
import { DesktopSortOrder } from '../../common/enums';
import { expect, Locator, Page } from '@playwright/test';
import { IDesktopItem } from '../../types';
import { ILogger } from '../../utils/ilogger';

// #region Locator Types

type ProductGrid =
    {
        root: Locator;

        items: Locator;
    };

type ProductSeletors =
    {
        root: Locator;
        
        lblSorting: Locator;
        selSorting: Locator;
        lblPageSize: Locator;
        selPageSize: Locator;
        lblViewMode: Locator;
        selViewMode: Locator;
    };

type ProductFilters =
{
    root: Locator;

    lblTitle: Locator;
    lnkFilterCat1: Locator;
    lnkFilterCat2: Locator;
    lnkFilterCat3: Locator;
}

type PageBody =
    {
        root: Locator;

        productSelectors: ProductSeletors;
        productFilters: ProductFilters;
        productGrid: ProductGrid;
    };

type DesktopsPage =
    {
        root: Locator;

        lblTitle: Locator;
        pageBody: PageBody;
    };

type BreadCrumb =
{
    root: Locator;

    items: Locator;
}

type Locators =
    {
        breadCrumb: BreadCrumb;
        page: DesktopsPage;
    };

// #endregion

export class DesktopsView extends BasePage
{
    private _locators: Locators;

    public constructor(page: Page, logger: ILogger)
    {
        super(page, logger);

        this._locators =
        {
            breadCrumb:
            {
                root: this._page.locator('div.breadcrumb'),
                items: this._page.locator('div.breadcrumb ul li')
            },
            page:
            {
                root: this._page.locator('div.page.category-page'),

                lblTitle: this._page.locator('div.page.category-page h1'),
                pageBody:
                {
                    root: this._page.locator('div.page.category-page div.page-body'),

                    productSelectors:
                    {
                        root: this._page.locator('div.page.category-page div.product-selectors'),

                        lblSorting: this._page.locator('div.page.category-page div.product-selectors div.product-sorting > span'),
                        selSorting: this._page.locator('div.page.category-page div.product-selectors div.product-sorting > select'),
                        lblPageSize: this._page.locator('div.page.category-page div.product-selectors div.product-page-size > span'),
                        selPageSize: this._page.locator('div.page.category-page div.product-selectors div.product-page-size > select'),
                        lblViewMode: this._page.locator('div.page.category-page div.product-selectors div.product-viewmode > span'),
                        selViewMode: this._page.locator('div.page.category-page div.product-selectors div.product-viewmode > select')
                    },
                    productFilters:
                    {
                        root: this._page.locator('div.page.category-page div.product-filters'),

                        lblTitle: this._page.locator('div.page.category-page div.product-filters div.filter-title'),
                        lnkFilterCat1: this._page.locator('div.page.category-page div.product-filters div.filter-content ul.price-range-selector > li:nth-child(1) > a'),
                        lnkFilterCat2: this._page.locator('div.page.category-page div.product-filters div.filter-content ul.price-range-selector > li:nth-child(2) > a'),
                        lnkFilterCat3: this._page.locator('div.page.category-page div.product-filters div.filter-content ul.price-range-selector > li:nth-child(3) > a')
                    },
                    productGrid:
                    {
                        root: this._page.locator('div.page.category-page div.product-grid'),

                        items: this._page.locator('div.page.category-page div.product-grid div.product-item')
                    }
                }
            }
        };
    }

    // #region Methods

    // #region Basics

    /**
     * Waits for the desktops view to load.
     */
    public async waitForLoad(): Promise<void>
    {
        this.logger.write('Wait for the desktops view to load.');
        await this._locators.page.root.waitFor();
    }

    /**
     * Waits for the desktops view to disappear.
     */
    public async waitForUnload(): Promise<void>
    {
        this.logger.write('Wait for the desktops view to disappear.');
        await this._locators.page.root.waitFor({ state: 'hidden' });
    }

    // #endregion

    /**
     * Sets the sort order.
     * @param order The new sort order.
     */
    public async selectSorting(order: DesktopSortOrder): Promise<void>
    {
        this.logger.write(`Select the sorting: ${order}.`);
        await this._locators.page.pageBody.productSelectors.selSorting.selectOption({ label: order });
    }

    /**
     * Retrieves the unsorted items.
     * @returns The unsorted items.
     */
    public async getUnsortedItems(): Promise<IDesktopItem[]>
    {
        const items = await this._locators.page.pageBody.productGrid.items.evaluateAll(items => items.map(i =>
        {
            return {
                title: i.querySelector('div.details h2.product-title')?.textContent?.trim() ?? '',
                description: i.querySelector('div.details div.description')?.textContent?.trim() ?? '',
                rating: parseFloat(i.querySelector('div.details div.rating > div')?.getAttribute('style')?.match(/(\d+(\.\d+)?)/)?.[0] ?? '0'),
                price: parseFloat(i.querySelector('div.details div.prices > span')?.textContent?.trim().replace(/[^0-9.-]+/g, '') ?? '0')
            };
        }));

        return items;
    }


    /**
     * Asserts the sort order of the items.
     * @param expectedItems The expected order of the items.
     */
    public async assertSortOrder(expectedItems: IDesktopItem[]): Promise<void>
    {
        const actualItems = await this._locators.page.pageBody.productGrid.items.evaluateAll(items => items.map(i =>
        {
            return {
                title: i.querySelector('div.details h2.product-title')?.textContent?.trim() ?? '',
                description: i.querySelector('div.details div.description')?.textContent?.trim() ?? '',
                rating: parseFloat(i.querySelector('div.details div.rating > div')?.getAttribute('style')?.match(/(\d+(\.\d+)?)/)?.[0] ?? '0'),
                price: parseFloat(i.querySelector('div.details div.prices > span')?.textContent?.trim().replace(/[^0-9.-]+/g, '') ?? '0')
            };
        }));

        this.logger.write(`Verify the order matches between expected and actual items.`);
        expect(actualItems).toEqual(expectedItems);
    }

    // #endregion
}