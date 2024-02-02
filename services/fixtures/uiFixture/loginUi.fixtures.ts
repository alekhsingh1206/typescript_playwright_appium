import {Page, test} from "@playwright/test";
import { LoginPage } from "../../pages/uiPages/loginLogoutUI/loginPage";
import { PLaywrightUtil } from "../../../utils/uiUtils"

type pageInitiator = {
    loginPage : LoginPage;
    uiUtils : PLaywrightUtil;
}

const environment =  test.extend<pageInitiator>({
    
    uiUtils : async({page, browserName}, use) => {
        await use(new PLaywrightUtil(page,browserName));
    },
 
    loginPage : async({uiUtils, page}, use) => {
        await use(new LoginPage(uiUtils, page));
    }
});

export const loginUi = environment;