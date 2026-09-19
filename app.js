/**
 * Generador de Enlaces WhatsApp
 * Lógica principal, buscador de países, tema oscuro y eventos
 */

// Estado global de la aplicación
const AppState = {
  selectedCountry: null,
  autoGenerateTimeout: null,
  highlightedIndex: -1,
  filteredCountries: [],
  qrInstance: null,
};

// Países prioritarios en dial codes compartidos
const PRIMARY_COUNTRY_CODES = {
  '1': 'US',
  '7': 'RU',
  '47': 'NO',
  '61': 'AU',
  '212': 'MA',
  '262': 'RE',
  '672': 'NF',
};

// Placeholders sugeridos por país
const PHONE_PLACEHOLDERS = {
  CO: 'Ej: 300 123 4567',
  MX: 'Ej: 55 1234 5678',
  ES: 'Ej: 612 345 678',
  US: 'Ej: 555 123 4567',
  AR: 'Ej: 11 2345 6789',
  CL: 'Ej: 9 1234 5678',
  PE: 'Ej: 912 345 678',
  VE: 'Ej: 412 123 4567',
  EC: 'Ej: 99 123 4567',
  DO: 'Ej: 809 123 4567',
  GT: 'Ej: 5123 4567',
  PA: 'Ej: 6123 4567',
  CR: 'Ej: 8123 4567',
  UY: 'Ej: 91 234 567',
  BO: 'Ej: 7123 4567',
  PY: 'Ej: 981 123 456',
  BR: 'Ej: 11 91234 5678',
};

/* ==========================================================================
   TEMA OSCURO / CLARO
   ========================================================================== */

function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  const toggle = document.getElementById('darkModeToggle');

  if (isDark) {
    html.classList.remove('dark');
    if (toggle) toggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'false');
  } else {
    html.classList.add('dark');
    if (toggle) toggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'true');
  }
}

function initializeDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  const toggle = document.getElementById('darkModeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedMode === 'true' || (!savedMode && prefersDark)) {
    document.documentElement.classList.add('dark');
    if (toggle) toggle.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    if (toggle) toggle.textContent = '🌙';
  }
}

/* ==========================================================================
   UTILIDADES
   ========================================================================== */

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function cleanPhoneNumber(phone) {
  return (phone || '').replace(/\D/g, '');
}

/* ==========================================================================
   SELECTOR Y BUSCADOR DE PAÍSES
   ========================================================================== */

function initializeCountrySelector() {
  const countryList = typeof COUNTRIES !== 'undefined' ? COUNTRIES : [];
  if (countryList.length === 0) return;

  // 1. Sincronizar select nativo para máxima compatibilidad
  const nativeSelect = document.getElementById('countryCode');
  if (nativeSelect) {
    nativeSelect.innerHTML = '';
    countryList.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c.dial;
      opt.dataset.iso = c.iso;
      opt.textContent = `${c.flag} ${c.name} (+${c.dial})`;
      nativeSelect.appendChild(opt);
    });
  }

  // 2. Determinar país inicial
  let initialCountry = null;
  const savedIso = localStorage.getItem('lastCountryIso');
  const savedCode = localStorage.getItem('lastCountryCode');

  if (savedIso) {
    initialCountry = countryList.find((c) => c.iso === savedIso);
  }
  if (!initialCountry && savedCode) {
    initialCountry = countryList.find((c) => c.dial === savedCode);
  }
  if (!initialCountry) {
    // Intentar detectar por locale de usuario
    try {
      const locale = (navigator.language || '').split('-')[1];
      if (locale) {
        initialCountry = countryList.find((c) => c.iso === locale.toUpperCase());
      }
    } catch (e) {}
  }
  // Por defecto Colombia (origen del proyecto)
  if (!initialCountry) {
    initialCountry = countryList.find((c) => c.iso === 'CO') || countryList[0];
  }

  selectCountry(initialCountry, false);

  // 3. Event Listeners del selector
  const pickerBtn = document.getElementById('countryPickerButton');
  const dropdownPanel = document.getElementById('countryDropdownPanel');
  const searchInput = document.getElementById('countrySearchInput');
  const searchClear = document.getElementById('countrySearchClear');
  const resetBtn = document.getElementById('resetSearchBtn');

  if (pickerBtn) {
    pickerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCountryDropdown();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (searchClear) {
        searchClear.classList.toggle('hidden', query.length === 0);
      }
      filterCountries(query);
    });

    searchInput.addEventListener('keydown', handleSearchKeydown);
  }

  if (searchClear) {
    searchClear.addEventListener('click', (e) => {
      e.stopPropagation();
      clearSearch();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearSearch();
    });
  }

  // Chips de países frecuentes
  document.querySelectorAll('.quick-country-chip').forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const iso = chip.dataset.countryIso;
      const country = countryList.find((c) => c.iso === iso);
      if (country) {
        selectCountry(country, true);
      }
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('countrySelectorWrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      closeCountryDropdown();
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCountryDropdown();
    }
  });
}

