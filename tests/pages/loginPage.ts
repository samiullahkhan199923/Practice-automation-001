import { Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async enterEmail(email: string) {
        await this.page.fill('#input-email', email);
    }
    async enterPassword(password: string) {
        await this.page.fill('#input-password', password);
    }
    async clickOnLogin() {
        await this.page.waitForLoadState('networkidle');
        await this.page.click("//input[@value='Login']");
    }
    async getTitleName() {
        await this.page.waitForLoadState('networkidle');
        const title = await this.page.title();
        return title;
    }
    async login(email: string, password: string) {
        await this.page.fill('#input-email', email);
        await this.page.fill('#input-password', password);
    }
}