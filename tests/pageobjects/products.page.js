// tests/pageobjects/products.page.js
class ProductsPage {
  // marcador de la pantalla Productos
  get headerProductos() {
    return $('android=new UiSelector().textContains("Productos")');
  }

  get listaAgregarButtons() {
    // Muchos cards muestran botón "Agregar" ⇒ podemos contar esos botones
    return $$('(//android.widget.TextView[@text="Agregar"])[1]');
  }

  async esperarPantalla() {
    await this.headerProductos.waitForDisplayed({ timeout: 20000 });
  }

  async hayProductosVisibles() {
    await this.esperarPantalla();
    const agregar = await this.listaAgregarButtons;
    return agregar.length > 0;
  }
}

module.exports = new ProductsPage();
