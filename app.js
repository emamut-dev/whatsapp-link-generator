function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  const toggle = document.getElementById('darkModeToggle');

  if (isDark) {
    html.classList.remove('dark');
    toggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'false');
  } else {
    html.classList.add('dark');
    toggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'true');
  }
}

function initializeDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  const toggle = document.getElementById('darkModeToggle');

  if (
    savedMode === 'true' ||
    (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    toggle.textContent = '☀️';
  } else {
    toggle.textContent = '🌙';
  }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initializeDarkMode);

// Limpiar número telefónico
function cleanPhoneNumber(phone) {
  return phone.replace(/\D/g, '');
}

// Generar enlace de WhatsApp
function generateWhatsAppLink() {
  const countryCode = document.getElementById('countryCode').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const message = document.getElementById('message').value;

  if (!phoneNumber.trim()) {
    alert('Por favor ingresa un número telefónico');
    return;
  }

  const cleanPhone = cleanPhoneNumber(phoneNumber);

  if (cleanPhone.length < 7) {
    alert('El número telefónico parece ser muy corto');
    return;
  }

  // Construir el número completo
  const fullNumber = countryCode + cleanPhone;

  // Construir la URL de WhatsApp
  let whatsappUrl = `https://wa.me/${fullNumber}`;

  // Agregar mensaje si existe
  if (message.trim()) {
    const encodedMessage = encodeURIComponent(message.trim());
    whatsappUrl += `?text=${encodedMessage}`;
  }

  // Mostrar resultado
  document.getElementById('generatedLink').value = whatsappUrl;
  document.getElementById('result').classList.remove('hidden');

  // Scroll al resultado
  document.getElementById('result').scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  });
}

// Copiar al portapapeles
async function copyToClipboard() {
  const linkInput = document.getElementById('generatedLink');

  try {
    await navigator.clipboard.writeText(linkInput.value);

    // Feedback visual
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '✅ Copiado';
    button.classList.add('bg-green-600');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-green-600');
    }, 2000);
  } catch (err) {
    // Fallback para navegadores más antiguos
    linkInput.select();
    document.execCommand('copy');
    alert('Enlace copiado al portapapeles');
  }
}

// Abrir WhatsApp
function openWhatsApp() {
  const link = document.getElementById('generatedLink').value;
  window.open(link, '_blank');
}

// Generar automáticamente al escribir (opcional)
document.getElementById('phoneNumber').addEventListener('input', function () {
  // Auto-generar después de una pausa en la escritura
  clearTimeout(this.autoGenerateTimeout);
  this.autoGenerateTimeout = setTimeout(() => {
    if (this.value.length >= 7) {
      generateWhatsAppLink();
    }
  }, 1000);
});

// Permitir generar con Enter
document
  .getElementById('phoneNumber')
  .addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      generateWhatsAppLink();
    }
  });

document.getElementById('message').addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && e.ctrlKey) {
    generateWhatsAppLink();
  }
});
