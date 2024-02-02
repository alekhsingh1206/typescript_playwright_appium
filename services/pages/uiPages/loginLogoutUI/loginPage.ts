import { chromium, Browser, Page, expect} from "@playwright/test"
import { PLaywrightUtil } from "../../../../utils/uiUtils"

   export class LoginPage {
    private page: Page;
  
    constructor(uiUtils: PLaywrightUtil, page: Page) {
        this.page = page;
    }

    //locators for login page
    public appLoginLink = "//span[text()='Login']";
    public loginUserName = "input[formcontrolname='username']";
    public loginPassword = "input[formcontrolname='password']";
    public loginButton = "button[color='primary']";
    public loggedInUserName = "//span[text()=' testautomation ']";

    //Function to click on login link
    async clickOnLoginLink() {
        await this.page.locator(this.appLoginLink).click();
        await this.page.waitForTimeout(1000);
    }

    //Function to enter user name
    async inputUserName(username : any) {
        await this.page.locator(this.loginUserName).fill(username);
        await this.page.waitForTimeout(1000);
    }

    //Function to enter password
    async inputPassword(password : any) {
        await this.page.locator(this.loginPassword).fill(password);
        await this.page.waitForTimeout(1000);
    }

    //Function to click on login button
    async clickLoginButton() {
        await this.page.locator(this.loginButton).click();
        await this.page.waitForTimeout(3000);
    }

    //Function to verify successful login home page
    async verifyHomePage() {
        await this.page.waitForSelector(this.loggedInUserName, {timeout: 5000,});
        await expect(await this.page.isVisible(this.loggedInUserName)).toBeTruthy();
        console.log("login successful");
    }
}