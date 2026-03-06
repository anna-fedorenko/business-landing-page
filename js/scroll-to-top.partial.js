export function initScrollToTop() {
  const scrollButton = document.getElementById('scroll-to-top');
  
  if (!scrollButton) return;

  // Показувати/приховувати кнопку при скролінгу
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });

  // Скролити на верх при натиску
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
