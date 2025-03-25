import { Page } from "@playwright/test";

export class Register {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async enterFirstName(fName: string) {
        await this.page.fill('#input-firstname', fName);
    }
    async enterLastName(lName: string) {
        await this.page.fill('#input-lastname', lName);
    }
    async enterEmail(email: string) {
        await this.page.fill('#input-email', email);
    }
    async enterPhoneNumber(phoneNumber: string) {
        await this.page.fill('#input-telephone', phoneNumber);
    }
    async enterPassword(password: string) {
        await this.page.fill('#input-password', password);
    }
    async confirmPassword(confirmPassword: string) {
        await this.page.fill("#input-confirm", confirmPassword);
    }
    async clickOnCheckbox() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByText('I have read and agree to the ').scrollIntoViewIfNeeded();
        await this.page.getByText('I have read and agree to the ').click();
    }
    async clickOnContinue() {
        await this.page.waitForLoadState('networkidle');
        await this.page.click("//input[@value='Continue']");
    }
    async returnText() {
        await this.page.waitForLoadState('domcontentloaded');
        const text = await this.page.locator("//h1[@class='page-title my-3']").textContent();
        return text;
    }
}