# Argentina

Sitio estático de cinco páginas sobre la República Argentina: portada con la ficha del país, galería de doce postales, tabla de estadísticas y formulario de contacto. HTML, CSS y JavaScript sin frameworks ni build step.

**Demo:** https://leandrocarlino.github.io/Argentina-Page/

## Páginas

| Página | Contenido |
|---|---|
| `index.html` | Portada: datos rápidos y artículo sobre el país y su historia |
| `html/galeria.html` | Doce fotos de norte a sur, con epígrafe y texto alternativo |
| `html/tablas.html` | Estadísticas del país; en móvil la tabla se vuelve una ficha |
| `html/formulario.html` | Formulario de contacto de demostración |

## Características

- **Mobile-first de verdad**: navegación con botón accesible (`aria-expanded`), sin el hack de `:target` que hacía saltar la página.
- **Accesibilidad**: skip link real, `aria-current` en la página activa, foco visible, etiquetas asociadas y `alt` descriptivo en cada imagen.
- **Modo oscuro** automático según `prefers-color-scheme`.
- **Sin saltos de layout**: todas las imágenes declaran `width`/`height` y las de la galería usan `loading="lazy"`.
- **Formulario honesto**: no hay backend, así que muestra una confirmación y no envía datos a ningún lado.
- **CSS único**: una sola hoja de ~600 líneas reemplaza los bloques duplicados de 1024 px y 1440 px.

## Peso

| | Antes | Ahora |
|---|---|---|
| Assets | 11,9 MB | **0,86 MB** |
| Fotos | 1,82 MB (JPEG) | 0,79 MB (WebP) |

Se eliminaron dos archivos que ningún HTML referenciaba: el MP3 del himno (6,6 MB) y `borde-pag.png` (2,5 MB). Siguen disponibles en el historial de git.

## Estructura

```
.
├── index.html
├── css/estilo.css
├── js/main.js
├── img/            # 12 fotos + sol, todo en WebP
├── html/           # galería, tablas y formulario
└── favicon.svg
```

## Correrlo localmente

```bash
npx serve .
# o
python -m http.server 8000
```

## Créditos

El texto de la portada está adaptado de Wikipedia, bajo licencia [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/deed.es).
