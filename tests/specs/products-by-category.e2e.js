const assert = require('assert');
const HomePage = require('../pageobjects/home.page');
const ProductsPage = require('../pageobjects/products.page');

describe('Visualización de productos por categoría', () => {
  it('Login → seleccionar sucursal (modal obligatorio) → abrir categoría → ver productos', async () => {
    const SUCURSAL = process.env.QA_SUCURSAL || 'Cochez Coronado';
    const CATEGORIA = process.env.QA_CATEGORIA || 'Acabados';

    // 1) Modal obligatorio
    await HomePage.selectBranchMandatory(SUCURSAL);
    await HomePage.waitModalClosed();

    // 2) Ya en Home con sucursal aplicada
    await HomePage.esperarHome();
    const okSucursal = await HomePage.verificarSucursalAplicada(SUCURSAL);
    assert.ok(okSucursal, `La sucursal en Home no coincide con: ${SUCURSAL}`);

    // 3) Abrir categoría
    await HomePage.abrirCategoria(CATEGORIA);
    await HomePage.assertModalNotPresent();

    // 4) Validar productos
    const hayProductos = await ProductsPage.hayProductosVisibles();
    assert.ok(hayProductos, `No se encontraron productos visibles en la categoría: ${CATEGORIA}`);
  });
});
