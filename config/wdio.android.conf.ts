import { join } from 'path';
import config from '../config/wdio.shared.local.conf';

// ============
// Specs
// ============
config.specs = [
    '../tests/specs/android/*.ts',
];

// ============
// Capabilities
// ============
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'Android',
        maxInstances: 1,
        'appium:deviceName': 'Pixel 6 API 29',
        'appium:platformVersion': '10.0',
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'UiAutomator2',
        // The path to the app
        'appium:app': join(process.cwd(), './/apps//android.demo_app.apk'),
        // @ts-ignore
        'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
        'appium:noReset': false,
        'appium:newCommandTimeout': 240,
    },
];

exports.config= config;