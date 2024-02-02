


export default class Params {
  public globalError: string = 'NA';
  public globalStatus = 'PASSED';
  public resultPath = './api-results/api-results.html';
  public resultStringAfterEachFailure : string = '';
  public failureFlag : boolean = true;
  public retryCounter = 0 ;


}

export enum GlobalConst {
  URL = 'https://bookcart.azurewebsites.net/'
}
