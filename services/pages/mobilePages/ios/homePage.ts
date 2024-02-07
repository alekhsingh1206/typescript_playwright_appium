class HomePage {

  // Element locator for Swipe element
  get swipeMenu() {
    return $('~Swipe');
  }

  // Element locator for Login button
  get loginMenu() {
      return $("~Login");
    }

  // This method returns the WEBDRIVER text on home page
  async getTitle(): Promise<string> {
    const title = $('//XCUIElementTypeStaticText[@name="WEBDRIVER"]');
    console.log(title.getText);
    return await title.getText();
  }

  // Method to open Login screen
async openLoginScreen(): Promise<void> {
    await this.loginMenu.click();
  }

  // Method to open Swipe Menu
async openSwipeMenu():Promise<void> {
    await this.swipeMenu.click();
  }
}

export default new HomePage();