function toggleCountryDropdown() {
  const dropdownPanel = document.getElementById('countryDropdownPanel');
  if (!dropdownPanel) return;

  const isHidden = dropdownPanel.classList.contains('hidden');
  if (isHidden) {
    openCountryDropdown();
  } else {
    closeCountryDropdown();
  }
}

function openCountryDropdown() {
  const dropdownPanel = document.getElementById('countryDropdownPanel');
  const pickerBtn = document.getElementById('countryPickerButton');
  const arrow = document.getElementById('countryDropdownArrow');
  const searchInput = document.getElementById('countrySearchInput');

  if (!dropdownPanel) return;

  dropdownPanel.classList.remove('hidden');
  if (pickerBtn) pickerBtn.setAttribute('aria-expanded', 'true');
  if (arrow) arrow.classList.add('rotate-180');

  // Filtrar y renderizar lista completa
  filterCountries(searchInput ? searchInput.value : '');

  // Focus en el buscador
  if (searchInput) {
    setTimeout(() => searchInput.focus(), 50);
  }

  // Scroll al país seleccionado
  scrollActiveCountryIntoView();
}

function closeCountryDropdown() {
  const dropdownPanel = document.getElementById('countryDropdownPanel');
  const pickerBtn = document.getElementById('countryPickerButton');
  const arrow = document.getElementById('countryDropdownArrow');

  if (!dropdownPanel || dropdownPanel.classList.contains('hidden')) return;

  dropdownPanel.classList.add('hidden');
  if (pickerBtn) pickerBtn.setAttribute('aria-expanded', 'false');
  if (arrow) arrow.classList.remove('rotate-180');
  AppState.highlightedIndex = -1;
}

function clearSearch() {
  const searchInput = document.getElementById('countrySearchInput');
  const searchClear = document.getElementById('countrySearchClear');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  if (searchClear) {
    searchClear.classList.add('hidden');
  }
  filterCountries('');
}

function filterCountries(query) {
  const countryList = typeof COUNTRIES !== 'undefined' ? COUNTRIES : [];
  const q = normalizeText(query);
  const dialDigits = (query || '').replace(/\D/g, '');

  if (!q && !dialDigits) {
    AppState.filteredCountries = [...countryList];
  } else {
    AppState.filteredCountries = countryList.filter((country) => {
      // 1. Coincidencia por prefijo telefónico (ej. "57", "+57")
      if (dialDigits && country.dial.startsWith(dialDigits)) {
        return true;
      }
      // 2. Coincidencia por nombre (sin acentos, ej. "mexico")
      const normName = normalizeText(country.name);
      if (normName.includes(q)) {
        return true;
      }
      // 3. Coincidencia por código ISO (ej. "CO", "MX")
      if (country.iso.toLowerCase() === q) {
        return true;
      }
      // 4. Coincidencia por alias (ej. "usa", "eeuu", "uk")
      if (
        country.aliases &&
        country.aliases.some((alias) => normalizeText(alias).includes(q))
      ) {
        return true;
      }
      return false;
    });
  }

  AppState.highlightedIndex = AppState.filteredCountries.length > 0 ? 0 : -1;
  renderCountryList(AppState.filteredCountries, query);
}

