/* ==========================================================================
   Argentina — comportamiento
   Sin dependencias. Si el JS no carga, el menú queda visible y el formulario
   sigue siendo válido (solo no muestra la confirmación).
   ========================================================================== */

(() => {
  "use strict";

  const DESKTOP = window.matchMedia("(min-width: 48rem)");
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.getElementById("menu-principal");

  if (menuBtn && nav) {
    const setMenu = (open) => {
      nav.hidden = !open;
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };

    const syncLayout = () => setMenu(DESKTOP.matches);

    syncLayout();
    DESKTOP.addEventListener("change", syncLayout);

    menuBtn.addEventListener("click", () => {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a") && !DESKTOP.matches) setMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !DESKTOP.matches && !nav.hidden) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  const form = document.querySelector("form[data-demo]");
  if (form) {
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nombre = form.elements.nombre?.value.trim();
      const mensaje = nombre
        ? `Gracias, ${nombre}. Este formulario es una demostración: no se envió ningún dato.`
        : "Este formulario es una demostración: no se envió ningún dato.";

      form.reset();

      if (status) {
        status.textContent = mensaje;
        status.hidden = false;
      }
    });

    form.addEventListener("reset", () => {
      if (status) {
        status.hidden = true;
        status.textContent = "";
      }
    });
  }
})();
