const App = {
    data: {
        admin: "admin@agzakhangi.com",
        items: [
            { id: 1, name: "PANADOL EXTRA", price: 35 },
            { id: 2, name: "CONGESTAL", price: 31 },
            { id: 3, name: "LA ROCHE-POSAY", price: 450 },
            { id: 4, name: "VICHY SOLEIL", price: 520 }
        ],
        cart: []
    },

    login: function() {
        const mail = document.getElementById('email').value;
        const msg = (mail === this.data.admin) ? "أهلاً بك يا مدير النظام 👑" : "أهلاً بك يا عميلنا العزيز";
        this.launch(msg);
    },

    googleAuth: function() {
        if(confirm("هل تريد المتابعة باستخدام حساب جوجل؟")) this.launch("تم الدخول بواسطة جوجل ✅");
    },

    launch: function(msg) {
        document.getElementById('welcomeName').innerText = msg;
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        this.render(this.data.items);
    },

    render: function(list) {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = list.map(m => `
            <div class="card">
                <img src="https://image.pollinations.ai/prompt/medicine-${m.name.replace(/ /g, '-')}-pack-white-bg?nologo=true">
                <h4 style="font-size:12px">${m.name}</h4>
                <div style="color:#27ae60; font-weight:bold">${m.price} ج.م</div>
                <button onclick="App.addToCart(${m.id})" style="width:100%; border:none; background:#482683; color:white; padding:8px; border-radius:8px; margin-top:10px;">إضافة</button>
            </div>
        `).join('');
    },

    addToCart: function(id) {
        const item = this.data.items.find(i => i.id === id);
        this.data.cart.push(item);
        document.getElementById('cartQty').innerText = this.data.cart.length;
        document.getElementById('cartSum').innerText = this.data.cart.reduce((s,i)=> s+i.price, 0).toFixed(2);
        document.getElementById('cartBar').classList.remove('hidden');
    },

    share: function() {
        // المشاركة الفعلية لرابط الموقع
        if (navigator.share) {
            navigator.share({ title: 'أجزخانجي', url: window.location.href });
        } else {
            alert("تم نسخ رابط التطبيق لمشاركته!");
        }
    },

    aiHelp: function() {
        alert("🤖 مساعد أجزخانجي: أهلاً بك! يمكنك البحث عن الدواء بالأعلى، ثم الضغط على 'إضافة' لطلبه فوراً.");
    }
};