function renderCountryList(list, query) {
  const listContainer = document.getElementById('countryListContainer');
  const emptyState = document.getElementById('countryEmptyState');
  const emptyQueryText = document.getElementById('emptyQueryText');

  if (!listContainer) return;

  listContainer.innerHTML = '';

  if (list.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (emptyQueryText) emptyQueryText.textContent = query;
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const selectedIso = AppState.selectedCountry ? AppState.selectedCountry.iso : '';

  list.forEach((country, index) => {
    const isSelected = country.iso === selectedIso;
    const isHighlighted = index === AppState.highlightedIndex;

    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    li.dataset.index = index;
    li.dataset.iso = country.iso;

    li.className = `flex items-center justify-between px-3.5 py-2.5 cursor-pointer text-sm transition-colors ${
      isSelected
        ? 'bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-200 font-semibold'
        : isHighlighted
        ? 'bg-gray-100 dark:bg-gray-700/60 text-gray-900 dark:text-white'
        : 'hover:bg-gray-50 dark:hover:bg-gray-700/40 text-gray-800 dark:text-gray-200'
    }`;

    // Contenido del elemento
    li.innerHTML = `
      <div class="flex items-center space-x-3 truncate">
        <span class="text-xl leading-none shrink-0">${country.flag}</span>
        <span class="truncate">${country.name}</span>
      </div>
      <div class="flex items-center space-x-2 shrink-0 ml-2">
        <span class="text-xs px-2 py-0.5 rounded font-mono font-medium ${
          isSelected
            ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }">+${country.dial}</span>
        ${
          isSelected
            ? `<span class="text-green-600 dark:text-green-400 text-base font-bold">✓</span>`
            : ''
        }
      </div>
    `;

    li.addEventListener('click', (e) => {
      e.stopPropagation();
      selectCountry(country, true);
    });

    li.addEventListener('mouseenter', () => {
      updateHighlight(index, false);
    });

    listContainer.appendChild(li);
  });
}

function handleSearchKeydown(e) {
  const list = AppState.filteredCountries;
  if (list.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex =
      AppState.highlightedIndex < list.length - 1
        ? AppState.highlightedIndex + 1
        : 0;
    updateHighlight(nextIndex, true);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex =
      AppState.highlightedIndex > 0
        ? AppState.highlightedIndex - 1
        : list.length - 1;
    updateHighlight(prevIndex, true);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (AppState.highlightedIndex >= 0 && AppState.highlightedIndex < list.length) {
      selectCountry(list[AppState.highlightedIndex], true);
    }
  }
}

function updateHighlight(newIndex, scrollIntoView = false) {
  AppState.highlightedIndex = newIndex;
  const listContainer = document.getElementById('countryListContainer');
  if (!listContainer) return;

  const items = listContainer.querySelectorAll('li');
  items.forEach((item, idx) => {
    const isSelected = item.dataset.iso === (AppState.selectedCountry?.iso || '');
    if (idx === newIndex) {
      item.classList.add('bg-gray-100', 'dark:bg-gray-700/60');
      if (scrollIntoView) {
        item.scrollIntoView({ block: 'nearest' });
      }
    } else if (!isSelected) {
      item.classList.remove('bg-gray-100', 'dark:bg-gray-700/60');
    }
  });
}

function scrollActiveCountryIntoView() {
  const listContainer = document.getElementById('countryListContainer');
  if (!listContainer) return;
  const selectedItem = listContainer.querySelector('[aria-selected="true"]');
  if (selectedItem) {
    selectedItem.scrollIntoView({ block: 'center' });
  }
}

function selectCountry(country, shouldFocusPhone = true) {
  if (!country) return;
  AppState.selectedCountry = country;

  // 1. Guardar en localStorage
  localStorage.setItem('lastCountryIso', country.iso);
  localStorage.setItem('lastCountryCode', country.dial);

  // 2. Actualizar botón disparador
  const flagEl = document.getElementById('selectedCountryFlag');
  const nameEl = document.getElementById('selectedCountryName');
  const dialEl = document.getElementById('selectedCountryDial');

  if (flagEl) flagEl.textContent = country.flag;
  if (nameEl) nameEl.textContent = country.name;
  if (dialEl) dialEl.textContent = `(+${country.dial})`;

  // 3. Sincronizar select nativo
  const nativeSelect = document.getElementById('countryCode');
  if (nativeSelect) {
    nativeSelect.value = country.dial;
  }

  // 4. Actualizar placeholder del teléfono
  const phoneInput = document.getElementById('phoneNumber');
  if (phoneInput) {
    phoneInput.placeholder = PHONE_PLACEHOLDERS[country.iso] || 'Ej: 1234567890';
  }

  // 5. Cerrar panel
  closeCountryDropdown();

  // 6. Foco en campo de teléfono si se interactuó
  if (shouldFocusPhone && phoneInput) {
    phoneInput.focus();
  }

  // 7. Regenerar enlace dinámicamente si ya está visible
  const resultDiv = document.getElementById('result');
  if (resultDiv && !resultDiv.classList.contains('hidden')) {
    generateWhatsAppLink(false);
  }
}

/* ==========================================================================
   DETECCIÓN AUTOMÁTICA DE PAÍS EN ENTRADA TELEFÓNICA
   ========================================================================== */

function tryDetectCountryFromInput(inputValue) {
  const trimmed = (inputValue || '').trim();
  if (!trimmed.startsWith('+')) return null;

  const digits = cleanPhoneNumber(trimmed);
  const countryList = typeof COUNTRIES !== 'undefined' ? COUNTRIES : [];

  // Ordenar por longitud de código descendente
  const sorted = [...countryList].sort((a, b) => b.dial.length - a.dial.length);
  const matches = sorted.filter((c) => digits.startsWith(c.dial));

  if (matches.length === 0) return null;

  const longestDial = matches[0].dial;
  const sameDialMatches = matches.filter((c) => c.dial === longestDial);

  let selected = sameDialMatches.find(
    (c) => c.iso === (AppState.selectedCountry?.iso || '')
  );

  if (!selected) {
    const preferredIso = PRIMARY_COUNTRY_CODES[longestDial];
    if (preferredIso) {
      selected = sameDialMatches.find((c) => c.iso === preferredIso);
    }
  }

  if (!selected) {
    selected = sameDialMatches[0];
  }

  return {
    country: selected,
    remainingPhone: digits.slice(longestDial.length),
  };
}

function showDetectionBadge(country) {
  const badge = document.getElementById('phoneAutoDetectBadge');
  if (!badge) return;

  badge.innerHTML = `✓ Detectado: <b>${country.flag} ${country.name} (+${country.dial})</b>`;
  badge.classList.remove('hidden');

  clearTimeout(AppState.detectionBadgeTimeout);
  AppState.detectionBadgeTimeout = setTimeout(() => {
    badge.classList.add('hidden');
  }, 3500);
}

/* ==========================================================================
   FEEDBACK DE ERROR
   ========================================================================== */

function showPhoneError(message) {
  const phoneInput = document.getElementById('phoneNumber');
  const errorEl = document.getElementById('phoneError');

  if (phoneInput) {
    phoneInput.classList.add(
      'border-red-500',
      'focus:ring-red-500',
      'dark:border-red-500'
    );
    phoneInput.classList.remove(
      'border-gray-300',
      'dark:border-gray-600',
      'focus:ring-green-500'
    );
    phoneInput.focus();
  }

  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
}

function clearPhoneError() {
  const phoneInput = document.getElementById('phoneNumber');
  const errorEl = document.getElementById('phoneError');

  if (phoneInput) {
    phoneInput.classList.remove(
      'border-red-500',
      'focus:ring-red-500',
      'dark:border-red-500'
    );
    phoneInput.classList.add(
      'border-gray-300',
      'dark:border-gray-600',
      'focus:ring-green-500'
    );
  }

  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }
}

