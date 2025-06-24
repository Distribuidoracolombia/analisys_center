/**
 * version.js - Gestión de versiones para control de caché
 * 
 * Este archivo permite gestionar las versiones de los recursos (CSS, JS)
 * para forzar la recarga de archivos en caché cuando se realizan cambios.
 * 
 * Instrucciones:
 * 1. Incrementa la versión cada vez que hagas cambios significativos
 * 2. Ejecuta este script antes de subir los cambios a GitHub
 */

const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
  version: '1.0', // Incrementa esta versión cuando hagas cambios
  files: [
    'index.html'
  ]
};

// Función para actualizar las referencias de versión en los archivos
function updateVersionReferences() {
  console.log(`Actualizando referencias a versión ${CONFIG.version}...`);
  
  CONFIG.files.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      console.error(`Error: El archivo ${file} no existe.`);
      return;
    }
    
    // Leer el contenido del archivo
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Actualizar referencias a CSS
    content = content.replace(
      /(href=\"styles\.css\?v=)([0-9\.]+)(\")/g, 
      `$1${CONFIG.version}$3`
    );
    
    // Actualizar referencias a JS
    content = content.replace(
      /(src=\"script\.js\?v=)([0-9\.]+)(\")/g, 
      `$1${CONFIG.version}$3`
    );
    
    // Guardar el archivo actualizado
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Archivo ${file} actualizado correctamente.`);
  });
  
  console.log('\n¡Proceso completado! Ahora puedes subir los cambios a GitHub.');
  console.log('Recuerda incrementar la versión en este archivo para futuros cambios.');
}

// Ejecutar la actualización
updateVersionReferences();