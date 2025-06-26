/**
 * script.js - Funcionalidades para la visualización de informes Power BI
 * Analysis Center - Optimizado para dispositivos móviles y escritorio
 * 
 * Organizado en módulos lógicos para mejor mantenimiento
 * Mejorado el rendimiento y legibilidad
 */

document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // CONSTANTES Y VARIABLES GLOBALES
  // =============================================
  const DOM = {
    reportFrame: document.getElementById('report-frame'),
    loaderContainer: document.getElementById('loader-container'),
    container: document.querySelector('.container'),
    header: document.querySelector('.header'),
    footer: document.querySelector('.footer'),
    helpButton: document.getElementById('help-button'),
    reloadButton: document.getElementById('reload-button'),
    themeToggleButton: document.getElementById('theme-toggle-button'),
    logoIcon: document.querySelector('.logo-icon')
  };

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  let resizeTimer;

  // =============================================
  // FUNCIONES DE UTILIDAD
  // =============================================
  
  /**
   * Debounce para optimizar eventos resize
   * @param {Function} callback - Función a ejecutar
   * @param {number} delay - Tiempo de espera en ms
   */
  function debounce(callback, delay) {
    return function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(callback, delay);
    };
  }

  // =============================================
  // FUNCIONES PRINCIPALES
  // =============================================

  /**
   * Maneja la carga del iframe y el loader
   */
  function initLoader() {
    function hideLoader() {
      if (DOM.loaderContainer) {
        DOM.loaderContainer.style.opacity = '0';
        setTimeout(() => {
          DOM.loaderContainer.style.display = 'none';
        }, 500);
      }
    }

    if (DOM.reportFrame) {
      DOM.reportFrame.addEventListener('load', hideLoader);
      setTimeout(hideLoader, isMobile ? 5000 : 8000);
    }
  }

  /**
   * Ajusta el layout según el dispositivo y orientación
   */
  function adjustLayout() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const isSmallHeight = window.innerHeight < 500;

    // Ajustes del contenedor principal
    if (isSmallHeight) {
      DOM.container.style.height = '100vh';
      DOM.container.style.width = '100%';
    } else if (isMobile) {
      DOM.container.style.height = '98vh';
      DOM.container.style.width = '98%';
    } else {
      DOM.container.style.height = '95vh';
      DOM.container.style.width = '95%';
    }

    // Ajustes para móviles en horizontal
    if (isMobile && isLandscape) {
      if (DOM.header) DOM.header.style.display = isSmallHeight ? 'none' : 'block';
      if (DOM.footer) DOM.footer.style.display = isSmallHeight ? 'none' : 'block';
    } else {
      if (DOM.header) DOM.header.style.display = 'block';
      if (DOM.footer) DOM.footer.style.display = 'block';
    }

    // Clases para estilos específicos
    document.body.classList.toggle('mobile-device', isMobile);
    document.body.classList.toggle('landscape', isLandscape);
  }

  /**
   * Maneja errores de carga del iframe
   */
  function initErrorHandling() {
    setTimeout(() => {
      if (DOM.loaderContainer && DOM.loaderContainer.style.display !== 'none') {
        showErrorModal();
      }
    }, isMobile ? 8000 : 10000);
  }

  /**
   * Muestra modal de error
   */
  function showErrorModal() {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
      <h3>Error al cargar el informe</h3>
      <p>No se pudo cargar el informe de Power BI. Por favor, intente nuevamente más tarde.</p>
      <p class="warning-text"><strong>Importante:</strong> No borre manualmente la caché o cookies del navegador.</p>
      <button id="retry-button">Reintentar</button>
    `;
    
    DOM.loaderContainer.innerHTML = '';
    DOM.loaderContainer.appendChild(errorMessage);
    
    document.getElementById('retry-button').addEventListener('click', () => location.reload());
  }

  /**
   * Configura interacciones táctiles para móviles
   */
  function initTouchInteractions() {
    if (!isMobile) return;

    // Prevenir zoom no deseado
    document.addEventListener('touchmove', (e) => {
      if (e.scale !== 1) e.preventDefault();
    }, { passive: false });

    // Manejar doble toque
    let lastTap = 0;
    DOM.reportFrame.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        e.stopPropagation();
      }
      lastTap = currentTime;
    });
  }

  /**
   * Muestra el modal de ayuda
   */
  function showHelpModal() {
    const modal = document.createElement('div');
    modal.className = 'help-modal';
    modal.innerHTML = `
      <div class="help-modal-content">
        <div class="help-modal-header">
          <h3><i class="fas fa-question-circle"></i> Ayuda</h3>
          <button class="close-button"><i class="fas fa-times"></i></button>
        </div>
        <div class="help-modal-body">
          <h4>Navegación del informe</h4>
          <p>Este visor muestra un informe interactivo de Power BI.</p>
          <h4>Consejos de uso</h4>
          <ul>
            <li>Haga clic en las leyendas para filtrar datos</li>
            <li>Use los filtros disponibles en el panel lateral</li>
            <li>En dispositivos móviles, gire el dispositivo para una mejor visualización</li>
          </ul>
          <h4>Problemas comunes</h4>
          <p>Si el informe no carga correctamente, intente recargar la página.</p>
          <p class="warning-text"><strong>No borre manualmente la caché o cookies del navegador</strong>.</p>
        </div>
        <div class="help-modal-footer">
          <button class="primary-button">Entendido</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => modal.classList.add('active'), 10);
    
    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      }, 300);
    }
    
    // Eventos para cerrar el modal
    modal.querySelector('.close-button').addEventListener('click', closeModal);
    modal.querySelector('.primary-button').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => e.target === modal && closeModal());
  }

  /**
   * Configura el efecto de desplazamiento del logo
   */
  function initLogoEffect() {
    if (!DOM.logoIcon) return;
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      DOM.logoIcon.style.transform = scrollPosition > 0 
        ? `translateY(${scrollPosition * 0.2}px) rotate(${scrollPosition * 0.1}deg)`
        : 'translateY(0) rotate(0)';
    });
  }

  // =============================================
  // CONFIGURACIÓN DE EVENTOS
  // =============================================

  // Botón de recarga
  if (DOM.reloadButton && DOM.reportFrame) {
    DOM.reloadButton.addEventListener('click', () => {
      DOM.reportFrame.src = DOM.reportFrame.src;
    });
  }

  // Botón de tema oscuro/claro
  if (DOM.themeToggleButton) {
    DOM.themeToggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = DOM.themeToggleButton.querySelector('i');
      icon.classList.toggle('fa-sun');
      icon.classList.toggle('fa-moon');
    });
  }

  // Botón de ayuda
  if (DOM.helpButton) {
    DOM.helpButton.addEventListener('click', showHelpModal);
  }

  // Eventos de ventana
  window.addEventListener('resize', debounce(adjustLayout, 100));
  window.addEventListener('orientationchange', () => setTimeout(adjustLayout, 200));

  // =============================================
  // INICIALIZACIÓN
  // =============================================
  document.body.classList.add(isMobile ? 'mobile-device' : 'desktop-device');
  
  initLoader();
  adjustLayout();
  initErrorHandling();
  initTouchInteractions();
  initLogoEffect();
});