/* ==========================================================================
   GENERACIÓN DE ENLACES
   ========================================================================== */

function generateWhatsAppLink(scrollIntoView = true) {
  const countryCode =
    AppState.selectedCountry?.dial ||
    document.getElementById('countryCode')?.value ||
    '57';
  const phoneInput = document.getElementById('phoneNumber');
  const messageInput = document.getElementById('message');

  const rawPhone = phoneInput ? phoneInput.value.trim() : '';
  const message = messageInput ? messageInput.value : '';

  // Validación
  if (!rawPhone) {
    if (scrollIntoView) {
      showPhoneError('Por favor ingresa un número telefónico');
    }
    return;
  }

  let cleanPhone = cleanPhoneNumber(rawPhone);

  // Evitar duplicación de prefijo si el usuario escribió el código de país en el teléfono
  if (
    cleanPhone.startsWith(countryCode) &&
    cleanPhone.length >= countryCode.length + 7
  ) {
    cleanPhone = cleanPhone.slice(countryCode.length);
  }

  // Quitar ceros a la izquierda que causan problemas en WhatsApp internacional
  cleanPhone = cleanPhone.replace(/^0+/, '');

  if (cleanPhone.length < 7) {
    if (scrollIntoView) {
      showPhoneError('El número telefónico parece ser muy corto (mínimo 7 dígitos)');
    }
    return;
  }

  clearPhoneError();

  // Construcción del número completo y URL
  const fullNumber = countryCode + cleanPhone;
  let whatsappUrl = `https://wa.me/${fullNumber}`;

  if (message.trim()) {
    whatsappUrl += `?text=${encodeURIComponent(message.trim())}`;
  }

  // Actualizar campo de resultado
  const generatedInput = document.getElementById('generatedLink');
  const resultContainer = document.getElementById('result');

  if (generatedInput) {
    generatedInput.value = whatsappUrl;
  }

  if (resultContainer) {
    resultContainer.classList.remove('hidden');

    if (scrollIntoView) {
      resultContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }

  // Si el código QR está visible, actualizarlo
  const qrSection = document.getElementById('qrSection');
  if (qrSection && !qrSection.classList.contains('hidden')) {
    renderQrCode(whatsappUrl);
  }
}

/* ==========================================================================
   ACCIONES SOBRE EL RESULTADO (Copiar, Abrir, Compartir, QR)
   ========================================================================== */

async function copyToClipboard(buttonEl) {
  const linkInput = document.getElementById('generatedLink');
  if (!linkInput || !linkInput.value) return;

  const btn =
    buttonEl ||
    document.getElementById('copyBtn') ||
    document.querySelector('[data-action="copy"]');

  const originalContent = btn ? btn.innerHTML : '';

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(linkInput.value);
    } else {
      linkInput.select();
      document.execCommand('copy');
    }

    if (btn) {
      btn.innerHTML = '✅ ¡Copiado!';
      btn.classList.add('bg-green-600', 'text-white');
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.remove('bg-green-600');
      }, 2000);
    }
  } catch (err) {
    linkInput.select();
    document.execCommand('copy');
    if (btn) {
      btn.innerHTML = '✅ ¡Copiado!';
      setTimeout(() => {
        btn.innerHTML = originalContent;
      }, 2000);
    }
  }
}

