import { BasePage } from '../_base/base-page';
import { expect } from 'playwright/test';
import { ILogger } from '../../utils/ilogger';
import { Locator, Page } from 'playwright';


// #region Locator Types

type HeaderLogo =
    {
        root: Locator;

        lnkLogo: Locator;
        imgLogo: Locator;
    };

type ShoppingCart =
    {
        root: Locator;

        lnkShoppingCart: Locator;
        lblTitle: Locator;
        lblQuantity: Locator;
    };

type Wishlist =
    {
        root: Locator;

        lnkWishList: Locator;
        lblTitle: Locator;
        lblQuantity: Locator;
    };

type HeaderLinks =
    {
        root: Locator;

        lnkRegister: Locator;
        lnkLogin: Locator;
        shoppingCart: ShoppingCart;
        wishlist: Wishlist;
    };

type Header =
    {
        root: Locator;

        headerLogo: HeaderLogo;
        headerLinks: HeaderLinks;
    };

type HeaderMenu =
    {
        root: Locator;
    };

type Left =
    {
        root: Locator;
    };

type Center =
    {
        root: Locator;
    };

type Right =
    {
        root: Locator;

    };

type MainContainer =
    {
        root: Locator;

        left: Left;
        center: Center;
        right: Right;
    };

type Footer =
    {
        root: Locator;
    };

type Locators =
    {
        root: Locator;

        header: Header;
        headerMenu: HeaderMenu;
        mainContainer: MainContainer;
        footer: Footer;
    };

// #endregion

export class MainPage extends BasePage
{
    private _locators: Locators;

    public constructor(page: Page, logger: ILogger) 
    {
        super(page, logger);

        this._locators =
        {
            root: this._page.locator('div.master-wrapper-page'),

            header:
            {
                root: this._page.locator('div.header'),

                headerLogo:
                {
                    root: this._page.locator('div.header-logo'),

                    imgLogo: this._page.locator('img[alt="Tricentis Demo Web Shop"]'),
                    lnkLogo: this._page.locator('div.header-logo > a')
                },
                headerLinks:
                {
                    root: this._page.locator('div.header-links'),

                    lnkRegister: this._page.locator('a.ico-register'),
                    lnkLogin: this._page.locator('a.ico-login'),
                    shoppingCart:
                    {
                        root: this._page.locator('#topcartlink'),

                        lnkShoppingCart: this._page.locator('#topcartlink > a.ico-cart'),
                        lblTitle: this._page.locator('#topcartlink > a.ico-cart > span:nth-of-type(1)'),
                        lblQuantity: this._page.locator('#topcartlink > a.ico-cart > span:nth-of-type(2)')
                    },
                    wishlist:
                    {
                        root: this._page.locator('div.header-links li:nth-of-type(4)'),

                        lnkWishList: this._page.locator('div.header-links li:nth-of-type(4) > a.ico-wishlist'),
                        lblTitle: this._page.locator('div.header-links li:nth-of-type(4) > a.ico-wishlist > span:nth-of-type(1)'),
                        lblQuantity: this._page.locator('div.header-links li:nth-of-type(4) > a.ico-wishlist > span:nth-of-type(2)')
                    }
                }
            },
            headerMenu:
            {
                root: this._page.locator('div.header-menu')
            },
            mainContainer:
            {
                root: this._page.locator('div.master-wrapper-main'),

                left:
                {
                    root: this._page.locator('div[class*="leftside"] , div.side-2')
                },
                center:
                {
                    root: this._page.locator('div[class*="center"]')
                },
                right:
                {
                    root: this._page.locator('div[class*="rightside"')
                }
            },
            footer:
            {
                root: this._page.locator('div.footer')
            }
        };
    }

    /**
     * Waits for the home page to load.
     */
    public async waitForLoad(): Promise<void>
    {
        this.logger.write('Wait for the home page to load.');
        await this._locators.root.waitFor();
    }

    /**
     * Checks if the user is currently logged in.
     * @returns true if the user is currently logged in, otherwise false.
     */
    public async isLoggedIn(): Promise<boolean>
    {
        // return await this._locators.right.butUserMenu.isVisible();
        return await this._locators.header.root.isVisible();
    }

    /**
     * Clicks the Register link.
     */
    public async clickRigister(): Promise<void>
    {
        this.logger.write('Click on lnkRegister.');
        await this._locators.header.headerLinks.lnkRegister.click();
    }

    /**
     * Clicks the Login link.
     */
    public async clickLogin(): Promise<void>
    {
        this.logger.write('Click on lnkLogin.');
        await this._locators.header.headerLinks.lnkLogin.click();
    }
}