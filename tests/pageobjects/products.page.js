// tests/pageobjects/products.page.js
class ProductsPage {
  // marcador de la pantalla Productos (por título “Productos” o la search bar)
  get headerProductos() {
    return $('android=new UiSelector().textContains("Productos")');
  }

  // cards de producto: usa un id/locator estable cuando lo tengas
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
