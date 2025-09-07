// /js/shared-lang.js
const getLangFromStorageOrQuery = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get('lang');
    if (queryLang) {
      localStorage.setItem('lang', queryLang);
      return queryLang;
    }
    return localStorage.getItem('lang') || 'en';
  };
  
  const updateLangLinks = () => {
    const lang = getLangFromStorageOrQuery();
    document.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.includes('#')) {
        const url = new URL(href, window.location.origin);
        url.searchParams.set('lang', lang);
        link.setAttribute('href', url.pathname + url.search);
      }
    });
  };
  
  const initLanguageToggle = (toggleBtnId, applyTranslationCallback) => {
    const toggleBtn = document.getElementById(toggleBtnId);
    if (!toggleBtn) return;
  
    let isGerman = getLangFromStorageOrQuery() === 'de';
    toggleBtn.textContent = isGerman ? '🇬🇧' : '🇩🇪';
  
    toggleBtn.addEventListener('click', () => {
      isGerman = !isGerman;
      const lang = isGerman ? 'de' : 'en';
      localStorage.setItem('lang', lang);
  
      // Update all links to include the new lang param
      updateLangLinks();
  
      // Reload with new lang param to sync across pages
      const url = new URL(window.location);
      url.searchParams.set('lang', lang);
      window.location.href = url.pathname + url.search;
    });
  
    if (typeof applyTranslationCallback === 'function') {
      applyTranslationCallback(isGerman);
    }
    updateLangLinks();
  };
  