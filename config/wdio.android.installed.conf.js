const { config } = require('./wdio.shared.conf');

config.capabilities = [{
  platformName: 'Android',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
  'appium:automationName': 'UiAutomator2',
  'appium:autoGrantPermissions': true,

  'appium:appPackage': process.env.APP_PACKAGE,
  'appium:appActivity': process.env.APP_ACTIVITY,

  'appium:appWaitActivity': '*',
  'appium:appWaitForLaunch': true,
  'appium:appWaitDuration': 20000,

  'appium:noReset': true
}];

module.exports = { config };
