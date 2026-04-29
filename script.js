// بيانات الصيدلية الشاملة
const appData = {
    meds: [
        // قسم الأدوية
        { id: 1, name: "بانادول إكسترا", price: 35, category: "أدوية", img: "https://via.placeholder.com/150?text=Panadol" },
        { id: 2, name: "كونجستال أقراص", price: 31, category: "أدوية", img: "https://via.placeholder.com/150?text=Congestal" },
        
        // قسم العناية بالبشرة والتجميل
        { id: 3, name: "غسول لاروش بوزيه", price: 450, category: "تجميل", img: "https://via.placeholder.com/150?text=LaRoche" },
        { id: 4, name: "واقي شمس فيتشي", price: 520, category: "تجميل", img: "https://via.placeholder.com/150?text=Vichy" },
        
        // قسم العناية بالطفل
        { id: 5, name: "حفاضات بامبرز مقاس 4", price: 280, category: "أطفال", img: "https://via.placeholder.com/150?text=Pampers" },
        { id: 6, name: "لبن نان 1", price: 195, category: "أطفال", img: "https://via.placeholder.com/150?text=Nan+1" },
        
        // قسم الفيتامينات والمكملات
        { id: 7, name: "أوميجا 3 بلس", price: 75, category: "فيتامينات", img: "https://via.placeholder.com/150?text=Omega3" },
        { id: 8, name: "سنتروم للبالغين", price: 650, category: "فيتامينات", img: "https://via.placeholder.com/150?text=Centrum" }
    ],
    cart: [],
    isAdmin: false
};

const app = {
    init: function() {
        this.renderMeds(appData.meds);
    },

    renderMeds: function(items) {
        const grid = document.getElementById('productsGrid');
        if(!grid) return;
        grid.innerHTML = items.map(m => `
            <div class="card">
                <div class="category-tag">${m.category}</div>
                <img src="${m.img}" alt="${m.name}">
                <h4>${m.name}</h4>
                <div class="price">${m.price} ج.م</div>
                <button class="btn-add" onclick="app.addToCart(${m.id})">إضافة للسلة</button>
            </div>
        `).join('');
    },

    search: function() {
        const term = document.getElementById('searchInput').value.toLowerCase();
        const filtered = appData.meds.filter(m => m.name.includes(term) || m.category.includes(term));
        this.renderMeds(filtered);
    },

    addToCart: function(id) {
        const med = appData.meds.find(m => m.id === id);
        appData.cart.push(med);
        this.updateCart();
        this.showToast(`تم إضافة ${med.name}`);
    },

    updateCart: function() {
        const total = appData.cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('totalPrice').innerText = total.toFixed(2);
        document.getElementById('cartCount').innerText = appData.cart.length;
    },

    login: function(role) {
        // (نفس كود الدخول السابق)
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
    },

    showToast: function(msg) {
        const t = document.getElementById('toast');
        if(!t) return;
        t.innerText = msg;
        t.classList.remove('hidden');
        setTimeout(() => t.classList.add('hidden'), 2000);
    }
};

window.onload = () => app.init();
