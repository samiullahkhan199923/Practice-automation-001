import { expect, Page } from "@playwright/test";

export class HomePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async searchProduct(name: string) {
        await this.page.getByPlaceholder('Search For Products').nth(0).fill(name);
        await this.page.getByText('Search').click();
    }
    async selectProduct() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator("//div[@class='image']").nth(0).hover();
    }
    async getProductName() {
        const name = await this.page.locator("//h4[@class='title']").nth(0).textContent();
        return name;
    }
    async addProductToCart() {
        await this.page.locator("//button[@title='Add to Cart']").nth(0).click();
    }
    async clickOnAddToCartButton() {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("//div[@class='cart-icon']").nth(0).click();
    }
    async clickOnLogout() {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("//a[@data-toggle='dropdown']").last().hover();
        await this.page.locator("//span[normalize-space()='Logout']").click();
        await this.page.waitForTimeout(2000);
        return await this.page.locator("//h1[@class='page-title my-3']").textContent();
    }
    async editInfo() {
        await this.page.getByText(' Edit your account information').click();
        await this.page.waitForLoadState('load');
        const textValue1 = await this.page.getAttribute('#input-firstname', 'value');
        // console.log("Text field value Before: " + textValue1);
        await this.page.getByPlaceholder('First Name').fill(textValue1 + "updated");
        const textValue2 = await this.page.getAttribute('#input-firstname', 'value');
        // console.log("after value got updated : " + textValue2);
        await this.page.locator("input[type='submit']").click();
        await this.page.waitForSelector("//div[@class='alert alert-success alert-dismissible']");
        const loc1 = await this.page.locator("//div[@class='alert alert-success alert-dismissible']").textContent();
        return loc1;
    }
}