import LoginPage from "../../../services/pages/mobilePages/ios/loginPage";
import HomePage from "../../../services/pages/mobilePages/ios/homePage";
import SwipePage from "../../../services/pages/mobilePages/ios/swipePage";
import data from "../../../data/mobileData/loginData.json";

describe("iOS Mobile automation tests", () => {
  it("should check the title on home page", async () => {
    await driver.pause(3000);
    expect(await HomePage.getTitle()).toHaveText("WEBDRIVER");
  });

  it("should login into the app successfully", async () => {
      await HomePage.openLoginScreen();
      await LoginPage.login(data.email, data.password);
      expect(await LoginPage.successMessageTitle()).toEqual("Success");
      expect(await LoginPage.successMessage()).toEqual("You are logged in!");
      await LoginPage.closePopup();
      await LoginPage.hideKeyboard();
  });

  it("should be able to swipe based on element displayed", async () => {
    await driver.pause(3000);
    await HomePage.openSwipeMenu();
    await SwipePage.fullyOpenSource();
    await SwipePage.greatCommunityText();
    await SwipePage.checkifCommunityTextIsDisplayed();
    expect(await SwipePage.greatCommunityText()).toEqual("GREAT COMMUNITY");
  });
  
});
