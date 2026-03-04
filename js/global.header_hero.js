const burgerBtn = document.getElementById('burgerBtn');
const burgerDropdown = document.getElementById('burgerDropdown');

function closeBurgerMenu() {
    if (!burgerBtn || !burgerDropdown) return;
    burgerBtn.classList.remove('is-active');
    burgerDropdown.classList.remove('is-open');
}

if (burgerBtn && burgerDropdown) {
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('is-active');
        burgerDropdown.classList.toggle('is-open');
    });

    burgerDropdown.addEventListener('click', (e) => {
        const link = e.target.closest && e.target.closest('a');
        if (link) closeBurgerMenu();
    });

    const handleResize = () => {
        if (window.innerWidth >= 769 && burgerDropdown.classList.contains('is-open')) {
            closeBurgerMenu();
        }
    };

    window.addEventListener('resize', handleResize);
}