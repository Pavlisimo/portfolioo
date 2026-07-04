// Зміна стилю шапки при скролі
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Налаштування IntersectionObserver для анімації появи елементів
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Запуск спостереження за всіма елементами з класом .reveal
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});
