 import { ElementHandle, Locator, Page } from "@playwright/test";
 import Params, { GlobalConst as gc } from "./params";

 export class PLaywrightUtil {
    private page : Page;
    private browserName : string;
    private pages : Page[] = [];
    private previousElement : SVGElement | HTMLElement;
    
    constructor(page : Page, browserName : string) {
        this.page = page;
        this.browserName = browserName;
        this.pages.push(page);
    }

    async goToURL(url : string) {
        await this.page.goto(url, {waitUntil : "load", timeout : 0});
    }

    async beforeEach(page) {
        await page.goto(gc.URL, { waitUntil: "load", timeout: 120000 });
      };

    async findElements(selector : string) : Promise<ElementHandle<SVGElement | HTMLElement>[]> {
        let elements = await this.page.$$(selector);
        if(elements != undefined && elements != null){
            return elements;
        }

        return elements;
    }

    async findElement(selector : string) : Promise<Locator | null> {
        let element = await this.page.locator(selector);
        if(element != null && element != undefined){
            return element.first();
        }

        return null;
    }

    async fillTextOrFail(selector : string, inputText : any){
        await this.waitForSelectorOrFail(selector);
        await this.page.fill(selector, inputText.toString());
        await this.waitFor(1000);
    }

    async clickButtonOrFail(selector : string)  {
        await this.waitForSelectorOrFail(selector);
     // await this.page.waitForTimeout(5000); //commenting out because of wait, "May I Help you" element will come and overlap accept button
        await this.page.click(selector, {timeout : 35000});
        //await this.page.waitForLoadState('networkidle', {timeout : 120000});
        
    }

    async waitForSelectorOrFail(selector : string, timeout : number = 30000) {
        return await this.page.waitForSelector(selector, {timeout : timeout});
    }

    async waitForSelectorToDisappear(selector : string, timeout : number = 30000){
        
        let currentTime = 0;
        let isElementPresent = true;
        while(await this.isVisible(selector)){
            currentTime = currentTime + 500;
            await this.waitFor(500);
            if(currentTime == timeout){
                break;
            }
        }

        if(!await this.isVisible(selector)){
            isElementPresent = false; 
        }

        return isElementPresent;
    }

    async waitFor(time : number) {
        await this.page.waitForTimeout(time);
    }

    async waitForPageToLoad() {
        await this.page.waitForLoadState("load", {timeout : 30000});
        await this.page.waitForLoadState("domcontentloaded", {timeout : 30000});
        await this.page.waitForLoadState("networkidle", {timeout : 30000});
    }

    async isVisible(selector : string) : Promise<Boolean> {
        return await this.page.isVisible(selector, {timeout : 30000});
    }

    async isEnabled(selector: string) : Promise<Boolean> {
        return await this.page.isEnabled(selector);
    }

    async checkElementPresent(selector : string) : Promise<Boolean>{
        await this.waitFor(5000);
        let condition =  await this.isVisible(selector);
        return condition;
    }

    async checkElementClickbality(selector : string) : Promise<Boolean>{
        let condition =  await this.isVisible(selector) && await this.isEnabled(selector);
        return condition;
    }

    async keyPress(keyValue : string) {
        await this.page.keyboard.press(keyValue);
    }

    async getText(selector : string) : Promise<string | null>{
        let element = await this.findElement(selector);
        try{
            if(element != null && element != undefined){
                return await element.innerText({timeout : 30000});
            } 
        }
        catch(e){
            //element text couldnt be grabbed in the set time. try other way
            console.log("Waited for 30s to get the text.Trying one more time...")
            if(element != null && element != undefined){
                return await element.textContent({timeout : 30000});
            } 

        }
        

        return null;
    }

    async findInnerElement(selector1 : string, selector2 : string) : Promise<Locator | null> {

        let secondElement = null;
        let firstElement = await this.findElement(selector1);
        if(firstElement != null && firstElement != undefined){
            let secondElement = await firstElement.locator(selector2);
            if(secondElement != null && secondElement != undefined){
                return secondElement;
            }
            
        }
        
        return secondElement;
    }

    async getAttributeValue(selector : string, attrib : string) : Promise<string | null > {

        let element = await this.findElement(selector);
        if(element != null){
        let attribValue = await (element).getAttribute(attrib, {timeout : 30000});
        if(attrib != null && attrib != undefined){
            return attribValue
        }}
        return null;
    }

    async getInputElementValue(selector : string){

        return await this.page.$eval(selector, (element : HTMLInputElement) => element.value);
        
    }

    async clearInputElementValue(selector : string){

        return await this.page.$eval(selector, (element : HTMLInputElement) => element.value = "");
        
    }

    async highlightElement(selector : string){
        await this.page.$eval(selector, async (element) => {
            await this.unhighlightLastElement();
            element.style.border = '3px solid red';
            this.previousElement = element;
        })
    }

    async unhighlightLastElement(){

        if(this.previousElement != null && this.previousElement != undefined){
            this.previousElement.style.border = '';
        }

    }

    async fetchRequestResponse(requestURL : string) : Promise<string> {

        try{
            const response  = await this.page.waitForResponse(response => response.url().includes(requestURL), {timeout: 60000});
            const buff = Buffer.from(await response.body());
            return buff.toString();
        }
        catch(e){
            throw Error(`Timed out (60s). Request /.*/${requestURL}/.* didnt trigger, so couldnt fetch response.`)
        }
    }

    async screenShotPage(sysPath : string, isFullPage : boolean) : Promise<Buffer> {

        if(sysPath == "") {
            return this.page.screenshot({fullPage : isFullPage});
        }

        return this.page.screenshot({path : sysPath, fullPage : isFullPage});
    }

    async getPage() : Promise<Page> {
        return this.page;
    }

    async setPage(page : Page){
        this.page = page;
    }

    async getAllPages() : Promise<Page[]> {
        return this.pages;
    }

    async addNewPage(page : Page) {
         this.pages.push(page);
    }
    async getBrowserName() : Promise<string> {
        return this.browserName;
    }

    async  filterJsonWithKeys (pDataQueryJson,pStartsWith) {
        let result = {};
        if (pDataQueryJson) {
          for (let key in pDataQueryJson) {
            if (key.toUpperCase().startsWith(pStartsWith)) {
              result[key] = pDataQueryJson[key];
            }
          }
        }
        return result;
      };
 }