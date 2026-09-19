const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const COUNTRIES = require('../countries.js');

// Utility logic mirrored from app.js
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

const PRIMARY_COUNTRY_CODES = {
  '1': 'US',
  '7': 'RU',
  '47': 'NO',
  '61': 'AU',
  '212': 'MA',
  '262': 'RE',
  '672': 'NF',
};

function filterCountries(query, countryList = COUNTRIES) {
  const q = normalizeText(query);
  const dialDigits = (query || '').replace(/\D/g, '');

  if (!q && !dialDigits) {
    return [...countryList];
  }

  return countryList.filter((country) => {
    if (dialDigits && country.dial.startsWith(dialDigits)) {
      return true;
    }
    const normName = normalizeText(country.name);
    if (normName.includes(q)) {
      return true;
    }
    if (country.iso.toLowerCase() === q) {
      return true;
    }
    if (
      country.aliases &&
      country.aliases.some((alias) => normalizeText(alias).includes(q))
    ) {
      return true;
    }
    return false;
  });
}

function detectCountryFromInput(inputValue, currentIso = null, countryList = COUNTRIES) {
  const trimmed = (inputValue || '').trim();
  if (!trimmed.startsWith('+')) return null;

  const digits = cleanPhoneNumber(trimmed);
  const sorted = [...countryList].sort((a, b) => b.dial.length - a.dial.length);
  const matches = sorted.filter((c) => digits.startsWith(c.dial));

  if (matches.length === 0) return null;

  const longestDial = matches[0].dial;
  const sameDialMatches = matches.filter((c) => c.dial === longestDial);

  let selected = sameDialMatches.find((c) => c.iso === currentIso);

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

function buildWhatsAppUrl(countryCode, rawPhone, message = '') {
  let clean = cleanPhoneNumber(rawPhone);
  if (clean.startsWith(countryCode) && clean.length >= countryCode.length + 7) {
    clean = clean.slice(countryCode.length);
  }
  clean = clean.replace(/^0+/, '');

  if (clean.length < 7) {
    throw new Error('Phone too short');
  }

  const fullNumber = countryCode + clean;
  let url = `https://wa.me/${fullNumber}`;
  if (message.trim()) {
    url += `?text=${encodeURIComponent(message.trim())}`;
  }
  return url;
}

describe('Generador de Enlaces WhatsApp Tests', () => {
  describe('Dataset de Países', () => {
    test('Contiene 235 países', () => {
      assert.equal(COUNTRIES.length, 235);
    });

    test('Todos los países tienen propiedades iso, name, dial, flag válidas', () => {
      COUNTRIES.forEach((c) => {
        assert.ok(c.iso, `País sin ISO: ${JSON.stringify(c)}`);
        assert.ok(c.name, `País sin nombre: ${JSON.stringify(c)}`);
        assert.ok(c.dial, `País sin dial: ${JSON.stringify(c)}`);
        assert.ok(c.flag, `País sin bandera: ${JSON.stringify(c)}`);
        assert.ok(!c.dial.startsWith('+'), `Dial no debe incluir +: ${c.dial}`);
      });
    });

    test('Colombia está presente con código 57', () => {
      const co = COUNTRIES.find((c) => c.iso === 'CO');
      assert.ok(co);
      assert.equal(co.name, 'Colombia');
      assert.equal(co.dial, '57');
      assert.equal(co.flag, '🇨🇴');
    });
  });

  describe('Buscador y Filtrado de Países', () => {
    test('Búsqueda sin texto devuelve todos los países', () => {
      const results = filterCountries('');
      assert.equal(results.length, 235);
    });

    test('Búsqueda por nombre insensible a mayúsculas y acentos', () => {
      const m1 = filterCountries('mexico');
      const m2 = filterCountries('México');
      const m3 = filterCountries('MEX');
      assert.ok(m1.some((c) => c.name === 'México'));
      assert.ok(m2.some((c) => c.name === 'México'));
      assert.ok(m3.some((c) => c.name === 'México'));

      const e1 = filterCountries('espana');
      const e2 = filterCountries('España');
      assert.ok(e1.some((c) => c.name === 'España'));
      assert.ok(e2.some((c) => c.name === 'España'));

      const p1 = filterCountries('peru');
      const p2 = filterCountries('Perú');
      assert.ok(p1.some((c) => c.name === 'Perú'));
      assert.ok(p2.some((c) => c.name === 'Perú'));
    });

    test('Búsqueda por prefijo telefónico con y sin +', () => {
      const c1 = filterCountries('57');
      const c2 = filterCountries('+57');
      assert.ok(c1.some((c) => c.name === 'Colombia' && c.dial === '57'));
      assert.ok(c2.some((c) => c.name === 'Colombia' && c.dial === '57'));

      const es1 = filterCountries('34');
      const es2 = filterCountries('+34');
      assert.ok(es1.some((c) => c.name === 'España' && c.dial === '34'));
      assert.ok(es2.some((c) => c.name === 'España' && c.dial === '34'));
    });

    test('Búsqueda por alias comunes (USA, EEUU, UK)', () => {
      const us1 = filterCountries('usa');
      const us2 = filterCountries('eeuu');
      assert.ok(us1.some((c) => c.iso === 'US'));
      assert.ok(us2.some((c) => c.iso === 'US'));

      const uk = filterCountries('uk');
      assert.ok(uk.some((c) => c.iso === 'GB'));
    });

    test('Búsqueda inexistente devuelve lista vacía', () => {
      const results = filterCountries('xyznonexistentcountry123');
      assert.equal(results.length, 0);
    });
  });

  describe('Detección Automática de País desde Teléfono', () => {
    test('Detecta Colombia (+57) correctamente', () => {
      const res = detectCountryFromInput('+57 300 123 4567');
      assert.ok(res);
      assert.equal(res.country.iso, 'CO');
      assert.equal(res.remainingPhone, '3001234567');
    });

    test('Detecta España (+34) correctamente', () => {
      const res = detectCountryFromInput('+34 612 345 678');
      assert.ok(res);
      assert.equal(res.country.iso, 'ES');
      assert.equal(res.remainingPhone, '612345678');
    });

    test('Resuelve código compartido +1 priorizando US por defecto', () => {
      const res = detectCountryFromInput('+1 555 123 4567');
      assert.ok(res);
      assert.equal(res.country.iso, 'US');
      assert.equal(res.remainingPhone, '5551234567');
    });

    test('Conserva Canadá (+1) si el usuario ya tenía Canadá seleccionado', () => {
      const res = detectCountryFromInput('+1 555 123 4567', 'CA');
      assert.ok(res);
      assert.equal(res.country.iso, 'CA');
    });

    test('Prefiere prefijos más largos (+1684 Samoa Americana antes de +1 US)', () => {
      const res = detectCountryFromInput('+1684 123 4567');
      assert.ok(res);
      assert.equal(res.country.dial, '1684');
      assert.equal(res.country.iso, 'AS');
      assert.equal(res.remainingPhone, '1234567');
    });

    test('No activa detección si no empieza con +', () => {
      const res = detectCountryFromInput('300 123 4567');
      assert.equal(res, null);
    });
  });

  describe('Construcción de URL de WhatsApp', () => {
    test('Construye URL estándar correctamente', () => {
      const url = buildWhatsAppUrl('57', '300 123 4567', 'Hola mundo');
      assert.equal(url, 'https://wa.me/573001234567?text=Hola%20mundo');
    });

    test('Construye URL sin mensaje si el mensaje está vacío', () => {
      const url = buildWhatsAppUrl('57', '300 123 4567', '');
      assert.equal(url, 'https://wa.me/573001234567');
    });

    test('Codifica caracteres especiales y saltos de línea en el mensaje', () => {
      const url = buildWhatsAppUrl('34', '612 345 678', '¡Hola! ¿Cómo estás?\nLínea 2');
      assert.equal(
        url,
        'https://wa.me/34612345678?text=%C2%A1Hola!%20%C2%BFHow%20est%C3%A1s%3F%0AL%C3%ADnea%202'.replace(
          'How',
          'C%C3%B3mo'
        )
      );
    });

    test('Elimina prefijo duplicado si el usuario escribió el código de país en el teléfono', () => {
      // Usuario con país Colombia (+57) que ingresó 573001234567
      const url = buildWhatsAppUrl('57', '573001234567');
      assert.equal(url, 'https://wa.me/573001234567');
    });

    test('Elimina ceros iniciales de prefijos locales', () => {
      const url = buildWhatsAppUrl('44', '07123 456789');
      assert.equal(url, 'https://wa.me/447123456789');
    });

    test('Lanza error si el número telefónico tiene menos de 7 dígitos', () => {
      assert.throws(() => {
        buildWhatsAppUrl('57', '12345');
      }, /Phone too short/);
    });
  });
});
