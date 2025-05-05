// Cupones de descuento
const CUPONES = {
    "SKYLINK10": 10,
    "DRONE20": 20,
    "VIP15": 15
};

document.getElementById('applyCupon').addEventListener('click', aplicarCupon);

function aplicarCupon() {
    const codigo = document.getElementById('cuponCode').value.trim();
    const mensaje = document.getElementById('cuponMessage');
    
    if (CUPONES[codigo]) {
        const descuento = CUPONES[codigo];
        localStorage.setItem('cuponAplicado', JSON.stringify({
            codigo,
            descuento
        }));
        
        mensaje.textContent = `¡Cupón aplicado! ${descuento}% de descuento.`;
        mensaje.className = 'success';
        mensaje.style.display = 'block';
        
        // Recalcular totales
        actualizarTotales();
    } else {
        mensaje.textContent = 'Cupón no válido. Intenta con otro código.';
        mensaje.className = 'error';
        mensaje.style.display = 'block';
    }
}

function actualizarTotales() {
    // ... código existente ...
    
    // Aplicar descuento si existe
    const cupon = JSON.parse(localStorage.getItem('cuponAplicado'));
    if (cupon) {
        const descuento = (subtotal * cupon.descuento) / 100;
        total -= descuento;
        
        // Mostrar línea de descuento
        resumenHTML += `
            <div class="resumen-linea descuento">
                <span>Descuento (${cupon.codigo})</span>
                <span>-$${descuento.toFixed(2)}</span>
            </div>
        `;
    }
    
    class CuponManager {
        constructor() {
            this.cupones = {
                "SKY10": { discount: 10, type: 'percent', minOrder: 50 },
                "ENVIOGRATIS": { discount: 0, type: 'shipping', minOrder: 100 },
                "DRONE20": { discount: 20, type: 'percent', products: ['antena-pro'] }
            };
        }
    
        validarCupon(codigo, carrito) {
            const cupon = this.cupones[codigo.toUpperCase()];
            if (!cupon) return { valido: false, error: "Cupón no válido" };
    
            // Validar mínimo de orden
            if (cupon.minOrder && carrito.subtotal < cupon.minOrder) {
                return { 
                    valido: false, 
                    error: `Mínimo $${cupon.minOrder} para este cupón` 
                };
            }
    
            // Validar productos específicos
            if (cupon.products) {
                const tieneProductos = carrito.items.some(item => 
                    cupon.products.includes(item.sku)
                );
                if (!tieneProductos) {
                    return { 
                        valido: false, 
                        error: "Cupón no aplicable a estos productos" 
                    };
                }
            }
    
            return { valido: true, cupon };
        }
    }
    
    // Uso en la UI
    const cuponManager = new CuponManager();
    
    document.getElementById('applyCupon').addEventListener('click', function() {
        const codigo = document.getElementById('cuponCode').value;
        const carrito = obtenerCarritoActual(); // Implementar esta función
        
        const resultado = cuponManager.validarCupon(codigo, carrito);
        
        if (resultado.valido) {
            aplicarDescuento(resultado.cupon);
            mostrarFeedback('success', `Cupón aplicado: ${codigo}`);
        } else {
            mostrarFeedback('error', resultado.error);
        }
    });
}