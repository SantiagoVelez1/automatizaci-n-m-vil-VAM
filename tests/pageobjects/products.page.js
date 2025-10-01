// tests/pageobjects/products.page.js
class ProductsPage {
  // Marcador de pantalla Productos (título, barra, etc.)
  get headerProductos() {
    return $('android=new UiSelector().textContains("Productos")');
  }

  // ⚠️ OJO: sin [1]. Con $$ queremos TODAS las coincidencias.
  get listaAgregarButtons() {
    return $$('//android.widget.TextView[@text="Agregar"]');
  }

  // Spinner / loaders (ajústalo si conoces el id real)
  get posiblesLoaders() {
    return $$('android=new UiSelector().classNameMatches(".*ProgressBar|.*Spinner")');
  }

  async esperarPantalla() {
    await this.headerProductos.waitForDisplayed({ timeout: 20000 });
  }

  async hayProductosVisibles() {
    const botones = await this.listaAgregarButtons;
    return botones.length > 0;
  }

  /**
   * Espera a que haya al menos `min` productos visibles.
   * Hace scroll suave por si hay lazy-load.
   */
  async esperarProductosVisibles({ min = 1, timeout = 30000 } = {}) {
    const fin = Date.now() + timeout;

    // Asegura que estamos en la pantalla "Productos"
    await this.esperarPantalla();

    while (Date.now() < fin) {
      // Espera a que terminen loaders si los hay
      await browser.pause(300);

      const hay = await this.hayProductosVisibles();
      if (hay) {
        const botones = await this.listaAgregarButtons;
        if (botones.length >= min) return true;
      }

      // Intenta scroll si la lista es lazy
      await this.scrollForwardSuave();
    }

    return false;
  }

  /**
   * Scroll con UiScrollable (robusto en Android).
   * Si no hay contenedor scrollable, no falla la prueba.
   */
  async scrollForwardSuave() {
    try {
      await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()');
      await browser.pause(300);
    } catch {
      // No scrollable visible; no hacemos nada
    }
  }
}

module.exports = new ProductsPage();
