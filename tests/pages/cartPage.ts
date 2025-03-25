import { Page } from "@playwright/test";

export class CartPage {
    page: Page;
    constructor(page:Page) {
        this.page = page;
    }
    async verifyAlert() {
        // await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        const toast = await this.page.locator("//div[@class='toast-body']").isVisible();
        return toast;
    }
    async getCartProductName() {
        const name = await this.page.locator("//table[@class='table']//a").nth(1).textContent();
        return name;
    }
    async removeProduct() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByText(' Edit cart').click();
        await this.page.waitForLoadState('networkidle');
        try {
            const products = await this.page.$$("//div[@class='input-group flex-nowrap']//button[2]");
            for (let i = 0; i < products.length; i++) {
                await this.page.locator("//div[@class='input-group flex-nowrap']//button[2]").nth(0).click();
            }
        }
        catch (error) {
            console.log("no product in the cart");    
            return;
        }
        await this.page.waitForTimeout(2000);
        const text = await this.page.locator("//div[@id='content']/p").textContent();
        return text;
    }
}