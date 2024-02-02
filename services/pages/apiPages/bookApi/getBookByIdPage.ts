//import { expect, request, test } from "@playwright/test";
import test, { APIRequestContext, expect, request } from "@playwright/test";
import Params, { GlobalConst as gc } from "../../../../utils/params";
import APIendpoints, { API_ENDPOINTS } from "../../../../config/endpoint.config";
import bookIds from "../../../../data/apiData/bookApiData/bookID.json";

export class GetBookByIdPage {
 
    private param: Params;
    
    constructor(param: Params) {
        this.param = param
    }
    // hiting get user api by id and returning response
    async getBookById(request, baseApiURL) {
        const response = await request.get(baseApiURL + API_ENDPOINTS.getBookById + bookIds.bookId);
        return response;
    }
}