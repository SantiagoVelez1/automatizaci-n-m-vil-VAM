// config/wdio.shared.conf.js
const path = require('path');
require('dotenv').config();

exports.config = {
  runner: 'local',
  port: process.env.APPIUM_PORT ? parseInt(process.env.APPIUM_PORT, 10) : 4723,

  // Rutas absolutas desde la raíz del proyecto
  specs: [ path.resolve(process.cwd(), 'tests/specs/**/*.js') ],
  exclude: [],

  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  // Reintentos de spec (útiles en mobile)
  specFileRetries: 1,
  specFileRetriesDelay: 0,
  specFileRetriesDeferred: true,

  services: ['appium'],

  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],

  mochaOpts: { ui: 'bdd', timeout: 120000 },

  // Evidencias al fallar
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      try {
        const safe = test.title.replace(/[^\w\d-_]+/g, '_');
        await driver.saveScreenshot(`./reports/screenshots/${Date.now()}-${safe}.png`);
      } catch {}
    }
  },
};
