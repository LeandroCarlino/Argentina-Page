# Argentina

Sitio estático de cinco páginas sobre la República Argentina: portada con la ficha del país y una línea de tiempo, mapa político interactivo con las 24 jurisdicciones, galería de doce postales, tabla de estadísticas y formulario de contacto. HTML, CSS y JavaScript sin frameworks ni build step.

**Demo:** https://leandrocarlino.github.io/Argentina-Page/

## Páginas

| Página | Contenido |
|---|---|
| `index.html` | Datos rápidos, artículo sobre el país y su historia, y línea de tiempo |
| `html/provincias.html` | Mapa interactivo + las 24 jurisdicciones, con filtro por región |
| `html/galeria.html` | Doce fotos de norte a sur, con lightbox y epígrafe |
| `html/tablas.html` | Ficha del país, población por censo y las 24 jurisdicciones |
| `html/formulario.html` | Formulario de contacto de demostración |

## Características

- **Mapa político interactivo** generado desde el GeoJSON oficial del IGN, simplificado a ~25 KB de SVG inline. Cada provincia enlaza a su ficha; el filtro por región (NOA, NEA, Cuyo, Pampeana, Patagonia, CABA) actualiza el listado y el contador en vivo.
- **Lightbox** sobre `<dialog>` nativo: foco gestionado, `Escape`, flechas ←/→, contador y vuelta al punto de origen.
- **Línea de tiempo** de 1516 a 2001 integrada en la portada.
- **Estadísticas** en tres tablas: ficha del país (14 indicadores), población en los once censos nacionales desde 1869 con variación intercensal y barra proporcional, y las 24 jurisdicciones ordenadas por población con densidad calculada. En móvil solo las tablas de datos se convierten en fichas; la de dos columnas sigue siendo tabla.
- **Mobile-first**: menú con botón accesible (`aria-expanded`), tabla que se convierte en ficha, mapa y grilla a una columna.
- **Accesibilidad**: skip link, `aria-current`, `aria-pressed`, `aria-live`, foco visible y `prefers-reduced-motion`.
- **Modo oscuro** automático según `prefers-color-scheme`.
- **Imágenes responsables**: WebP con `srcset`/`sizes` (versiones de 400 y 650 px), `width`/`height` declarados y `loading="lazy"` fuera de la primera pantalla.
- **Sin saltos de layout**: todas las imágenes reservan su espacio.

## Peso

| | Antes | Ahora |
|---|---|---|
| Repositorio | 11,98 MB | **1,36 MB** |
| Fotos de la galería | 1,82 MB (JPEG) | 0,79 MB (WebP 650) + 0,29 MB (WebP 400) |

Se eliminaron dos archivos que ningún HTML referenciaba: el MP3 del himno (6,6 MB) y `borde-pag.png` (2,5 MB). Siguen disponibles en el historial de git.

En un móvil se descargan **296 KB** de fotos en vez de 808 KB, porque `srcset` sirve las variantes de 400 px.

## SEO y publicación

- `og:image` de 1200×630 para las previsualizaciones al compartir.
- JSON-LD `Country` en la portada.
- `sitemap.xml`, `robots.txt` y página `404.html` (con rutas absolutas, como requiere GitHub Pages).

## Estructura

```
.
├── index.html
├── 404.html
├── sitemap.xml · robots.txt · favicon.svg · apple-touch-icon.png
├── css/estilo.css
├── js/main.js
├── img/            # fotos en WebP (650 y 400), sol y og:image
└── html/           # provincias, galería, tablas y formulario
```

## Correrlo localmente

```bash
npx serve .
# o
python -m http.server 8000
```

## Fuentes

- Población por jurisdicción: **INDEC**, Censo Nacional de Población, Hogares y Viviendas 2022.
- Superficies y límites provinciales: **Instituto Geográfico Nacional** (IGN), vía el servicio WFS público `wms.ign.gob.ar`.
- Texto de la portada: adaptado de Wikipedia, bajo licencia [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/deed.es).
