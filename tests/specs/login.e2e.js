const LoginPage = require('../pageobjects/login.page');
const assert = require('assert');

describe('Login', () => {
  it('debería tocar Continuar (si está), loguear y mostrar Home', async () => {
    const USER = process.env.QA_USER || 'usuario.qa@dummy.com';
    const PASS = process.env.QA_PASS || 'Passw0rd!';

    await LoginPage.login(USER, PASS);

    const homeMarker = await $('android=new UiSelector().textContains("Elige o busca una sucursal")');
    await homeMarker.waitForDisplayed({ timeout: 20000 });
    assert.ok(await homeMarker.isDisplayed(), 'No se mostró el Home tras login');
  });
});
