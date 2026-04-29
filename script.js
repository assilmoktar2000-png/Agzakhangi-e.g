// بيانات الصيدلية (قائمة الأدوية الأولية)
const appData = {
    meds: [
        { id: 1, name: "بانادول إكسترا", price: 35, category: "مسكنات", img: "https://via.placeholder.com/150?text=Panadol" },
        { id: 2, name: "فيتامين سي 1000", price: 60, category: "فيتامينات", img: "https://via.placeholder.com/150?text=Vit+C" },
        { id: 3, name: "أوجمنتين 1 جرام", price: 90, category: "مضادات", img: "https://via.placeholder.com/150?text=Augmentin" }
    ],
    cart: [],
    isAdmin: false
};

const app = {
    // تشغيل التطبيق وعرض الأدوية
    init: function() {
        this.renderMeds(appData.meds);
        console.log("صيدلية Agzaخngy جاهزة!");
    },

    renderMeds: function(items) {
        const grid = document.getElementById('productsGrid');
        if(!grid) return;
        grid.innerHTML = items.map(m => `
            <div class="card">
                <img src="${m.img}" alt="${m.name}">
                <h4>${m.name}</h4>
                <div class="price">${m.price} ج.م</div>
                <button class="btn-add" onclick="app.addToCart(${m.id})">إضافة للطلب</button>
            </div>
        `).join('');
    },

    // نظام البحث الطبي
    search: function() {
        const term = document.getElementById('searchInput').value.toLowerCase();
        const filtered = appData.meds.filter(m => m.name.includes(term));
        this.renderMeds(filtered);
    },

    // إضافة للسلة وحساب الإجمالي
    addToCart: function(id) {
        const med = appData.meds.find(m => m.id === id);
        appData.cart.push(med);
        this.updateCart();
        this.showToast(`تم إضافة ${med.name} للسلة`);
    },

    updateCart: function() {
        const total = appData.cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('totalPrice').innerText = total.toFixed(2);
        document.getElementById('cartCount').innerText = appData.cart.length;
    },

    // دخول المدير (للوالد فقط)
    login: function(role) {
        if (role === 'admin') {
            const pass = document.getElementById('adminPass').value;
            if (pass === "1234") { // كلمة سر افتراضية
                appData.isAdmin = true;
                document.getElementById('adminPanel').classList.remove('hidden');
                this.showToast("أهلاً بك يا مدير الصيدلية");
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
        setTimeout(() => t.classList.add('hidden'), 2000);
    }
};

// تشغيل الصيدلية فور فتح الصفحة
window.onload = () => app.init();
