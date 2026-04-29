const appData = {
    meds: [
        { id: 1, name: "PANADOL EXTRA", price: 35, category: "أدوية" },
        { id: 2, name: "CONGESTAL", price: 31, category: "أدوية" },
        { id: 3, name: "LA ROCHE-POSAY", price: 450, category: "تجميل" },
        { id: 4, name: "VICHY SUNSCREEN", price: 520, category: "تجميل" },
        { id: 5, name: "PAMPERS SIZE 4", price: 280, category: "أطفال" },
        { id: 6, name: "NAN 1 MILK", price: 195, category: "أطفال" },
        { id: 7, name: "OMEGA 3 PLUS", price: 75, category: "فيتامينات" },
        { id: 8, name: "CENTRUM", price: 650, category: "فيتامينات" }
    ],
    cart: []
};

const app = {
    init: function() {
        this.renderMeds(appData.meds);
    },

    getProductImage: function(productName) {
        // رابط ذكي يجلب صور حقيقية للمنتجات الطبية
        return `https://image.pollinations.ai/prompt/pharmacy-product-${productName}-white-background?nologo=true`;
    },

    renderMeds: function(items) {
        const grid = document.getElementById('productsGrid');
        if(!grid) return;
        grid.innerHTML = items.map(m => `
            <div class="card">
                <img src="${this.getProductImage(m.name)}" alt="${m.name}" onerror="this.src='https://via.placeholder.com/150?text=Medicine'">
                <h4>${m.name}</h4>
                <div class="price">${m.price} ج.م</div>
                <button class="btn-add" onclick="app.addToCart(${m.id})">إضافة للسلة</button>
            </div>
        `).join('');
    },

    search: function() {
        const term = document.getElementById('searchInput').value.toLowerCase();
        const filtered = appData.meds.filter(m => m.name.toLowerCase().includes(term));
        this.renderMeds(filtered);
    },

    addToCart: function(id) {
        const med = appData.meds.find(m => m.id === id);
        appData.cart.push(med);
        this.updateCart();
    },

    updateCart: function() {
        const total = appData.cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('totalPrice').innerText = total.toFixed(2);
        document.getElementById('cartCount').innerText = appData.cart.length;
    },
    
    checkout: function() {
        if(appData.cart.length === 0) return alert("السلة فارغة!");
        alert("تم استلام طلبك بنجاح!");
    }
};

window.onload = () => app.init();
