import { devices, PlaywrightTestConfig } from "@playwright/test";
const apiTestConfig: PlaywrightTestConfig = {
    retries: 0,
    timeout : 900000,
    testDir: 'tests',
    workers: 5,
    reporter : 
    [
        ["line"],
        ['html'],['allure-playwright',{outputFolder: 'results/test-results/api-allure-results'}],
    ],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace : 'retain-on-failure',
    baseURL : 'https://bookcart.azurewebsites.net' //this url will be used for api testing

  },
  projects: [
      {
       name : 'api_test',
       testMatch : ['apiTest.ts'],
      }
  ]
};
export default apiTestConfig;