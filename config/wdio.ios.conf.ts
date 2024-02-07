import { join } from 'path';
import config from '../config/wdio.shared.local.conf';

// ============
// Specs
// ============
config.specs = [
    '../tests/specs/ios/*.ts',
];

// ============
// Capabilities
// ============
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'ios',
        maxInstances: 1,
        'appium:deviceName': 'iPhone 15 Pro',
        'appium:platformVersion': '17.0',
        'appium:automationName': 'XCUITest',
        // The path to the app
        'appium:app': join(process.cwd(), './apps/wdiodemoapp.app'),
        // @ts-ignore
        'appium:bundleId': 'org.reactjs.native.example.wdiodemoapp',
        'appium:xcodeOrgId':'Alekhya Mamilla (Personal Team)',
        'appium:xcodeSigningId':'Apple Development',
        'appium:noReset': false,
        'appium:newCommandTimeout': 240,
    },
];

exports.config = config;