import { devices, PlaywrightTestConfig } from "@playwright/test";
const uiTestConfig: PlaywrightTestConfig = {
    retries: 0,
    timeout : 900000,
    testDir: 'tests',
    workers: 5,
    reporter : 
    [
        ["line"],
        ['json', {  outputFile: 'results/test-results/test-results.json' }],
        ['monocart-reporter', {  
          name: "Bookcart Test Automation",
          outputFile: 'results/test-results/monocart_report.html'
      }] 
    ],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace : 'retain-on-failure',
    
  },
  projects: [
    {
      name: 'chromium',
      testMatch : ['loginTest.ts'],
      use: { ...devices['Desktop Chrome'],
      headless : false,
      screenshot: 'on'},
      
    },
    {
      name: 'firefox',
      testMatch : ['loginTest.ts'],
      use: { ...devices['Desktop Firefox'], headless: true },
    },
     {
       name: 'webkit',
       testMatch : ['loginTest.ts'],
      use: { ...devices['Desktop Safari'] , headless : true },
     },
    {
      name: 'Mobile_Safari',
      testMatch : ['loginTest.ts'],
      use: {
        ...devices['iPhone 12'], headless : true,
      },
    },
    {
      name: 'Mobile_Chrome',
      testMatch : ['loginTest.ts'],
      use: {
        ...devices['Galaxy S9+'], headless : true
      },
    }
  ]
};
export default uiTestConfig;