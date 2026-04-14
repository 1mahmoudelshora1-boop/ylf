document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تفعيل حركات AOS لـ Page 2 بتأثيرات مخصصة
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1100,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 2. تغيير شكل الناف بار لـ Page 2 عند النزول (Scroll)
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (nav && window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else if (nav) {
            nav.classList.remove('scrolled');
        }
    });

    // 3. تأثير حركي خفيف على كروت الأهداف عند التحويم
    const goals = document.querySelectorAll('.social-goal-card-2');
    goals.forEach(goal => {
        goal.addEventListener('mouseenter', () => {
            goal.classList.add('animate__animated', 'animate__headShake');
        });
        goal.addEventListener('mouseleave', () => {
            goal.classList.remove('animate__animated', 'animate__headShake');
        });
    });

    // 4. Parallax خفيف لخلفية الصفحة الملونة
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        const heroText = document.querySelector('header h2');
        if (heroText) {
            heroText.style.transform = `translateY(${offset * 0.3}px)`;
            heroText.style.opacity = 1 - (offset / 700);
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // تفعيل AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1100, once: true });
    }

    // تأثير الـ Parallax على العنوان الرئيسي لزيادة الفخامة
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        const heroText = document.querySelector('header h2');
        if (heroText) {
            heroText.style.transform = `translateY(${offset * 0.3}px)`;
        }
    });
});