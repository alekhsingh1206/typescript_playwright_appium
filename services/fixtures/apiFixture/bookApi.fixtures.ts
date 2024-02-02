import { test } from "@playwright/test"
import { GetBookByIdPage } from "../../pages/apiPages/bookApi/getBookByIdPage";
import { AddNewBookRecordPage } from "../../pages/apiPages/bookApi/addNewBookRecordPage";
import Params from "../../../utils/params";
 

type pageInitiator = {
 
    getBookByIdPage: GetBookByIdPage;
    addNewBookRecordPage: AddNewBookRecordPage;
    param: Params;
}
 
const environment = test.extend<pageInitiator>({
 
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
 
export const bookApi = environment;