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

  /* ---------------------------------------------------------------------
     Provincias: filtro por región + mapa
     --------------------------------------------------------------------- */

  const grid = document.getElementById("prov-grid");
  if (grid) {
    const chips = [...document.querySelectorAll(".chip")];
    const cards = [...grid.querySelectorAll(".prov")];
    const counter = document.getElementById("prov-count");

    const applyFilter = (region) => {
      let shown = 0;

      cards.forEach((card) => {
        const match = region === "all" || card.dataset.region === region;
        card.hidden = !match;
        if (match) shown += 1;
      });

      chips.forEach((chip) => {
        chip.setAttribute("aria-pressed", String(chip.dataset.filter === region));
      });

      if (counter) {
        counter.textContent = `${shown} ${shown === 1 ? "provincia" : "provincias"}`;
      }
    };

    chips.forEach((chip) => {
      chip.addEventListener("click", () => applyFilter(chip.dataset.filter));
    });

    // Si se llega desde el mapa con un filtro puesto, se muestra la tarjeta.
    document.querySelectorAll(".map a").forEach((link) => {
      link.addEventListener("click", () => {
        const card = document.getElementById(link.getAttribute("href").slice(1));
        if (card && card.hidden) applyFilter("all");
      });
    });
  }
  /* ---------------------------------------------------------------------
     Galería: lightbox
     --------------------------------------------------------------------- */

  const gallery = document.querySelector(".gallery");
  if (gallery && typeof HTMLDialogElement !== "undefined") {
    const figures = [...gallery.querySelectorAll("figure")];

    const items = figures.map((figure) => {
      const img = figure.querySelector("img");
      return {
        src: img.getAttribute("src"),
        alt: img.alt,
        caption: figure.querySelector("figcaption")?.textContent.trim() ?? "",
      };
    });

    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Galería de imágenes");
    dialog.innerHTML = `
      <figure class="lightbox__figure">
        <img class="lightbox__img" alt="">
        <figcaption class="lightbox__caption"></figcaption>
      </figure>
      <button class="lightbox__close" type="button" aria-label="Cerrar">&times;</button>
      <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Imagen anterior">&#8249;</button>
      <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Imagen siguiente">&#8250;</button>
      <p class="lightbox__count" aria-live="polite"></p>
    `;
    document.body.append(dialog);

    const image = dialog.querySelector(".lightbox__img");
    const caption = dialog.querySelector(".lightbox__caption");
    const counter = dialog.querySelector(".lightbox__count");
    let current = 0;

    const render = () => {
      const item = items[current];
      image.src = item.src;
      image.alt = item.alt;
      caption.textContent = item.caption;
      counter.textContent = `${current + 1} / ${items.length}`;
    };

    const open = (index) => {
      current = index;
      render();
      dialog.showModal();
    };

    const step = (delta) => {
      current = (current + delta + items.length) % items.length;
      render();
    };

    figures.forEach((figure, index) => {
      const img = figure.querySelector("img");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "shot";
      button.setAttribute("aria-label", `Ampliar imagen: ${img.alt}`);
      img.replaceWith(button);
      button.append(img);
      button.addEventListener("click", () => open(index));
    });

    dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".lightbox__nav--prev").addEventListener("click", () => step(-1));
    dialog.querySelector(".lightbox__nav--next").addEventListener("click", () => step(1));

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
})();
