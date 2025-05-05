const stripe = Stripe('TU_PUBLIC_KEY');
const elements = stripe.elements();
const card = elements.create('card', {
    style: {
        base: {
            fontSize: '16px',
            color: '#32325d',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a'
        }
    }
});
card.mount('#card-element');

// Validación en tiempo real
card.addEventListener('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Submit del formulario
const form = document.getElementById('payment-form');
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const {paymentMethod, error} = await stripe.createPaymentMethod({
        type: 'card',
        card: card
    });

    if (error) {
        document.getElementById('card-errors').textContent = error.message;
    } else {
        // Mostrar loader
        document.getElementById('submit-payment').disabled = true;
        
        // Enviar a tu backend
        const response = await fetch('/procesar-pago', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                amount: calcularTotal() * 100,
                carrito: obtenerCarritoActual(),
                cupon: obtenerCuponAplicado()
            })
        });

        const result = await response.json();
        
        if (result.success) {
            window.location.href = '/confirmacion.html?orden=' + result.orderId;
        } else {
            mostrarErrorPago(result.error);
            document.getElementById('submit-payment').disabled = false;
        }
    }
});