const System = {
    Data: {
        admin: "admin@agzakhangi.com",
        meds: [
            { id: 1, name: "PANADOL EXTRA", price: 35.00 },
            { id: 2, name: "CONGESTAL", price: 31.50 },
            { id: 3, name: "LA ROCHE-POSAY", price: 450.00 },
            { id: 4, name: "VICHY IDEAL SOLEIL", price: 520.00 }
        ],
        cart: []
    },

    Auth: {
        run: function() {
            const email = document.getElementById('uEmail').value;
            const msg = (email === System.Data.admin) ? "أهلاً بك يا مدير النظام 👑" : "أهلاً بك يا عميلنا العزيز";
            System.Core.boot(msg);
        },
        google: function() {
            if(confirm("هل تريد السماح لـ أجزخانجي بالوصول لحساب جوجل؟")) {
                System.Core.boot("تم الدخول بحساب جوجل بنجاح ✅");
            }
        }
    },

    Core: {
        boot: function(txt) {
            document.getElementById('displayUser').innerText = txt;
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            System.Store.render(System.Data.meds);
        }
    },

    Store: {
        render: function(list) {
            const grid = document.getElementById('medsGrid');
            grid.innerHTML = list.map(m => `
                <div class="card">
                    <img src="https://image.pollinations.ai/prompt/pharmacy-box-${m.name.replace(/ /g, '-')}-product?nologo=true">
                    <h4 style="font-size:12px">${m.name}</h4>
                    <div style="color:#27ae60; font-weight:bold">${m.price} ج.م</div>
                    <button onclick="System.Store.add(${m.id})" style="width:100%; border:none; background:#482683; color:white; padding:8px; border-radius:8px; margin-top:10px; cursor:pointer">إضافة للسلة</button>
                </div>
            `).join('');
        },
        add: function(id) {
            const item = System.Data.meds.find(i => i.id === id);
            System.Data.currentCart = System.Data.currentCart || [];
            System.Data.currentCart.push(item);
            this.sync();
        },
        sync: function() {
            const total = System.Data.currentCart.reduce((s, i) => s + i.price, 0);
            document.getElementById('cCount').innerText = System.Data.currentCart.length;
            document.getElementById('cTotal').innerText = total.toFixed(2);
            document.getElementById('cartStrip').classList.remove('hidden');
        },
        filter: function(val) {
            const res = System.Data.meds.filter(m => m.name.toLowerCase().includes(val.toLowerCase()));
            this.render(res);
        },
        order: function() {
            alert(`تم استلام طلبك بنجاح! القيمة الإجمالية: ${document.getElementById('cTotal').innerText} ج.م`);
            location.reload(); // إعادة التشغيل بعد الطلب
        }
    },

    UI: {
        share: function() {
            // تفعيل المشاركة الحقيقية للهاتف
            if (navigator.share) {
                navigator.share({ title: 'أجزخانجي', url: window.location.href });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("تم نسخ رابط التطبيق الاحترافي لمشاركته!");
            }
        }
    },

    AI: {
        help: function() {
            alert("مساعد أجزخانجي البرمجي: يمكنك البحث بالأعلى، وإضافة الأدوية للسلة، ثم الضغط على تأكيد الطلب في الأسفل.");
        }
    }
};
