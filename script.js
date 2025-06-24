/**
 * script.js - Funcionalidades para la visualización de informes Power BI
 * Analysis Center
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del DOM
  const reportFrame = document.getElementById('report-frame');
  const loaderContainer = document.getElementById('loader-container');
  
  // Función para ocultar el loader cuando el iframe ha cargado
  function hideLoader() {
    if (loaderContainer) {
      loaderContainer.style.opacity = '0';
      setTimeout(() => {
        loaderContainer.style.display = 'none';
      }, 500);
    }
  }
  
  // Evento para detectar cuando el iframe ha cargado
  if (reportFrame) {
    reportFrame.addEventListener('load', hideLoader);
    
    // Timeout de seguridad (por si el evento load no se dispara)
    setTimeout(hideLoader, 8000);
  }
  
  // Función para ajustar el tamaño del contenedor en dispositivos móviles
  function adjustContainerSize() {
    const container = document.querySelector('.container');
    if (window.innerHeight < 500) {
      container.style.height = '98vh';
    } else {
      container.style.height = '95vh';
    }
  }
  
  // Ajustar tamaño inicial
  adjustContainerSize();
  
  // Ajustar tamaño cuando cambia el tamaño de la ventana
  window.addEventListener('resize', adjustContainerSize);
  
  // Función para manejar errores de carga del iframe
  function handleIframeError() {
    // Si después de 10 segundos el loader sigue visible, asumimos un error
    setTimeout(() => {
      if (loaderContainer && loaderContainer.style.display !== 'none') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
          <h3>Error al cargar el informe</h3>
          <p>No se pudo cargar el informe de Power BI. Por favor, intente nuevamente más tarde.</p>
          <button id="retry-button">Reintentar</button>
        `;
        
        loaderContainer.innerHTML = '';
        loaderContainer.appendChild(errorMessage);
        
        // Botón para reintentar
        document.getElementById('retry-button').addEventListener('click', function() {
          location.reload();
        });
      }
    }, 10000);
  }
  
  // Iniciar verificación de errores
  handleIframeError();
});