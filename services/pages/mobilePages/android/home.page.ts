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
    const selector =
      'new UiSelector().text("WEBDRIVER").className("android.widget.TextView")';
    const title = await $(`android=${selector}`);
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
