# Visualizador de Informes Power BI

## Descripción
Este proyecto proporciona una interfaz web optimizada para la visualización de informes de Power BI. Está diseñado siguiendo las mejores prácticas de desarrollo web, con un enfoque en la accesibilidad, rendimiento y experiencia de usuario.

## Características
- **Diseño Responsive**: Se adapta a cualquier tamaño de pantalla, desde dispositivos móviles hasta monitores de escritorio.
- **Optimización de Rendimiento**: Carga diferida (lazy loading) de recursos y optimización de CSS/JS.
- **Accesibilidad**: Implementación de ARIA labels y elementos semánticos para mejorar la accesibilidad.
- **Experiencia de Usuario Mejorada**: Indicador de carga, manejo de errores y transiciones suaves.

## Estructura del Proyecto

```
├── index.html          # Archivo HTML principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Documentación del proyecto
```

## Tecnologías Utilizadas
- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla
- Google Fonts (Roboto)
- Power BI Embedded

## Instalación y Uso

1. Clona o descarga este repositorio
2. Abre el archivo `index.html` en tu navegador web

Alternativamente, puedes desplegar los archivos en cualquier servidor web.

## Personalización

### Cambiar el Informe de Power BI
Para cambiar el informe que se muestra, modifica el atributo `src` del iframe en el archivo `index.html`:

```html
<iframe 
  id="report-frame"
  class="report-frame"
  title="Informe de análisis de datos"
  src="TU_URL_DE_POWER_BI_AQUÍ"
  allowFullScreen="true"
  loading="lazy"
  aria-label="Informe interactivo de Power BI">
</iframe>
```

### Modificar Estilos
Los estilos se pueden personalizar editando el archivo `styles.css`. Las variables CSS en la sección `:root` permiten cambiar fácilmente los colores y otras propiedades:

```css
:root {
  --color-background: #f4f4f4;
  --color-text: #333333;
  --color-primary: #0078d4;
  --color-secondary: #2b88d8;
  --color-accent: #106ebe;
  --color-shadow: rgba(0, 0, 0, 0.3);
  --font-primary: 'Roboto', Arial, sans-serif;
  --border-radius: 10px;
  --transition-speed: 0.3s;
}
```

## Mejores Prácticas Implementadas

1. **Separación de Responsabilidades**:
   - HTML para estructura
   - CSS para presentación
   - JavaScript para comportamiento

2. **Optimización de Rendimiento**:
   - Carga diferida de recursos
   - Minimización de reflows y repaints
   - Uso eficiente de eventos

3. **Accesibilidad**:
   - Estructura semántica
   - ARIA labels
   - Contraste adecuado
   - Elementos ocultos para lectores de pantalla

4. **Mantenibilidad**:
   - Código comentado
   - Variables CSS para fácil personalización
   - Estructura de archivos clara

## Licencia
Este proyecto está disponible como código abierto bajo la licencia MIT.

## Contacto
Para preguntas o soporte, contacta a [tu_email@ejemplo.com].