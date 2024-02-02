import test, { Browser, chromium, expect, Page } from "@playwright/test";
import { loginUi } from "../../services/fixtures/uiFixture/loginUi.fixtures";
import Params, { GlobalConst as gc } from "../../utils/params";
import dataJson from "../../data/uiData/demoData.json";


const params = new Params();

loginUi.describe.parallel('Bookcart Page Load', () => {

  //This method will launch browser before every test case
  loginUi.beforeEach(async ({ page }, testInfo) => {
    await page.goto(gc.URL, { waitUntil: "load", timeout: 120000 });
  });

  //This method will be taking screenshot and close browser after every test case
  loginUi.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({
      path:
        "screenshots/" + testInfo.project.name + "/" + testInfo.title + ".png",
      fullPage: true,
    });
    await page.close();
  });

  //Test case for successful login bookcart website
  loginUi('TC01_Verify user is able to successfully login to bookcart website', async ({ loginPage }, testInfo) => {
    let testID = await testInfo.title.split('_')[0]
    let dataSet = dataJson[testID];

    await loginUi.step("Click Login link", async () => {
      await loginPage.clickOnLoginLink();
    });

    await loginUi.step("Enter user name", async () => {
      await loginPage.inputUserName(dataSet.userName);
    });

    await loginUi.step("Enter password", async () => {
      await loginPage.inputPassword(dataSet.password);
      await loginPage.clickLoginButton();
    });

    await loginUi.step("Verify homePage", async () => {
      await loginPage.verifyHomePage();
    });
  })
})
