const appData = {
    adminEmail: "admin@agzakhangi.com", // الإيميل الذي سيتعرف عليه كمدير
    meds: [
        { id: 1, name: "PANADOL EXTRA", price: 35 },
        { id: 2, name: "CONGESTAL", price: 31 },
        { id: 3, name: "VICHY IDEAL SOLEIL", price: 520 },
        { id: 4, name: "LA ROCHE-POSAY", price: 450 }
    ],
    cart: []
};

const app = {
    init: function() {
        this.renderMeds(appData.meds);
    },

    authenticate: function(type) {
        const email = document.getElementById('userEmail').value;
        // الفحص التلقائي
        if (email === appData.adminEmail) {
            this.launchApp("أهلاً بك يا مدير النظام 👑");
        } else {
            this.launchApp("أهلاً بك يا عميلنا العزيز 👤");
        }
    },

    launchApp: function(msg) {
        document.getElementById('welcomeText').innerText = msg;
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
    },

    renderMeds: function(items) {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = items.map(m => `
            <div class="card">
                <img src="https://image.pollinations.ai/prompt/medicine-box-${m.name.replace(/ /g, '-')}-pack?nologo=true" alt="">
                <h4>${m.name}</h4>
                <div style="color:#27ae60; font-weight:bold">${m.price} ج.م</div>
                <button onclick="app.addToCart(${m.id})" style="width:100%; margin-top:10px; border:none; background:#482683; color:white; padding:8px; border-radius:5px">إضافة</button>
            </div>
        `).join('');
    },

    addToCart: function(id) {
        const med = appData.meds.find(m => m.id === id);
        appData.cart.push(med);
        this.updateUI();
    },

    updateUI: function() {
        const total = appData.cart.reduce((s, i) => s + i.price, 0);
        document.getElementById('totalPrice').innerText = total.toFixed(2);
        document.getElementById('cartCount').innerText = appData.cart.length;
    },

    search: function() {
        const term = document.getElementById('searchInput').value.toLowerCase();
        const filtered = appData.meds.filter(m => m.name.toLowerCase().includes(term));
        this.renderMeds(filtered);
    },

    scan: function() { alert("جاري تجهيز ماسح الباركود..."); },
    share: function() { alert("جاري تحضير رابط المشاركة..."); }
};

window.onload = () => app.init();
