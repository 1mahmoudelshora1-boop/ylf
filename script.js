// 1. إعدادات Tailwind (تخصيص الألوان)
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

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 2. تهيئة العدادات (Counters) ---
    const counters = document.querySelectorAll('#achievements h4');
    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const speed = 100;
                const inc = target / speed;

                const updateCount = () => {
                    if (count < target) {
                        count += inc;
                        let currentShow = Math.ceil(count);
                        counter.innerText = (counter.hasAttribute('data-plus') ? '+' : '') + currentShow + (counter.hasAttribute('data-percent') ? '%' : '');
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = (counter.hasAttribute('data-plus') ? '+' : '') + target + (counter.hasAttribute('data-percent') ? '%' : '');
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, { threshold: 0.2 });
    counters.forEach(counter => {
        const originalText = counter.innerText;
        counter.setAttribute('data-target', originalText.replace(/[^0-9]/g, ''));
        if (originalText.includes('+')) counter.setAttribute('data-plus', 'true');
        if (originalText.includes('%')) counter.setAttribute('data-percent', 'true');
        counter.innerText = '0';
        counterObserver.observe(counter);
    });

    // --- 3. نظام التنبيهات المخصص (The Notification System) ---
    const showNotification = (message, type) => {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-5 right-5 p-6 rounded-2xl shadow-2xl z-[2000] animate__animated animate__fadeInRight 
                          ${type === 'success' ? 'bg-navy text-white border-r-8 border-gold-primary' : 'bg-red-600 text-white border-r-8 border-white'}`;
        
        toast.innerHTML = `
            <div class="flex items-center gap-4 text-right" dir="rtl">
                <i class="bi ${type === 'success' ? 'bi-check-circle-fill text-gold-primary' : 'bi-exclamation-triangle-fill'} text-2xl"></i>
                <div>
                    <h4 class="font-black italic">إشعار ${type === 'success' ? 'رسمي' : 'خطأ'}</h4>
                    <p class="text-sm opacity-90">${message}</p>
                </div>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.replace('animate__fadeInRight', 'animate__fadeOutRight');
            setTimeout(() => toast.remove(), 1000);
        }, 5000);
    };

    // --- 4. معالجة إرسال الفورم (الباك اند الحقيقي) ---
    const contactForm = document.getElementById('mainContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const phoneInput = contactForm.querySelector('input[name="user_phone"]');
            const phoneValue = phoneInput ? phoneInput.value.trim() : "";

            // التحقق من رقم الهاتف
            if (phoneValue.length < 11) {
                phoneInput.classList.add('ring-2', 'ring-red-500', 'animate__animated', 'animate__headShake');
                showNotification("يرجى إدخال رقم هاتف صحيح (11 رقم)", "error");
                setTimeout(() => {
                    phoneInput.classList.remove('ring-2', 'ring-red-500', 'animate__animated', 'animate__headShake');
                }, 2000);
                return;
            }

            // بداية الإرسال الحقيقي
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="bi bi-arrow-repeat animate-spin"></i> جاري تأمين الإرسال...`;
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                // استبدل ID_HERE بالكود اللي خدته من Formspree
                const response = await fetch("https://formspree.io/f/mzdapbww", {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showNotification("تم استلام طلبك بنجاح في المكتب الفني للمبادرة.", "success");
                    contactForm.reset();
                } else {
                    showNotification("عفواً، فشل الإرسال. تأكد من إعدادات السيرفر.", "error");
                }
            } catch (error) {
                showNotification("خطأ في الاتصال، تأكد من الإنترنت وحاول مجدداً.", "error");
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- 5. إغلاق قائمة الموبايل وتهيئة AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1200, once: true });
    }

    console.log("%c بعد ثالث: تم تفعيل الأنظمة الذكية بنجاح ", "background: #001F3F; color: #D4AF37; font-size: 14px; font-weight: bold;");
});