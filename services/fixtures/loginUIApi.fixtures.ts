import {Page, test} from "@playwright/test";
import { LoginPage } from "../pages/uiPages/loginLogoutUI/loginPage";
import { PLaywrightUtil } from "../../utils/uiUtils";
import Params from "../../utils/params";
import { GetBookByIdPage } from "../pages/apiPages/bookApi/getBookByIdPage";
import { AddNewBookRecordPage } from "../pages/apiPages/bookApi/addNewBookRecordPage";


type pageInitiator = {
    loginPage : LoginPage;
    uiUtils : PLaywrightUtil;
    getBookByIdPage: GetBookByIdPage;
    addNewBookRecordPage: AddNewBookRecordPage;
    param: Params;
}

const environment =  test.extend<pageInitiator>({
    
    uiUtils : async({page, browserName}, use) => {
        await use(new PLaywrightUtil(page,browserName));
    },
 
    loginPage : async({uiUtils, page}, use) => {
        await use(new LoginPage(uiUtils, page));
    },

    param: async ({ }, use) => {
        await use(new Params()); 
    },

    getBookByIdPage: async ({ param }, use) => {
        await use(new GetBookByIdPage(param));
    },

    addNewBookRecordPage: async ({ param }, use) => {
        await use(new AddNewBookRecordPage(param));
    }
});

export const loginUiApi = environment;