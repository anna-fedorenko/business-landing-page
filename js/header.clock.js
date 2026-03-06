/**
 * header.clock.js
 * Flip Clock — повна логіка анімації та оновлення часу
 * Залежності: global.header.hero.partial.html + global.header.hero.partial.css
 */

(function () {
    'use strict';

    /* ── Утиліти ─────────────────────────────────────── */

    /** Повертає рядок із двох цифр, напр. "09" */
    function pad(n) {
        return String(n).padStart(2, '0');
    }

    /**
     * Оновлює одну картку-цифру з flip-анімацією.
     * @param {HTMLElement} card  — елемент .flip-card
     * @param {string}      next  — нова цифра (один символ)
     */
    // function updateCard(card, next) {
    //     const top = card.querySelector('.flip-card__top span');
    //     const bottom = card.querySelector('.flip-card__bottom span');
    //     const fold = card.querySelector('.flip-card__fold span');
    //     const reveal = card.querySelector('.flip-card__reveal span');

    //     const current = top.textContent;

    //     if (current === next) return; // цифра не змінилась — нічого не робимо

    //     /* Готуємо стан перед анімацією */
    //     fold.textContent = current;   // верхня половина, яка "падає"
    //     reveal.textContent = next;      // нова нижня половина, яка "з'являється"

    //     top.textContent = next;      // вже оновлена верхня статична частина
    //     bottom.textContent = current;   // стара нижня статична частина (видна під час падіння)

    //     /* Перезапускаємо анімацію */
    //     card.classList.remove('flipping');
    //     // reflow — змушуємо браузер скинути стан анімації
    //     void card.offsetWidth;
    //     card.classList.add('flipping');

    //     /* Після завершення анімації оновлюємо нижню статичну частину */
    //     card.addEventListener(
    //         'animationend',
    //         function onEnd() {
    //             bottom.textContent = next;
    //             card.classList.remove('flipping');
    //             card.removeEventListener('animationend', onEnd);
    //         },
    //         { once: true }
    //     );
    // }
    function updateCard(card, next) {
        const top = card.querySelector('.flip-card__top span');
        const bottom = card.querySelector('.flip-card__bottom span');
        const fold = card.querySelector('.flip-card__fold span');
        const reveal = card.querySelector('.flip-card__reveal span');

        const current = top.textContent;
        if (current === next) return;

        fold.textContent = current;
        reveal.textContent = next;

        top.textContent = next;
        bottom.textContent = current;

        card.classList.remove('flipping');
        void card.offsetWidth;
        card.classList.add('flipping');

        // Оновлюємо bottom тільки після завершення reveal
        const onRevealEnd = () => {
            bottom.textContent = next;
            card.classList.remove('flipping');
            reveal.removeEventListener('animationend', onRevealEnd);
        };
        reveal.addEventListener('animationend', onRevealEnd);
    }

    /* ── Ініціалізація ───────────────────────────────── */

    function init() {
        const cards = {
            h1: document.getElementById('fc-h1'),
            h2: document.getElementById('fc-h2'),
            m1: document.getElementById('fc-m1'),
            m2: document.getElementById('fc-m2'),
            s1: document.getElementById('fc-s1'),
            s2: document.getElementById('fc-s2'),
        };

        /* Перевіряємо, що всі елементи знайдені */
        const allFound = Object.values(cards).every(Boolean);
        if (!allFound) {
            console.warn('[header.clock.js] Деякі елементи #fc-* не знайдені в DOM.');
            return;
        }

        function tick() {
            const now = new Date();
            const hh = pad(now.getHours());
            const mm = pad(now.getMinutes());
            const ss = pad(now.getSeconds());

            updateCard(cards.h1, hh[0]);
            updateCard(cards.h2, hh[1]);
            updateCard(cards.m1, mm[0]);
            updateCard(cards.m2, mm[1]);
            updateCard(cards.s1, ss[0]);
            updateCard(cards.s2, ss[1]);
        }

        /* Перший рендер — миттєво, без анімації */
        (function firstRender() {
            const now = new Date();
            const hh = pad(now.getHours());
            const mm = pad(now.getMinutes());
            const ss = pad(now.getSeconds());

            const digits = [hh[0], hh[1], mm[0], mm[1], ss[0], ss[1]];
            const keys = ['h1', 'h2', 'm1', 'm2', 's1', 's2'];

            keys.forEach(function (key, i) {
                const card = cards[key];
                card.querySelector('.flip-card__top    span').textContent = digits[i];
                card.querySelector('.flip-card__bottom span').textContent = digits[i];
                card.querySelector('.flip-card__fold   span').textContent = digits[i];
                card.querySelector('.flip-card__reveal span').textContent = digits[i];
            });
        })();

        /* Синхронізуємо перший тік з початком наступної секунди */
        const msToNextSec = 1000 - (Date.now() % 1000);
        setTimeout(function () {
            tick();
            setInterval(tick, 1000);
        }, msToNextSec);
    }

    /* Запускаємо після завантаження DOM */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();