// بيانات الصيدلية الشاملة (بدون روابط صور يدوية)
const appData = {
    meds: [
        // قسم الأدوية والمسكنات
        { id: 1, name: "PANADOL EXTRA", price: 35, category: "أدوية" },
        { id: 2, name: "CONGESTAL", price: 31, category: "أدوية" },
        
        // قسم مستحضرات التجميل والعناية
        { id: 3, name: "LA ROCHE-POSAY EFFACLAR", price: 450, category: "تجميل" },
        { id: 4, name: "VICHY IDEAL SOLEIL", price: 520, category: "تجميل" },
        
        // قسم العناية بالطفل
        { id: 5, name: "PAMPERS SIZE 4", price: 280, category: "أطفال" },
        { id: 6, name: "NAN 1 MILK", price: 195, category: "أطفال" },
        
        // قسم الفيتامينات
        { id: 7, name: "OMEGA 3 PLUS", price: 75, category: "فيتامينات" },
        { id: 8, name: "CENTRUM LUTEIN", price: 650, category: "فيتامينات" }
    ],
    cart: [],
    isAdmin: false
};

const app = {
    init: function() {
        this.renderMeds(appData.meds);
    },

    // دالة ذكية لتوليد رابط صورة بناءً على اسم المنتج
    getProductImage: function(productName) {
        // نستخدم خدمة سريعة تبحث عن الصور بناءً على الاسم
        return `https://image.pollinations.ai/prompt/professional-product-shot-of-${productName.replace(/ /g, '-')}-packaging-on-white-background-realistic-lighting`;
    },

    renderMeds: function(items) {
        const grid = document.getElementById('productsGrid');
        if(!grid) return;
        grid.innerHTML = items.map(m => `
            <div class="card">
                <div style="background: #e1f5fe; color: #27ae60; font-size: 10px; padding: 2px 8px; border-radius: 10px; display: inline-block; margin-bottom: 5px;">${m.category}</div>
                <img src="${this.getProductImage(m.name)}" alt="${m.name}" style="width: 100%; height: 150px; object-fit: contain;">
                <h4 style="font-size: 14px; margin: 5px 0; text-transform: uppercase;">${m.name}</h4>
                <div class="price" style="color: #2c3e50; font-weight: bold;">${m.price} ج.م</div>
                <button class="btn-add" onclick="app.addToCart(${m.id})" style="background: #482683; color: white; border: none; padding: 8px; width: 100%; border-radius: 5px; margin-top: 10px; cursor: pointer;">إضافة للسلة</button>
            </div>
        `).join('');
    },

    search: function() {
        const term = document.getElementById('searchInput').value.toLowerCase();
        const filtered = appData.meds.filter(m => m.name.toLowerCase().includes(term) || m.category.includes(term));
        this.renderMeds(filtered);
    },

    addToCart: function(id) {
        const med = appData.meds.find(m => m.id === id);
        appData.cart.push(med);
        this.updateCart();
        this.showToast(`تم إضافة ${m.name} للسلة`);
    },

    updateCart: function() {
        const total = appData.cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('totalPrice').innerText = total.toFixed(2);
        document.getElementById('cartCount').innerText = appData.cart.length;
    },

    login: function(role) {
        if (role === 'admin') {
            const pass = document.getElementById('adminPass').value;
            if (pass === "1234") {
                appData.isAdmin = true;
                document.getElementById('adminPanel').classList.remove('hidden');
                this.showToast("مرحباً بك يا مدير الصيدلية");
            } else {
                alert("كلمة السر خاطئة!");
                return;
            }
        }
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
    },

    showToast: function(msg) {
        const t = document.getElementById('toast');
        if(!t) return;
        t.innerText = msg;
        t.classList.remove('hidden');
        t.style.position = "fixed";
        t.style.bottom = "100px";
        t.style.left = "50%";
        t.style.transform = "translateX(-50%)";
        t.style.background = "#27ae60";
        t.style.color = "white";
        t.style.padding = "10px 20px";
        t.style.borderRadius = "20px";
        t.style.zIndex = "1001";
        setTimeout(() => t.classList.add('hidden'), 2000);
    }
};

window.onload = () => app.init();
