const assert = require('assert');
const HomePage = require('../pageobjects/home.page');
const ProductsPage = require('../pageobjects/products.page');

describe('Visualización de productos por categoría', () => {
  it('Login → seleccionar sucursal (modal obligatorio) → abrir categoría → ver productos', async () => {
    const SUCURSAL = process.env.QA_SUCURSAL || 'Cochez Coronado';
    const CATEGORIA = process.env.QA_CATEGORIA || 'Acabados';

    // 1) Modal obligatorio
    await HomePage.selectBranchMandatory(SUCURSAL);
    await HomePage.waitModalClosed(); // 👈 esperar que el modal cierre de verdad
    // (esto ya lo tienes en tu spec actual) :contentReference[oaicite:2]{index=2}

    // 2) Ya en Home con sucursal aplicada
    await HomePage.esperarHome();
    const okSucursal = await HomePage.verificarSucursalAplicada(SUCURSAL);
    assert.ok(okSucursal, `La sucursal en Home no coincide con: ${SUCURSAL}`);
    // (métodos existentes) :contentReference[oaicite:3]{index=3}

    // 3) Abrir categoría
    await HomePage.abrirCategoria(CATEGORIA);
    await HomePage.assertModalNotPresent(); // asegura que no reabre modal :contentReference[oaicite:4]{index=4}

    // 4) Esperar y validar productos visibles con scroll y timeout
    const okProductos = await ProductsPage.esperarProductosVisibles({ min: 1, timeout: 30000 });
    assert.ok(okProductos, `No se encontraron productos visibles en la categoría: ${CATEGORIA}`);
  });
});
