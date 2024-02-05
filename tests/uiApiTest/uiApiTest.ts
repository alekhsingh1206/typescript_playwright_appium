import test, { Browser, chromium, expect, Page } from "@playwright/test";
import { loginUiApi } from "../../services/fixtures/loginUIApi.fixtures";
import Params, { GlobalConst as gc } from "../../utils/params";
import dataJson from "../../data/uiData/demoData.json";
import getApiResponse from "../../data/apiData/expected_response/getRes";


const params = new Params();

loginUiApi.describe.parallel('Bookcart Page Load', () => {

  //This method will launch browser before every test case
  loginUiApi.beforeEach(async ({ page }, testInfo) => {
    await page.goto(gc.URL, { waitUntil: "load", timeout: 120000 });
  });

  //This method will be taking screenshot and close browser after every test case
  loginUiApi.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({
      path:
        "screenshots/" + testInfo.project.name + "/" + testInfo.title + ".png",
      fullPage: true,
    });
    await page.close();
  });

  //Test case for successful login bookcart website
  loginUiApi('TC01_Verify user is able to successfully login to bookcart website and validation of get book details API', async ({ loginPage, request, getBookByIdPage}, testInfo) => {
    let testID = await testInfo.title.split('_')[0]
    let dataSet = dataJson[testID];

    await loginUiApi.step("Click Login link", async () => {
      await loginPage.clickOnLoginLink();
    });

    await loginUiApi.step("Enter user name", async () => {
      await loginPage.inputUserName(dataSet.userName);
    });

    await loginUiApi.step("Enter password", async () => {
      await loginPage.inputPassword(dataSet.password);
      await loginPage.clickLoginButton();
    });

    await loginUiApi.step("Verify homePage", async () => {
      await loginPage.verifyHomePage();
    });

    await loginUiApi.step("Verify get book details by id API", async () => {
      let response;
      let jsonResponse;
      try{
          response = await getBookByIdPage.getBookById(request, gc.URL);
          jsonResponse = await response.json();
          console.log('Response is...', jsonResponse);
      }
      catch(exception){
        await console.log(exception.message);
      }
       
      await expect(await response.status()).toBe(200);
      await expect(jsonResponse).toStrictEqual(getApiResponse);     
    });
  })
})
