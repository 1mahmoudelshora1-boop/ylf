// 1. إعدادات Tailwind (تخصيص الألوان والخلفيات الخاصة بمبادرة بعد ثالث)
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'navy': '#001F3F',
                'gold-primary': '#D4AF37',
                'gold-light': '#F9E27E',
                'royal-blue': '#003366',
            },
            backgroundImage: {
                'hero-pattern': "url('https://www.transparenttextures.com/patterns/cubes.png')",
            }
        }
    }
}

// 2. وظائف العداد التفاعلي (Counter) والقائمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('#achievements h4');

    // وظيفة تشغيل العداد بحركة سلسة وبطيئة
    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                // استخراج الرقم المستهدف من النص (مثلاً +500 تصبح 500)
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                
                // إعدادات السرعة (تم تعديلها لتكون أبطأ وأكثر سلاسة)
                const speed = 100; // عدد الخطوات (كلما زاد الرقم كان العداد أبطأ)
                const inc = target / speed; // مقدار الزيادة في كل خطوة

                const updateCount = () => {
                    if (count < target) {
                        count += inc;
                        let currentShow = Math.ceil(count);
                        
                        // إعادة دمج العلامات (+ أو %) أثناء العد
                        if (counter.hasAttribute('data-plus')) {
                            counter.innerText = '+' + currentShow;
                        } else if (counter.hasAttribute('data-percent')) {
                            counter.innerText = currentShow + '%';
                        } else {
                            counter.innerText = currentShow;
                        }
                        
                        // الوقت الفاصل بين كل رقم (15ms تعطي سلاسة ممتازة للعين)
                        setTimeout(updateCount, 15);
                    } else {
                        // تثبيت الرقم النهائي بدقة عند انتهاء العد
                        counter.innerText = (counter.hasAttribute('data-plus') ? '+' : '') + target + (counter.hasAttribute('data-percent') ? '%' : '');
                    }
                };
                
                updateCount();
                // التوقف عن مراقبة العنصر بعد تشغيله مرة واحدة لضمان الأداء
                observer.unobserve(counter);
            }
        });
    };

    // مراقب التمرير (Intersection Observer) لفتح العداد عند الوصول إليه
    const observer = new IntersectionObserver(startCounters, {
        threshold: 0.2 // يبدأ العداد عندما يظهر 20% من قسم الإنجازات
    });

    // تجهيز كل عداد قبل بدء الحركة
    counters.forEach(counter => {
        const originalText = counter.innerText;
        // حفظ الرقم الأصلي في سمة (attribute) لاستخدامه في الحساب
        counter.setAttribute('data-target', originalText.replace(/[^0-9]/g, ''));
        
        // التحقق من وجود علامات مرافقة للرقم
        if (originalText.includes('+')) counter.setAttribute('data-plus', 'true');
        if (originalText.includes('%')) counter.setAttribute('data-percent', 'true');
        
        // تصفير النص للبدء من الصفر
        counter.innerText = '0';
        observer.observe(counter);
    });

    // 3. إغلاق قائمة الموبايل تلقائياً عند الضغط على الروابط
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            // التحقق من وجود AlpineJS وإغلاق القائمة الجانبية
            if (window.Alpine) {
                const body = document.querySelector('body');
                const data = Alpine.$data(document.querySelector('[x-data]'));
                if (data) {
                    data.mobileMenu = false;
                }
            }
        });
    });
});