function openWhatsApp() {
  let link = document.getElementById('generatedLink')?.value;
  if (!link) {
    generateWhatsAppLink(true);
    link = document.getElementById('generatedLink')?.value;
  }
  if (link) {
    window.open(link, '_blank', 'noopener,noreferrer');
  }
}

async function shareWhatsAppLink() {
  let link = document.getElementById('generatedLink')?.value;
  if (!link) {
    generateWhatsAppLink(true);
    link = document.getElementById('generatedLink')?.value;
  }
  if (!link) return;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Enlace de WhatsApp',
        text: 'Chatea conmigo en WhatsApp:',
        url: link,
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyToClipboard();
      }
    }
  } else {
    copyToClipboard();
  }
}

function toggleQrCode() {
  const qrSection = document.getElementById('qrSection');
  const qrBtn = document.getElementById('qrToggleBtn');
  if (!qrSection) return;

  const isHidden = qrSection.classList.contains('hidden');
  if (isHidden) {
    qrSection.classList.remove('hidden');
    if (qrBtn) qrBtn.textContent = '📱 Ocultar QR';
    const link = document.getElementById('generatedLink')?.value;
    if (link) {
      renderQrCode(link);
    }
  } else {
    qrSection.classList.add('hidden');
    if (qrBtn) qrBtn.textContent = '📱 Código QR';
  }
}

