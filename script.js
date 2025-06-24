/**
 * script.js - Funcionalidades para la visualización de informes Power BI
 * Analysis Center
 * Optimizado para dispositivos móviles y escritorio
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del DOM
  const reportFrame = document.getElementById('report-frame');
  const loaderContainer = document.getElementById('loader-container');
  const container = document.querySelector('.container');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  
  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
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
    // Tiempo más corto para móviles para mejorar la experiencia
    setTimeout(hideLoader, isMobile ? 5000 : 8000);
  }
  
  // Función para ajustar el tamaño del contenedor según el dispositivo y orientación
  function adjustContainerSize() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const isSmallHeight = window.innerHeight < 500;
    
    // Ajustar contenedor principal
    if (isSmallHeight) {
      container.style.height = '100vh';
      container.style.width = '100%';
    } else if (isMobile) {
      container.style.height = '98vh';
      container.style.width = '98%';
    } else {
      container.style.height = '95vh';
      container.style.width = '95%';
    }
    
    // Ajustes específicos para modo paisaje en móviles
    if (isMobile && isLandscape) {
      if (header) header.style.display = isSmallHeight ? 'none' : 'block';
      if (footer) footer.style.display = isSmallHeight ? 'none' : 'block';
    } else {
      if (header) header.style.display = 'block';
      if (footer) footer.style.display = 'block';
    }
    
    // Aplicar clase específica para móviles
    document.body.classList.toggle('mobile-device', isMobile);
    document.body.classList.toggle('landscape', isLandscape);
  }
  
  // Ajustar tamaño inicial
  adjustContainerSize();
  
  // Optimizar el evento resize con debounce para mejor rendimiento
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(adjustContainerSize, 100);
  });
  
  // Detectar cambios de orientación específicamente en dispositivos móviles
  window.addEventListener('orientationchange', function() {
    // Pequeño retraso para asegurar que las dimensiones se actualicen
    setTimeout(adjustContainerSize, 200);
  });
  
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
    }, isMobile ? 8000 : 10000); // Tiempo más corto para móviles
  }
  
  // Iniciar verificación de errores
  handleIframeError();
  
  // Prevenir zoom en dispositivos táctiles para mejor experiencia con el informe
  if (isMobile) {
    document.addEventListener('touchmove', function(event) {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    }, { passive: false });
    
    // Doble toque para hacer zoom en el informe (solo en el iframe)
    let lastTap = 0;
    reportFrame.addEventListener('touchend', function(event) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        // Permitir que el evento de doble toque llegue al iframe
        event.stopPropagation();
      }
      lastTap = currentTime;
    });
  }
});