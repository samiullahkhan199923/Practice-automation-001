import { test, expect } from '@playwright/test';
import { Register } from '../pages/registerPage';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CartPage } from '../pages/cartPage';

const email = 'testemids003@gmail.com';
const password = 'Passw0rd!1';
test.skip('Register new user_01', async ({ page }) => {
    const register = new Register(page);
    await page.goto('index.php?route=account/register');
    await page.waitForLoadState('domcontentloaded');
    await register.enterFirstName('s');
    await register.enterLastName('khan');
    await register.enterEmail(email);
    await register.enterPhoneNumber('1234567890');
    await register.enterPassword(password);
    await register.confirmPassword(password);
    await register.clickOnCheckbox();
    await register.clickOnContinue();
    expect(await register.returnText()).toBe(' Your Account Has Been Created!');
})
test('login_02', async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('index.php?route=account/login');
    await page.waitForLoadState('domcontentloaded');
    await login.enterEmail(email);
    await login.enterPassword(password);
    await login.clickOnLogin();
    expect(await login.getTitleName()).toBe('My Account')
})
test('add the product to cart_03', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const sp = new CartPage(page);
    await page.goto('index.php?route=account/login');
    await page.waitForLoadState('domcontentloaded');
    await login.login(email, password);
    await login.clickOnLogin();
    await home.searchProduct('apple');
    await home.selectProduct();
    const name1 = await home.getProductName();
    await home.addProductToCart();
    // console.log("========="+await sp.verifyAlert()+"=====");
    expect.soft(await sp.verifyAlert()).toBeTruthy();
    await home.clickOnAddToCartButton();
    expect(await sp.getCartProductName()).toBe(name1);
})
test('Remove products from the cart_04', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const sp = new CartPage(page);
    await page.goto('index.php?route=account/login');
    await page.waitForLoadState('domcontentloaded');
    await login.login(email, password);
    await login.clickOnLogin();
    await home.clickOnAddToCartButton();
    const text = await sp.removeProduct();
    expect(text).toBe('Your shopping cart is empty!');
})
test('Logout_05', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    await page.goto('index.php?route=account/login');
    await page.waitForLoadState('domcontentloaded');
    await login.login(email, password);
    await login.clickOnLogin();
    const text = await home.clickOnLogout();
    expect(text).toBe(' Account Logout');
})
test.only('editFirstName', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    await page.goto('index.php?route=account/login');
    await page.waitForLoadState('domcontentloaded');
    await login.login(email, password);
    await login.clickOnLogin();
    const text1 = await home.editInfo();
    expect(text1).toMatch(' Success: Your account has been successfully updated.');
})
