// 1. Логіка Теплого Курсору
const cursor = document.getElementById('cursor');
const follower = document.getElementById('follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

// Додаємо відстеження наведення на інтерактивні об'єкти
const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-icon, input, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
});

// 2. Скрол Навігації та ScrollSpy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= (section.offsetTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active-link');
        }
    });
});

// 3. Плавна Поява елементів (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, delay);
            delay += 80;
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 4. 3D Нахил Картки при наведенні
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.setProperty('--x', '0px');
        card.style.setProperty('--y', '0px');
    });
});

// 5. Ваша інтегрована логіка відправки листа (Web3Forms API)
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');
const modal = document.getElementById('result-modal');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "d8dd2631-0e34-4044-b527-5304b7388fc9");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Надсилання повідомлення...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            showModal('success', 'Лист надіслано!', 'Дякую за звернення! Повідомлення успішно доставлено, Павло відповість вам найближчим часом.');
            form.reset();
        } else {
            showModal('error', 'Сталася помилка', data.message || 'Сервер не зміг обробити форму.');
        }

    } catch (error) {
        showModal('error', 'Помилка мережі', 'Не вдалося надіслати дані. Будь ласка, перевірте інтернет-з\'єднання.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

function showModal(type, title, text) {
    const iconEl = document.getElementById('modal-icon');
    iconEl.className = 'modal-icon ' + type;
    iconEl.innerHTML = type === 'success' ? '<i class="fas fa-envelope-open-text"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    modal.classList.add('open');
}

function closeModal() {
    modal.classList.remove('open');
}
