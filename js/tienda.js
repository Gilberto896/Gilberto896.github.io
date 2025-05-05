// Búsqueda de productos
document.getElementById('searchBtn').addEventListener('click', buscarProductos);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') buscarProductos();
});

function buscarProductos() {
    const termino = document.getElementById('searchInput').value.toLowerCase();
    if (termino.trim() === '') return;
    
    // Redirige a la página de productos con el término de búsqueda
    window.location.href = `productos.html?search=${encodeURIComponent(termino)}`;
}
// Filtros de productos
document.querySelectorAll('[data-categoria]').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const categoria = this.getAttribute('data-categoria');
        filtrarProductos(categoria);
        
        // Actualizar clase activa
        document.querySelectorAll('[data-categoria]').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

document.getElementById('priceRange').addEventListener('input', function() {
    const value = this.value;
    document.getElementById('priceValue').textContent = `Hasta $${value}`;
    filtrarProductos();
});

function filtrarProductos(categoria = 'todas') {
    const precioMax = document.getElementById('priceRange').value;
    const productos = document.querySelectorAll('.producto-card');
    
    productos.forEach(producto => {
        const productCategoria = producto.getAttribute('data-categoria');
        const productPrice = parseFloat(producto.getAttribute('data-precio'));
        
        const categoriaMatch = categoria === 'todas' || productCategoria === categoria;
        const precioMatch = productPrice <= precioMax;
        
        if (categoriaMatch && precioMatch) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}