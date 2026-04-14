document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true });

    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // إضافة تأثير "قوس قزح" عشوائي عند الضغط على الكروت
    const cards = document.querySelectorAll('.art-goal-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const colors = ['#9333ea', '#ec4899', '#f97316', '#14b8a6'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            card.style.borderColor = randomColor;
        });
    });
});