// Búsqueda con sugerencias en tiempo real
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.createElement('div');
suggestionsBox.id = 'suggestionsBox';
searchInput.parentNode.appendChild(suggestionsBox);

searchInput.addEventListener('input', async function() {
    const term = this.value.trim();
    if (term.length < 2) {
        suggestionsBox.style.display = 'none';
        return;
    }

    // Simulación de API (en producción sería fetch a tu backend)
    const results = await mockSearchAPI(term);
    
    if (results.length > 0) {
        suggestionsBox.innerHTML = results.map(item => `
            <div class="suggestion-item" data-id="${item.id}">
                <img src="${item.thumb}" alt="${item.name}">
                <span>${item.name}</span>
                <span class="price">$${item.price}</span>
            </div>
        `).join('');
        suggestionsBox.style.display = 'block';
    }
});

// API Mock
async function mockSearchAPI(term) {
    return PRODUCTOS.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) || 
        p.category.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5);
}