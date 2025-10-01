// config/wdio.android.app.conf.js
const path = require('path');
const { config } = require('./wdio.shared.conf');

config.capabilities = [{
  platformName: 'Android',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
  'appium:automationName': 'UiAutomator2',
  'appium:autoGrantPermissions': true,

  'appium:app': process.env.APK_PATH
    ? path.resolve(process.cwd(), process.env.APK_PATH)
    : path.resolve(process.cwd(), 'apk-QA/app-release-49.apk'),

  // Opcionales de espera al primer launch
  'appium:appWaitActivity': '*',
  'appium:appWaitForLaunch': true,
  'appium:appWaitDuration': 20000,

  'appium:noReset': false
}];

module.exports = { config };
