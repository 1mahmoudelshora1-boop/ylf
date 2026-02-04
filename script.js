// 1. إعدادات Tailwind
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
    
    // --- 2. العدادات (Counters) ---
    const counters = document.querySelectorAll('#achievements h4');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const updateCount = () => {
                    if (count < target) {
                        count += Math.ceil(target / 100);
                        if (count > target) count = target;
                        counter.innerText = (counter.hasAttribute('data-plus') ? '+' : '') + count + (counter.hasAttribute('data-percent') ? '%' : '');
                        setTimeout(updateCount, 20);
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => {
        const originalText = counter.innerText;
        counter.setAttribute('data-target', originalText.replace(/[^0-9]/g, ''));
        if (originalText.includes('+')) counter.setAttribute('data-plus', 'true');
        if (originalText.includes('%')) counter.setAttribute('data-percent', 'true');
        counter.innerText = '0';
        counterObserver.observe(counter);
    });

    // --- 3. نظام التنبيهات ---
    const showNotification = (message, type) => {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-5 right-5 p-6 rounded-2xl shadow-2xl z-[2000] animate__animated animate__fadeInRight 
                          ${type === 'success' ? 'bg-[#001F3F] text-white border-r-8 border-[#D4AF37]' : 'bg-red-600 text-white border-r-8 border-white'}`;
        
        toast.innerHTML = `
            <div class="flex items-center gap-4 text-right" dir="rtl">
                <i class="bi ${type === 'success' ? 'bi-check-circle-fill text-[#D4AF37]' : 'bi-exclamation-triangle-fill'} text-2xl"></i>
                <div>
                    <h4 class="font-black italic">إشعار ${type === 'success' ? 'رسمي' : 'خطأ'}</h4>
                    <p class="text-sm opacity-90">${message}</p>
                </div>
            </div>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.replace('animate__fadeInRight', 'animate__fadeOutRight');
            setTimeout(() => toast.remove(), 1000);
        }, 5000);
    };

    // --- 4. معالجة الإرسال (الحل النهائي للريفريش) ---
    const contactForm = document.getElementById('mainContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // منع الريفريش فوراً
            e.stopPropagation(); // منع Alpine.js من التدخل

            const submitBtn = this.querySelector('button[type="submit"]');
            const phoneInput = this.querySelector('input[name="user_phone"]');
            const phoneValue = phoneInput.value.trim();

            if (phoneValue.length < 11) {
                phoneInput.classList.add('ring-2', 'ring-red-500', 'animate__animated', 'animate__headShake');
                showNotification("يرجى إدخال رقم هاتف صحيح (11 رقم)", "error");
                setTimeout(() => phoneInput.classList.remove('ring-2', 'ring-red-500', 'animate__animated', 'animate__headShake'), 2000);
                return;
            }

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="bi bi-arrow-repeat animate-spin"></i> جاري تأمين الإرسال...`;
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://formspree.io/f/mzdapbww", {
                    method: "POST",
                    body: new FormData(this),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showNotification("تم استلام طلبك بنجاح في المكتب الفني. سيتم التواصل معك قريباً.", "success");
                    this.reset();
                } else {
                    throw new Error();
                }
            } catch (err) {
                showNotification("عفواً، حدث خطأ في السيرفر. حاول مرة أخرى.", "error");
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    if (typeof AOS !== 'undefined') AOS.init({ duration: 1200, once: true });
});