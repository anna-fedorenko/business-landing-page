import("./header.clock.js");
import("./global.header_hero.js");
import("./global.footer.partial.js");
import("./scroll-to-top-partial.js");

function init() {
    import("./global.header_hero.js");
    import("./scroll-to-top.partial.js").then(module => {
        module.initScrollToTop();
    });
}

const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]',
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});