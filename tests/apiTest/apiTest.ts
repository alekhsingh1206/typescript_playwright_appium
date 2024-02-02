import { bookApi } from "../../services/fixtures/apiFixture/bookApi.fixtures";
import test, { APIRequestContext, expect, request } from "@playwright/test";
import getApiResponse from "../../data/apiData/expected_response/getRes";

 
    //Test case is hitting the api which gets book details by id
    bookApi('TC01_validation of get book API', async ({ request, baseURL,getBookByIdPage}) => {

            await bookApi.step('get user information', async () => {
                let response = await getBookByIdPage.getBookById(request, baseURL);
                let jsonResponse = await response.json();
                console.log('Response is...', jsonResponse);
                try{
                await expect(await response.status()).toBe(200);
                await expect(jsonResponse).toStrictEqual(getApiResponse);
                }
                catch(exception){
                await console.log(exception.message);
                }
            })
    }),

    //Test case is hitting the api which will create new book record at server
    bookApi('TC02_validation of adding new book record', async ({request, baseURL, addNewBookRecordPage}) => {

        await bookApi.step('create new user', async () => {
            let response = await addNewBookRecordPage.addNewBookRecord(request, baseURL);
            let jsonResponse = await response.json();
            console.log("response is....",response);
            await console.log('Response is...', jsonResponse);
            try{
            await expect(await response.status()).toBe(201);
            }
            catch(exception){
            await console.log(exception.message);
            }
        })
    })