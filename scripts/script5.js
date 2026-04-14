document.addEventListener('DOMContentLoaded', () => {
    // تشغيل الأنيميشن
    AOS.init({ duration: 800, once: true });

    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // تأثير اهتزاز خفيف عند التحويم فوق الكروت الرياضية
    const cards = document.querySelectorAll('.sport-goal-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('animate__animated', 'animate__pulse');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('animate__animated', 'animate__pulse');
        });
    });
});