/**
 * script.js - Funcionalidades para la visualización de informes Power BI
 * Analysis Center - Optimizado para dispositivos móviles y escritorio
 * Diseño moderno y experiencia de usuario mejorada
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del DOM
  const reportFrame = document.getElementById('report-frame');
  const loaderContainer = document.getElementById('loader-container');
  const container = document.querySelector('.container');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const helpButton = document.getElementById('help-button');
  
  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Añadir clase al body para identificar el tipo de dispositivo
  document.body.classList.add(isMobile ? 'mobile-device' : 'desktop-device');
  
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
  
  // Funcionalidad del botón de ayuda
  if (helpButton) {
    helpButton.addEventListener('click', function() {
      showHelpModal();
    });
  }
  
  // Función para mostrar el modal de ayuda
  function showHelpModal() {
    // Crear el modal de ayuda
    const modal = document.createElement('div');
    modal.className = 'help-modal';
    
    // Contenido del modal
    modal.innerHTML = `
      <div class="help-modal-content">
        <div class="help-modal-header">
          <h3><i class="fas fa-question-circle"></i> Ayuda</h3>
          <button class="close-button"><i class="fas fa-times"></i></button>
        </div>
        <div class="help-modal-body">
          <h4>Navegación del informe</h4>
          <p>Este visor muestra un informe interactivo de Power BI. Puede interactuar con los gráficos y tablas haciendo clic en ellos.</p>
          
          <h4>Consejos de uso</h4>
          <ul>
            <li>Haga clic en las leyendas para filtrar datos</li>
            <li>Use los filtros disponibles en el panel lateral</li>
            <li>En dispositivos móviles, gire el dispositivo para una mejor visualización</li>
          </ul>
          
          <h4>Problemas comunes</h4>
          <p>Si el informe no carga correctamente, intente recargar la página o contacte con soporte técnico.</p>
        </div>
        <div class="help-modal-footer">
          <button class="primary-button">Entendido</button>
        </div>
      </div>
    `;
    
    // Añadir el modal al body
    document.body.appendChild(modal);
    
    // Prevenir scroll en el body mientras el modal está abierto
    document.body.style.overflow = 'hidden';
    
    // Mostrar el modal con animación
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    
    // Cerrar el modal al hacer clic en el botón de cerrar o en el botón primario
    const closeButton = modal.querySelector('.close-button');
    const primaryButton = modal.querySelector('.primary-button');
    
    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      }, 300);
    }
    
    closeButton.addEventListener('click', closeModal);
    primaryButton.addEventListener('click', closeModal);
    
    // Cerrar el modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
  
  // Añadir efecto de desplazamiento suave para el encabezado
  const logoIcon = document.querySelector('.logo-icon');
  if (logoIcon) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        logoIcon.style.transform = `translateY(${scrollPosition * 0.2}px) rotate(${scrollPosition * 0.1}deg)`;
      } else {
        logoIcon.style.transform = 'translateY(0) rotate(0)';
      }
    });
  }
});