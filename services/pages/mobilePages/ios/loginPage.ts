class LoginPage {

    // Element locator for Email Textbox
    get inputEmail() {
        return $('~input-email');
    }

    // Element locator for Password Textbox
    get inputPassword() {
        return $('~input-password');
    }

    // Element locator for Login button
    get loginBtn() {
        return $('//XCUIElementTypeStaticText[@name="LOGIN"]');
    }

    // Element locator for Ok button
    get OKbtn() {
        return $('~OK');
    }

    // Element locator for Alert Title
    get AlertTitle() {
        return $('//XCUIElementTypeStaticText[@name="Success"]');
    }

    // Element locator for Success Message
    get SuccessMessage() {
        return $('//XCUIElementTypeStaticText[@name="You are logged in!"]');
    }

    //Element loctator for clicking out the password field
    get biometricsTextMessage() {
        return $('//XCUIElementTypeStaticText[contains(@name, "FingerPrint")]');
    }
    // Method to perform login operation on the App
    async login(emailId: string, password: string) {
        await this.inputEmail.setValue(emailId);
        await this.inputPassword.setValue(password);
        await this.loginBtn.click();
    }

    // Method to get Success Message Title
    async successMessageTitle(): Promise<string> {
        return (await (this.AlertTitle)).getText();
    }

    // Method to get Success Message
    async successMessage(): Promise<string> {
        return (await (this.SuccessMessage)).getText();
    }

    // Method to Close Login mssg Pop up
    async closePopup() {
        await this.OKbtn.click();
    }

    // Method to hide the keyboard
    async hideKeyboard() {
        await this.biometricsTextMessage.click();
    }
}

export default new LoginPage();