function renderQrCode(url) {
  const qrContainer = document.getElementById('qrcode');
  if (!qrContainer) return;

  qrContainer.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    try {
      AppState.qrInstance = new QRCode(qrContainer, {
        text: url,
        width: 170,
        height: 170,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M,
      });
    } catch (e) {
      renderQrFallback(qrContainer, url);
    }
  } else {
    renderQrFallback(qrContainer, url);
  }
}

function renderQrFallback(container, url) {
  const encoded = encodeURIComponent(url);
  container.innerHTML = `
    <img
      src="https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encoded}"
      alt="Código QR de WhatsApp"
      class="rounded-md mx-auto shadow-sm"
      loading="lazy"
    />
  `;
}

function downloadQrCode() {
  const qrContainer = document.getElementById('qrcode');
  if (!qrContainer) return;

  const canvas = qrContainer.querySelector('canvas');
  const img = qrContainer.querySelector('img');

  let dataUrl = '';
  if (canvas) {
    dataUrl = canvas.toDataURL('image/png');
  } else if (img && img.src && !img.src.startsWith('http')) {
    dataUrl = img.src;
  }

  if (dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'whatsapp-link-qr.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else if (img && img.src) {
    window.open(img.src, '_blank');
  }
}

/* ==========================================================================
   INICIALIZACIÓN Y EVENT LISTENERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Iniciar tema oscuro
  initializeDarkMode();

  // 2. Iniciar selector de países
  initializeCountrySelector();

  // 3. Teléfono: limpieza, detección automática de prefijo y debounce
  const phoneInput = document.getElementById('phoneNumber');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      clearPhoneError();

      // Detección automática al pegar con prefijo internacional (+)
      if (this.value.trim().startsWith('+')) {
        const detected = tryDetectCountryFromInput(this.value);
        if (detected) {
          selectCountry(detected.country, false);
          this.value = detected.remainingPhone;
          showDetectionBadge(detected.country);
        }
      }

      // Auto-generar después de pausa si ya hay datos suficientes
      clearTimeout(AppState.autoGenerateTimeout);
      AppState.autoGenerateTimeout = setTimeout(() => {
        const clean = cleanPhoneNumber(this.value);
        const resultVisible = !document
          .getElementById('result')
          ?.classList.contains('hidden');

        if (clean.length >= 7 || resultVisible) {
          generateWhatsAppLink(false);
        }
      }, 350);
    });

    phoneInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        generateWhatsAppLink(true);
      }
    });
  }

  // 4. Mensaje: contador de caracteres y actualización reactiva
  const messageInput = document.getElementById('message');
  const charCountEl = document.getElementById('charCount');

  if (messageInput) {
    messageInput.addEventListener('input', function () {
      if (charCountEl) {
        const len = this.value.length;
        charCountEl.textContent = `${len} ${len === 1 ? 'carácter' : 'caracteres'}`;
      }

      // Actualizar enlace reactivamente si ya está generado
      const resultDiv = document.getElementById('result');
      if (resultDiv && !resultDiv.classList.contains('hidden')) {
        generateWhatsAppLink(false);
      }
    });

    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        generateWhatsAppLink(true);
      }
    });
  }

  // 5. Botón de compartir nativo (verificar soporte)
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn && !navigator.share) {
    shareBtn.classList.add('hidden');
  }
});
