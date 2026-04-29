/**
 * Agzakhangi Core Logic v4.0
 * Developed for professional pharmacy operations
 */

const Core = {
    Data: {
        adminToken: "admin@agzakhangi.com",
        catalog: [
            { id: 1, title: "PANADOL EXTRA", price: 35.00 },
            { id: 2, title: "CONGESTAL", price: 31.50 },
            { id: 3, title: "LA ROCHE-POSAY EFFACLAR", price: 450.00 },
            { id: 4, title: "VICHY IDEAL SOLEIL", price: 520.00 },
            { id: 5, title: "OMEGA 3 FISH OIL", price: 75.00 }
        ],
        currentCart: []
    },

    Auth: {
        login: function() {
            const email = document.getElementById('emailInput').value;
            if (email === Core.Data.adminToken) {
                Core.System.launch("أهلاً بك يا مدير النظام");
            } else {
                Core.System.launch("أهلاً بك يا عميلنا العزيز");
            }
        },
        googleAuth: function() {
            const mockAccount = prompt("يرجى اختيار الحساب للمتابعة:", "user@gmail.com");
            if (mockAccount) Core.System.launch("أهلاً بك يا عميلنا العزيز");
        }
    },

    System: {
        launch: function(msg) {
            document.getElementById('userNameLabel').innerText = msg;
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            Core.Store.init();
        }
    },

    Store: {
        init: function() {
            this.render(Core.Data.catalog);
        },
        render: function(items) {
            const container = document.getElementById('storeGrid');
            container.innerHTML = items.map(p => `
                <div class="card">
                    <img src="https://image.pollinations.ai/prompt/pharmacy-box-${p.title.replace(/ /g, '-')}-isolated-on-white?nologo=true" alt="">
                    <h4>${p.title}</h4>
                    <div style="color:#27ae60; font-weight:700">${p.price.toFixed(2)} ج.م</div>
                    <button onclick="Core.Store.add(${p.id})" style="width:100%; margin-top:15px; padding:10px; border:none; background:#482683; color:white; border-radius:10px; cursor:pointer">إضافة</button>
                </div>
            `).join('');
        },
        add: function(id) {
            const item = Core.Data.catalog.find(x => x.id === id);
            Core.Data.currentCart.push(item);
            this.syncUI();
            document.getElementById('cartManager').classList.remove('hidden');
        },
        syncUI: function() {
            const sum = Core.Data.currentCart.reduce((a, b) => a + b.price, 0);
            document.getElementById('cartTotalSum').innerText = sum.toFixed(2);
            document.getElementById('cartCountBadge').innerText = Core.Data.currentCart.length;
        },
        filter: function() {
            const term = document.getElementById('mainSearch').value.toLowerCase();
            const results = Core.Data.catalog.filter(p => p.title.toLowerCase().includes(term));
            this.render(results);
        },
        checkout: function() {
            alert(`نظام الطلبات: تم إرسال طلب بقيمة ${document.getElementById('cartTotalSum').innerText} ج.م`);
            Core.Data.currentCart = [];
            this.syncUI();
            document.getElementById('cartManager').classList.add('hidden');
        }
    },

    UI: {
        scan: function() { alert("جاري تهيئة نظام مسح الباركود الذكي..."); },
        share: function() {
            // تفعيل نظام المشاركة العالمي
            if (navigator.share) {
                navigator.share({
                    title: 'تطبيق أجزخانجي المطور',
                    text: 'اطلب أدويتك الآن من صيدليتك الذكية!',
                    url: window.location.href // الرابط الفعلي للتطبيق
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("تم نسخ رابط التطبيق الاحترافي لمشاركته.");
            }
        }
    },

    AI: {
        showGuide: function() {
            const instructions = [
                "1. استخدم شريط البحث للعثور على أي منتج بسرعة.",
                "2. اضغط 'إضافة' لجمع مشترياتك في السلة الذكية.",
                "3. السلة ستظهر تلقائياً في الأسفل لإتمام الطلب.",
                "4. يمكنك مشاركة التطبيق من الأيقونة في الأعلى."
            ];
            alert("المساعد البرمجي للخدمة:\n" + instructions.join("\n"));
        }
    }
};
