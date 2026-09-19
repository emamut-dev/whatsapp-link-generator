# 📱 Generador de Enlaces de WhatsApp

Una aplicación web rápida, ligera y moderna para crear enlaces directos de WhatsApp (`https://wa.me/`) con códigos de país de todo el mundo, mensajes personalizados, buscador interactivo de países y códigos QR.

---

## ✨ Características

- 🔍 **Buscador interactivo de países**:
  - Filtro en tiempo real por nombre (insensible a acentos: *México* o *mexico*), prefijo telefónico (*57* o *+57*), código ISO o alias populares (*USA*, *EEUU*, *UK*).
  - Navegación con teclado (flechas `Arriba`/`Abajo` y tecla `Enter` para selección instantánea).
  - Chips de selección rápida para países frecuentes (Colombia, México, España, Argentina, EE.UU., Perú, Chile, Venezuela).
  - Selector con 235 países y banderas oficiales.
- 🪄 **Detección inteligente de prefijo**:
  - Si pegas o escribes un número con formato internacional (ej. `+34 612 345 678` o `+57 300 123 4567`), la aplicación detecta el país automáticamente, actualiza el selector y limpia el campo telefónico.
  - Corrección automática de prefijos duplicados para evitar enlaces rotos como `5757...`.
- 💾 **Persistencia de configuración**: Recuerda el último país seleccionado (incluso entre países que comparten prefijo como EE.UU. y Canadá) y el tema visual preferido en `localStorage`.
- 🌓 **Modo Claro / Oscuro sin parpadeo (FOUC)**: Detección automática del tema del sistema (`prefers-color-scheme`) y alternador manual persistente.
- ⚡ **Generación interactiva y reactiva**:
  - Actualización automática al escribir número o mensaje si el enlace ya está en pantalla.
  - Atajos de teclado: `Enter` en el campo telefónico y `Ctrl + Enter` (o `Cmd + Enter`) en el mensaje.
- 📱 **Código QR y Descarga**:
  - Generación instantánea de código QR para escanear con la cámara del móvil.
  - Botón para descargar el código QR como imagen PNG.
- 📲 **Compartir y Portapapeles**:
  - Copiado seguro al portapapeles con confirmación visual sin alertas emergentes bloqueantes.
  - Botón de compartir nativo (`Web Share API`) para enviar directamente por WhatsApp, Telegram, SMS u otras aplicaciones en móviles y navegadores compatibles.
- 🧹 **Limpieza y validación amigable**:
  - Elimina espacios, guiones y caracteres no numéricos.
  - Alertas visuales no invasivas integradas en el diseño (sin molestos `alert()` nativos).
- 📲 **PWA Ready**: Incluye `site.webmanifest` e iconos para una experiencia instalable como aplicación web móvil o de escritorio.

---

## 🚀 Cómo usar

1. **Selecciona el país**:
   - Pulsa en el selector de país para abrir el buscador.
   - Escribe el nombre (ej. *Colombia*, *España*), prefijo (*57*, *34*) o pulsa en uno de los accesos rápidos frecuentes.
   - Presiona `Enter` para seleccionarlo.
2. **Ingresa el número**:
   - Escribe el número telefónico de destino (ej. celular o teléfono comercial).
   - Opcionalmente pega el número completo con `+` (ej. `+57 300 123 4567`) y se ajustará solo.
3. **Escribe un mensaje (opcional)**:
   - Añade el texto predeterminado que aparecerá en el chat al abrir el enlace.
   - Puedes usar formato WhatsApp: `*negrita*`, `_cursiva_`, `~tachado~`.
4. **Genera el enlace**:
   - Haz clic en **"Generar Enlace WhatsApp"** o presiona `Enter`.
5. **Comparte o abre**:
   - **📋 Copiar**: Guarda el enlace en el portapapeles.
   - **💬 Abrir**: Abre la conversación en WhatsApp Web o en la app nativa.
   - **📲 Compartir**: Abre el menú para compartir en tu dispositivo móvil.
   - **📱 Código QR**: Muestra y descarga el código QR listo para imprimir o escanear.

---

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica y accesible.
- **Tailwind CSS**: Diseño moderno, totalmente responsivo y soporte para tema oscuro.
- **JavaScript (Vanilla ES6+)**: Arquitectura limpia, modular y reactiva sin frameworks pesados.
- **QRCode.js**: Generación de códigos QR en el cliente.
- **Web App Manifest**: Compatibilidad PWA y configuración de iconos multiplataforma.
- **Node.js Test Runner**: Suite de pruebas unitarias automatizadas (`node --test`).

---

## 💻 Ejecución local y pruebas

### Ejecutar la aplicación

#### Opción 1: Abrir directamente
Haz doble clic sobre [index.html](file:///Users/emamut/workspace/emamut/whatsapp-link-generator/index.html) para abrirlo en cualquier navegador web.

#### Opción 2: Con servidor local
```bash
# Con Node.js / npx
npx serve .

# O con npm
npm start

# Con Python 3
python3 -m http.server 8080

# Con PHP
php -S localhost:8080
```

### Ejecutar las pruebas unitarias

```bash
npm test
```

---

## 📁 Estructura del proyecto

```text
whatsapp-link-generator/
├── index.html              # Interfaz de usuario con buscador y vista interactiva
├── countries.js            # Base de datos de 235 países, prefijos, banderas y alias
├── app.js                  # Lógica del buscador, eventos, tema oscuro y generador
├── test/
│   └── app.test.js         # Suite de pruebas unitarias automatizadas
├── site.webmanifest        # Manifiesto para Progressive Web App (PWA)
├── favicon.ico             # Favicon principal
├── favicon-16x16.png       # Favicon 16x16
├── favicon-32x32.png       # Favicon 32x32
├── apple-touch-icon.png    # Icono para dispositivos Apple iOS
├── android-chrome-192x192.png # Icono para Android PWA (192px)
├── android-chrome-512x512.png # Icono para Android PWA (512px)
├── package.json            # Metadatos del proyecto y scripts
├── .gitignore              # Archivos ignorados por git
└── README.md               # Documentación del proyecto
```

---

## 📄 Licencia

Distribuido bajo la licencia ISC. Consulta el archivo `package.json` para más información.
