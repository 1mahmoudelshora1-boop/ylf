document.addEventListener('DOMContentLoaded', () => {
    // تشغيل الأنيميشن
    AOS.init({ duration: 1000, once: true });

    // الناف بار
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // إضافة تأثير "وهج" بسيط للماوس فوق كروت الأهداف
    const cards = document.querySelectorAll('.target-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});