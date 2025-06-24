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
├── service-worker.js   # Service Worker para caché y funcionalidad offline
├── version.js          # Script para gestionar versiones y caché
├── package.json        # Configuración del proyecto y scripts
├── .gitignore          # Configuración de archivos ignorados por Git
├── .nojekyll           # Archivo para deshabilitar el procesamiento Jekyll en GitHub Pages
└── README.md           # Documentación del proyecto
```

## Tecnologías Utilizadas
- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla
- Service Worker para caché y funcionalidad offline
- Google Fonts (Roboto)
- Font Awesome para iconos
- Power BI Embedded

## Instalación y Uso

1. Clona o descarga este repositorio
2. Si tienes Node.js instalado, puedes utilizar los scripts definidos en `package.json`:

   ```bash
   # Instalar dependencias (si se añaden en el futuro)
   npm install
   
   # Iniciar un servidor local
   npm start
   
   # Actualizar las versiones para control de caché
   npm run update-version
   ```

3. Si no tienes Node.js, simplemente abre el archivo `index.html` en tu navegador web

Alternativamente, puedes desplegar los archivos en cualquier servidor web o seguir las instrucciones de la sección "Despliegue en GitHub Pages".

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

## Despliegue en GitHub Pages

### Subir el Código a GitHub

Para subir el código a GitHub y utilizar GitHub Pages para servir la aplicación (lo que ayudará a que las cookies guarden los cambios correctamente), sigue estos pasos:

1. **Crear un repositorio en GitHub**:
   - Inicia sesión en tu cuenta de GitHub
   - Haz clic en el botón "+" en la esquina superior derecha y selecciona "New repository"
   - Nombra tu repositorio (por ejemplo, "power-bi-viewer")
   - Selecciona si quieres que sea público o privado
   - Haz clic en "Create repository"

2. **Inicializar Git en tu proyecto local**:
   ```bash
   # Navega a la carpeta de tu proyecto
   cd "ruta/a/tu/proyecto"
   
   # Inicializa Git
   git init
   
   # Añade todos los archivos al staging
   git add .
   
   # Crea el primer commit
   git commit -m "Versión inicial"
   ```

3. **Conectar y subir a GitHub**:
   ```bash
   # Conecta tu repositorio local con el remoto (reemplaza USER y REPO)
   git remote add origin https://github.com/USER/REPO.git
   
   # Sube los cambios a GitHub
   git push -u origin master
   # O si usas 'main' como rama principal:
   # git push -u origin main
   ```

### Configurar GitHub Pages

1. **Habilitar GitHub Pages**:
   - Ve a la página de tu repositorio en GitHub
   - Haz clic en "Settings" (Configuración)
   - Desplázate hacia abajo hasta la sección "GitHub Pages"
   - En "Source", selecciona la rama principal ("master" o "main")
   - Haz clic en "Save"
   - El archivo `.nojekyll` ya está incluido en el proyecto para asegurar que GitHub Pages sirva los archivos sin procesamiento Jekyll

2. **Acceder a tu sitio**:
   - Después de unos minutos, tu sitio estará disponible en:
   - `https://TU-USUARIO.github.io/NOMBRE-REPOSITORIO/`

### Ventajas para la Gestión de Cookies y Caché

1. **Dominio Consistente**:
   - Al servir tu aplicación desde GitHub Pages, obtendrás un dominio consistente (`github.io`)
   - Esto permite que las cookies se almacenen correctamente y persistan entre sesiones

2. **HTTPS por Defecto**:
   - GitHub Pages sirve el contenido a través de HTTPS
   - Las cookies seguras funcionan correctamente sin problemas de políticas de seguridad

3. **Actualización Sencilla**:
   - Para actualizar tu aplicación, simplemente haz commit de los cambios y súbelos a GitHub:
   ```bash
   git add .
   git commit -m "Actualización: descripción del cambio"
   git push
   ```
   - Los cambios se reflejarán automáticamente en GitHub Pages sin necesidad de borrar cookies manualmente

4. **Sistema de Versionado**:
   - Este proyecto incluye un sistema de versionado para evitar problemas de caché:
   - Los archivos CSS y JS ya incluyen parámetros de versión:
   ```html
   <link rel="stylesheet" href="styles.css?v=1.0">
   <script src="script.js?v=1.0"></script>
   ```
   - Para actualizar las versiones automáticamente, utiliza el script `version.js`:
   ```bash
   # Instala Node.js si no lo tienes instalado
   # Luego ejecuta:
   node version.js
   ```
   - Antes de ejecutar el script, edita la versión en el archivo `version.js`:
   ```javascript
   const CONFIG = {
     version: '1.1', // Incrementa esta versión cuando hagas cambios
     files: [
       'index.html'
     ]
   };
   ```

5. **Service Worker para Gestión de Caché**:
   - El proyecto incluye un Service Worker (`service-worker.js`) que:
     - Almacena en caché los recursos estáticos (HTML, CSS, JS, fuentes)
     - Mejora el rendimiento al servir recursos desde la caché
     - Proporciona funcionalidad básica offline
     - Actualiza automáticamente la caché cuando hay cambios
   - Beneficios específicos:
     - Carga más rápida después de la primera visita
     - Menor consumo de datos
     - Funcionamiento parcial sin conexión a internet
     - Actualización automática cuando hay nuevas versiones

## Licencia
Este proyecto está disponible como código abierto bajo la licencia MIT.

## Contacto
Para preguntas o soporte, contacta a [tu_email@ejemplo.com].