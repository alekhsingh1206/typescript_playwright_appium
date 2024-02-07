import LoginPage from "../../../services/pages/mobilePages/android/login.page";
import HomePage from "../../../services/pages/mobilePages/android/home.page";
import SwipePage from "../../../services/pages/mobilePages/android/swipe.page";
import data from "../../../data/mobileData/loginData.json";

describe("Test to check text on Homepage, check successful login along with swipe operation", () => {
  it("verify the title on home page", async () => {
    expect(await HomePage.getTitle()).toHaveTextContaining("WEBDRIVER");
  });

  it("verify login into the app is successful", async () => {
      await HomePage.openLoginScreen();
      await LoginPage.login(data.email, data.password);
      expect(await LoginPage.successMessageTitle()).toEqual("Success");
      expect(await LoginPage.successMessage()).toEqual("You are logged in!");
      await LoginPage.closePopup(); 
  });

  it("verify user is able to swipe based on element displayed", async () => {
    await HomePage.openSwipeMenu();
    await SwipePage.checkifCommunityTextIsDisplayed();
    expect(await SwipePage.greatCommunityText()).toEqual("GREAT COMMUNITY");
  });
});
