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
        lnkCurrentUser: Locator;
        lnkLogout: Locator;
        shoppingCart: ShoppingCart;
        wishlist: Wishlist;
    };

type Header =
    {
        root: Locator;

        headerLogo: HeaderLogo;
        headerLinks: HeaderLinks;
    };

type ComputersSubMenu =
    {
        root: Locator;

        lnkDesktops: Locator;
        lnkNotebooks: Locator;
        lnkAccessories: Locator;
    };

type Electronics =
    {
        root: Locator;

        lnkCameraPhoto: Locator;
        lnkCellPhones: Locator;
    };

type HeaderMenu =
    {
        root: Locator;

        lnkBooks: Locator;
        lnkComputers: Locator;
        computersSubMenu: ComputersSubMenu;
        lnkElectronics: Locator;
        electronics: Electronics;
        lnkApparelAndShoes: Locator;
        lnkDigitalDownloads: Locator;
        lnkJewelry: Locator;
        lnkGiftCards: Locator;
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

                    lnkRegister: this._page.locator('div.header-links a.ico-register'),
                    lnkLogin: this._page.locator('div.header-links a.ico-login'),
                    lnkCurrentUser: this._page.locator('div.header-links a.account'),
                    lnkLogout: this._page.locator('div.header-links a.ico-logout'),
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
                root: this._page.locator('div.header-menu'),

                lnkBooks: this._page.locator('div.header-menu ul.top-menu a[href*="/books"]'),
                lnkComputers: this._page.locator('div.header-menu ul.top-menu a[href*="/computers"]'),
                computersSubMenu:
                {
                    root: this._page.locator('div.header-menu ul.top-menu li:has(a[href*="/computers"]) ul.sublist.firstLevel'),

                    lnkDesktops: this._page.locator('div.header-menu ul.top-menu li:has(a[href*="/computers"]) ul.sublist.firstLevel a[href*="/desktops"]'),
                    lnkNotebooks: this._page.locator('div.header-menu ul.top-menu li:has(a[href*="/computers"]) ul.sublist.firstLevel a[href*="/notebooks"]'),
                    lnkAccessories: this._page.locator('div.header-menu ul.top-menu li:has(a[href*="/computers"]) ul.sublist.firstLevel a[href*="/accessories"]')
                },
                lnkElectronics: this._page.locator('div.header-menu ul.top-menu a[href*="/electronics"]'),
                electronics:
                {
                    root: this.page.locator('div.header-menu ul.top-menu li:has(a[href*="/electronics"]) ul.sublist.firstLevel'),

                    lnkCameraPhoto: this.page.locator('div.header-menu ul.top-menu li:has(a[href*="/electronics"]) ul.sublist.firstLevel a[href*="/camera-photo"]'),
                    lnkCellPhones: this.page.locator('div.header-menu ul.top-menu li:has(a[href*="/electronics"]) ul.sublist.firstLevel a[href*="/cell-phones"]')
                },
                lnkApparelAndShoes: this._page.locator('div.header-menu ul.top-menu a[href*="/apparel-shoes"]'),
                lnkDigitalDownloads: this._page.locator('div.header-menu ul.top-menu a[href*="/digital-downloads"]'),
                lnkJewelry: this._page.locator('div.header-menu ul.top-menu a[href*="/jewelry"]'),
                lnkGiftCards: this._page.locator('div.header-menu ul.top-menu a[href*="/gift-cards"]')
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

    // #region Method

    // #region Basics

    /**
     * Waits for the home page to load.
     */
    public async waitForLoad(): Promise<void>
    {
        this.logger.write('Wait for the home page to load.');
        await this._locators.root.waitFor();
    }

    // #endregion

    // #region HeaderLinks

    /**
     * Clicks the Register link.
     */
    public async clickRigister(): Promise<void>
    {
        this.logger.write('Click on lnkRegister.');
        await this._locators.header.headerLinks.lnkRegister.click();
    }

    /**
     * Checks if a user is currently logged in.
     * @returns true if a user is currently logged in, otherwise false.
     */
    public async isLoggedIn(): Promise<boolean>
    {
        this.logger.write('Check if a user is currently logged in.');
        return await this._locators.header.headerLinks.lnkCurrentUser.isVisible();
    }

    /**
     * Clicks the Login link.
     */
    public async clickLogin(): Promise<void>
    {
        this.logger.write('Click on lnkLogin.');
        await this._locators.header.headerLinks.lnkLogin.click();
    }

    /**
     * Logs out the user if they are currently logged in.
     */
    public async ensureUserLoggedOut(): Promise<void>
    {
        if (await this.isLoggedIn())
        {
            await this.clickLogout();
        }
    }

    /**
     * Clicks the Logout link.
     */
    public async clickLogout(): Promise<void>
    {
        this.logger.write('Click on lnkLogout.');
        await this._locators.header.headerLinks.lnkLogout.click();
    }

    // #endregion

    // #region HeaderMenu

    /**
     * Clicks the Books link.
     */
    public async clickBooks(): Promise<void>
    {
        this.logger.write('Click on lnkBooks.');
        await this._locators.headerMenu.lnkBooks.click();
    }

    /**
     * Clicks the Computers link.
     */
    public async clickComputers(): Promise<void>
    {
        this.logger.write('Click on lnkComputers.');
        await this._locators.headerMenu.lnkComputers.click();
    }

    /**
     * Clicks the Electronics link.
     */
    public async clickElectronics(): Promise<void>
    {
        this.logger.write('Click on lnkElectronics.');
        await this._locators.headerMenu.lnkElectronics.click();
    }

    /**
     * Clicks the Apparel & Shoes link.
     */
    public async clickApparelAndShoes(): Promise<void>
    {
        this.logger.write('Click on lnkApparelAndShoes.');
        await this._locators.headerMenu.lnkApparelAndShoes.click();
    }

    /**
     * Clicks the Digital Downloads link.
     */
    public async clickDigitalDownloads(): Promise<void>
    {
        this.logger.write('Click on lnkDigitalDownloads.');
        await this._locators.headerMenu.lnkDigitalDownloads.click();
    }

    /**
     * Clicks the Jewelry link.
     */
    public async clickJewelry(): Promise<void>
    {
        this.logger.write('Click on lnkJewelry.');
        await this._locators.headerMenu.lnkJewelry.click();
    }

    /**
     * Clicks the Gift Cards link.
     */
    public async clickGiftCards(): Promise<void>
    {
        this.logger.write('Click on lnkGiftCards.');
        await this._locators.headerMenu.lnkGiftCards.click();
    }

    /**
     * Hover over the Computers link.
     */
    public async hoverOverComputers(): Promise<void>
    {
        this.logger.write('Hover over the Computers link.');
        await this._locators.headerMenu.lnkComputers.hover();
    }

    /**
     * Clicks the Desktops link.
     */
    public async clickDesktops(): Promise<void>
    {
        this.logger.write('Click on lnkDesktops.');
        await this._locators.headerMenu.computersSubMenu.lnkDesktops.click();
    }

    /**
     * Clicks the Notebooks link.
     */
    public async clickNotebooks(): Promise<void>
    {
        this.logger.write('Click on lnkNotebooks.');
        await this._locators.headerMenu.computersSubMenu.lnkNotebooks.click();
    }

    /**
     * Clicks the Accessories link.
     */
    public async clickAccessories(): Promise<void>
    {
        this.logger.write('Click on lnkAccessories.');
        await this._locators.headerMenu.computersSubMenu.lnkAccessories.click();
    }

    /**
     * Hover over the Electronics link.
     */
    public async hoverOverElectronics(): Promise<void>
    {
        this.logger.write('Hover over the Electronics link.');
        await this._locators.headerMenu.lnkElectronics.hover();
    }

    /**
     * Clicks the Camera & Photo link.
     */
    public async clickCameraPhoto(): Promise<void>
    {
        this.logger.write('Click on lnkCameraPhoto.');
        await this._locators.headerMenu.electronics.lnkCameraPhoto.click();
    }

    /**
     * Clicks the Cell Phones link.
     */
    public async clickCellPhones(): Promise<void>
    {
        this.logger.write('Click on lnkCellPhones.');
        await this._locators.headerMenu.electronics.lnkCellPhones.click();
    }

    // #endregion

    // #region Assertions

    /**
     * Verifies that the current logged in user has the specified email address.
     * 
     * @param expectedMessage The expected current user email address.
     */
    public async assertCurrentUser(expectedCurrentUserEmail: string): Promise<void>
    {
        if (expectedCurrentUserEmail)
        {
            this.logger.write(`Verify that the result message on the register result view contains text "${expectedCurrentUserEmail}".`);
            await expect(this._locators.header.headerLinks.lnkCurrentUser).toContainText(expectedCurrentUserEmail);
        }
        else
        {
            this.logger.write(`Verify that the result message on the register result view has text "${expectedCurrentUserEmail}".`);
            await expect(this._locators.header.headerLinks.lnkCurrentUser).toHaveText(expectedCurrentUserEmail);
        }
    }

    // #endregion

    // #endregion
}