import { test, expect, chromium } from '@playwright/test';

test.describe("lamdatest scenarios", () => {
    test("login spec", async () => {
        const chrome = await chromium.launch();
        const context = await chrome.newContext();
        const page = await context.newPage();
        await page.goto('https://ecommerce-playground.lambdatest.io/');
        await page.getByText(' My account').last().hover();
        await page.getByText('Login').first().click();
        await page.waitForLoadState("domcontentloaded");
        await page.locator('#input-email').fill('testemids007@gmail.com');
        await page.locator('#input-password').fill('Passw0rd!1');
        await page.click("//input[@type='submit']");
        await page.waitForLoadState("domcontentloaded");
        expect(await page.locator("#content")).toBeVisible();
        // await page.pause();
    })
    test.only('searching the product', async () => {
        const chrome = await chromium.launch();
        const context = await chrome.newContext();
        const page = await context.newPage();
        await page.goto('https://ecommerce-playground.lambdatest.io/');
        await page.getByText(' My account').last().hover();
        await page.getByText('Login').first().click();
        await page.waitForLoadState("domcontentloaded");
        await page.locator('#input-email').fill('testemids007@gmail.com');
        await page.locator('#input-password').fill('Passw0rd!1');
        await page.click("//input[@type='submit']");
        await page.waitForLoadState("domcontentloaded");
        expect(await page.locator("#content")).toBeVisible();
        const pName = "iphone";
        await page.getByPlaceholder('Search For Products').first().fill('iphone');
        await page.locator("//li[@class='product-thumb px-3 py-2 m-0 image-left']").first().click();
        // await page.pause();
        await page.getByText('Search').click();
        await page.waitForLoadState('domcontentloaded');
        const count = await page.$$("//div[@class='product-thumb']");
        console.log(count.length + "========")
        let name, price;
        for (let i = 0; i < count.length; i++) {
            name = await page.locator("//div[@class='product-thumb']/div[2]/h4/a").nth(i).textContent();
            price = await page.locator("//div[@class='product-thumb']/div[2]/div/span").nth(i).textContent();
            console.log(name + " =" + price);

        }
        await page.locator("//div[@class='product-thumb']").first().click()
        await page.waitForLoadState('domcontentloaded');
        await page.pause();
        const stock = await page.locator("//div[@id='entry_216826']/ul/li[3]/span[2]").textContent();
        console.log("Product stock = " + stock);
        await page.pause();
        expect(await page.title()).toBe("iPhone");
    })
})