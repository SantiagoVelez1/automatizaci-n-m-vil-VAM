class HomePage {
  // ======= Modal sucursal =======
  get modalTituloSucursal() {
    return $('android=new UiSelector().textContains("Elige o busca una sucursal")');
  }
  get modalInputBuscar() {
    return $('android=new UiSelector().className("android.widget.EditText").textContains("Buscar")');
  }
  sucursalItem(nombre) {
    return $(`android=new UiSelector().classNameMatches(".*TextView").textContains("${nombre}")`);
  }

  async selectBranchMandatory(nombreSucursal) {
    const visible = await this.modalTituloSucursal.waitForDisplayed({ timeout: 20000 });
    if (!visible) throw new Error('El modal de sucursal NO apareció tras el login.');

    try {
      if (await this.modalInputBuscar.isExisting()) {
        await this.modalInputBuscar.setValue(nombreSucursal);
        await driver.pause(250);
      }
    } catch {}
    const item = this.sucursalItem(nombreSucursal);
    await item.waitForDisplayed({ timeout: 15000 });
    await item.click();
  }

  async waitModalClosed() {
    await browser.waitUntil(
      async () => !(await this.modalTituloSucursal.isDisplayed().catch(() => false)),
      { timeout: 15000, timeoutMsg: 'El modal de sucursal no se cerró.' }
    );
  }

  async assertModalNotPresent() {
    const present = await this.modalTituloSucursal.isExisting();
    if (present) throw new Error('El modal de sucursal reapareció indebidamente.');
  }

  // ======= Home =======
  get homeTopBar() {
    return $('android=new UiSelector().textContains("Entorno:")');
  }
  get lblSucursalActual() {
    return $('android=new UiSelector().classNameMatches(".*TextView").textContains("Cochez")');
  }
  categoria(nombre) {
    return $(`android=new UiSelector().classNameMatches(".*TextView").textContains("${nombre}")`);
  }

  async esperarHome() {
    await this.homeTopBar.waitForDisplayed({ timeout: 20000 });
  }

  async verificarSucursalAplicada(nombreEsperado) {
    await this.lblSucursalActual.waitForDisplayed({ timeout: 15000 });
    const t = await this.lblSucursalActual.getText();
    return t.toLowerCase().includes(nombreEsperado.toLowerCase());
  }

  async abrirCategoria(nombreCategoria) {
    const card = this.categoria(nombreCategoria);
    await card.waitForDisplayed({ timeout: 15000 });
    await card.click();
  }
}

module.exports = new HomePage();
