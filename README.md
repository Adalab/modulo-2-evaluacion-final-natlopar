# Buscador series de Anime

![Buscador de series Anime](/public/images/buscador1.png)

Hola! 👩‍💻

Este es mi proyecto de evaluación del segundo módulo de Adalab, correspondiente a **Javascript**.

## Objetivo

Desarrollar una aplicación web de búsqueda de series de anime, que nos permita, tras la búsqueda de la serie elegida por la usuaria,
des/marcar las elegidas como favoritas y guardarlas en Local Storage.


## Funcionalidades

Las funcionalidades de esta página web son las siguientes:

- Obtención de las series elegidas por la usuaria a través de un API, tras introducir el nombre de la serie en un buscador.
- Posibilidad de añadirlas a un listado de favoritos, seleccionándolas una a una y cambiando así su estilo.
- Almacenamiento del listado de favoritos en Local Storage, de manera que podamos acceder a este listado aunque la usuaria haya cerrado la página y la haya vuelto a abrir, y aparezcan automáticamente en su listado correspondiente al recargar la página.
- Posibilidad de eliminar las series favoritas una a una desde el listado de favoritas o seleccionándolas directamente desde el listado de resultados. También se pueden borrar las favoritas mediante el botón "Eliminar Favoritos".
- Al retirar una serie del listado de favoritos, su estilo vuelve al original en el listado de resultados.
- Botón de "Reset" para vaciar los listados, el Local Storage y el input.

## Maquetación

Es un proyecto desarrollado con Sass y con diseño responsive.

**Mobile**
![Buscador de series Anime](/public/images/buscador3.png)

**Tablet**
![Buscador de series Anime](/public/images/buscador2.png)


## Guía de uso rápido

Este proyecto incluye un Kit que contiene un motor de plantillas HTML, el preprocesador SASS y un servidor local y muchas cosas más.

En el Kit hay 3 tipos de ficheros y carpetas:

- Los ficheros que están sueltos en la raíz del repositorio, como vite.config.js, package.json... Son la configuración del proyecto y no necesitamos modificarlos (excepto este README.md, para describir tu proyecto).
- La carpeta `src/`: son los ficheros de nuestra página web, como HTML, CSS, JS...
- La carpeta `public/`, que tiene fichero estáticos como imágenes, fuentes, favicon, librerías de JavaScript antiguas (jQuery, ...)
- Y la carpeta `docs/`, que es generada automáticamente cuando arrancamos el proyecto. El Kit lee los ficheros que hay dentro de `src/` y `public/`, los procesa y los genera dentro de `public/` y `docs/`.



> **NOTA:** Necesitas tener instalado [Node JS](https://nodejs.org/) con una versión superior a la 14 para trabajar con este Starter Kit:


### Pasos para arrancar el proyecto:

**Instala las dependencias** locales ejecutando en la terminal el comando:

```bash
npm install
```
Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **El proyecto hay que arrancarlo cada vez que te pongas a programar.** Para ello ejecuta el comando:

```bash
npm run dev
```

Este comando:

- **Abre una ventana de Chrome y muestra tu página web**.
- También **observa** todos los ficheros que hay dentro de la carpeta `src/`, para que cada vez que modifiques un fichero **refresca tu página en Chrome**.
- También **procesa los ficheros** HTML, SASS / CSS y JS. Por ejemplo:
   - Convierte los ficheros SASS en CSS.
   - Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `npm run dev` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar cómodamente.

### Pasos para publicar el proyecto en GitHub Pages:

Para generar tu página para producción ejecuta el comando:

```bash
npm run build
```

Y a continuación:

1. Sube a tu repo la carpeta `docs/` que se te acaba de generar.
1. Entra en la pestaña `settings` de tu repo.
1. Y en el apartado de GitHub Pages activa la opción **master branch /docs folder**.
1. Y ya estaría!!!

Además, los comandos:

```bash
npm run push-docs
```
o

```bash
npm run deploy
```

son un atajo que nos genera la versión de producción y hace push de la carpeta `docs/` del tirón. Te recomendamos ver el fichero `package.json` para aprender cómo funciona.


## Estructura de carpetas

La estructura de carpetas tiene esta pinta:

```
src
 ├─ js // los ficheros de esta carpeta se concatenan en el fichero main.js y este se guarda en public/main.js
 |  ├─ main.js
 |  └─ partials.js
 ├─ scss
 |  ├─ core
 |  ├─ layout
 └─ index.html
```

