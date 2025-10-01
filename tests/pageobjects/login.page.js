// tests/pageobjects/login.page.js
class LoginPage {

  get btnContinuar() {
    return $('android=new UiSelector().textContains("Continuar")');
    
  }

  // Campos de login
  get inputUsuario()  { return $('//android.widget.EditText[@text="Correo electrónico"]'); }
  get inputPassword() { return $('//android.widget.EditText[@text="Contraseña"]'); }
  get btnIngresar()   { return $('android=new UiSelector().textContains("Continuar")'); }

  // 👉 Igual que al inicio, pero ahora con el paso previo "Continuar"
  async login(usuario, pass) {
    // 1) Si aparece "Continuar", tócalo y espera la siguiente vista
    try {
      const exists = await this.btnContinuar.isExisting();
      if (exists) {
        await this.btnContinuar.waitForDisplayed({ timeout: 10000 });
        await this.btnContinuar.click();
      }
    } catch (_) { /* si no está, seguimos */ }

    // 2) Completar credenciales
    await this.inputUsuario.waitForDisplayed({ timeout: 15000 });
    await this.inputUsuario.setValue(usuario);

    await this.inputPassword.waitForDisplayed({ timeout: 15000 });
    await this.inputPassword.setValue(pass);

    try { await driver.hideKeyboard(); } catch (_) {}

    // 3) Enviar
    await this.btnIngresar.waitForDisplayed({ timeout: 15000 });
    await this.btnIngresar.click();
  }
}

module.exports = new LoginPage();
