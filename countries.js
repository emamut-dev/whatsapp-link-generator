/**
 * Lista internacional de países con código de marcación y bandera
 */
const COUNTRIES = [
  {
    "iso": "AF",
    "name": "Afganistán",
    "dial": "93",
    "flag": "🇦🇫"
  },
  {
    "iso": "AL",
    "name": "Albania",
    "dial": "355",
    "flag": "🇦🇱"
  },
  {
    "iso": "DE",
    "name": "Alemania",
    "dial": "49",
    "flag": "🇩🇪",
    "aliases": [
      "germany",
      "alemania"
    ]
  },
  {
    "iso": "AD",
    "name": "Andorra",
    "dial": "376",
    "flag": "🇦🇩"
  },
  {
    "iso": "AO",
    "name": "Angola",
    "dial": "244",
    "flag": "🇦🇴"
  },
  {
    "iso": "AI",
    "name": "Anguila",
    "dial": "1264",
    "flag": "🇦🇮"
  },
  {
    "iso": "AQ",
    "name": "Antártida",
    "dial": "672",
    "flag": "🇦🇶"
  },
  {
    "iso": "AG",
    "name": "Antigua y Barbuda",
    "dial": "1268",
    "flag": "🇦🇬"
  },
  {
    "iso": "AN",
    "name": "Antillas Neerlandesas",
    "dial": "599",
    "flag": "🇳🇱"
  },
  {
    "iso": "SA",
    "name": "Arabia Saudí",
    "dial": "966",
    "flag": "🇸🇦"
  },
  {
    "iso": "DZ",
    "name": "Argelia",
    "dial": "213",
    "flag": "🇩🇿"
  },
  {
    "iso": "AR",
    "name": "Argentina",
    "dial": "54",
    "flag": "🇦🇷",
    "aliases": [
      "argentina",
      "arg"
    ]
  },
  {
    "iso": "AM",
    "name": "Armenia",
    "dial": "374",
    "flag": "🇦🇲"
  },
  {
    "iso": "AW",
    "name": "Aruba",
    "dial": "297",
    "flag": "🇦🇼"
  },
  {
    "iso": "AU",
    "name": "Australia",
    "dial": "61",
    "flag": "🇦🇺"
  },
  {
    "iso": "AT",
    "name": "Austria",
    "dial": "43",
    "flag": "🇦🇹"
  },
  {
    "iso": "AZ",
    "name": "Azerbaiyán",
    "dial": "994",
    "flag": "🇦🇿"
  },
  {
    "iso": "BS",
    "name": "Bahamas",
    "dial": "1242",
    "flag": "🇧🇸"
  },
  {
    "iso": "BD",
    "name": "Bangladés",
    "dial": "880",
    "flag": "🇧🇩"
  },
  {
    "iso": "BB",
    "name": "Barbados",
    "dial": "1246",
    "flag": "🇧🇧"
  },
  {
    "iso": "BH",
    "name": "Baréin",
    "dial": "973",
    "flag": "🇧🇭"
  },
  {
    "iso": "BE",
    "name": "Bélgica",
    "dial": "32",
    "flag": "🇧🇪"
  },
  {
    "iso": "BZ",
    "name": "Belice",
    "dial": "501",
    "flag": "🇧🇿"
  },
  {
    "iso": "BJ",
    "name": "Benín",
    "dial": "229",
    "flag": "🇧🇯"
  },
  {
    "iso": "BM",
    "name": "Bermudas",
    "dial": "1441",
    "flag": "🇧🇲"
  },
  {
    "iso": "BY",
    "name": "Bielorrusia",
    "dial": "375",
    "flag": "🇧🇾"
  },
  {
    "iso": "BO",
    "name": "Bolivia",
    "dial": "591",
    "flag": "🇧🇴"
  },
  {
    "iso": "BA",
    "name": "Bosnia y Herzegovina",
    "dial": "387",
    "flag": "🇧🇦"
  },
  {
    "iso": "BW",
    "name": "Botsuana",
    "dial": "267",
    "flag": "🇧🇼"
  },
  {
    "iso": "BR",
    "name": "Brasil",
    "dial": "55",
    "flag": "🇧🇷"
  },
  {
    "iso": "BN",
    "name": "Brunéi",
    "dial": "673",
    "flag": "🇧🇳"
  },
  {
    "iso": "BG",
    "name": "Bulgaria",
    "dial": "359",
    "flag": "🇧🇬"
  },
  {
    "iso": "BF",
    "name": "Burkina Faso",
    "dial": "226",
    "flag": "🇧🇫"
  },
  {
    "iso": "BI",
    "name": "Burundi",
    "dial": "257",
    "flag": "🇧🇮"
  },
  {
    "iso": "BT",
    "name": "Bután",
    "dial": "975",
    "flag": "🇧🇹"
  },
  {
    "iso": "CV",
    "name": "Cabo Verde",
    "dial": "238",
    "flag": "🇨🇻"
  },
  {
    "iso": "KH",
    "name": "Camboya",
    "dial": "855",
    "flag": "🇰🇭"
  },
  {
    "iso": "CM",
    "name": "Camerún",
    "dial": "237",
    "flag": "🇨🇲"
  },
  {
    "iso": "CA",
    "name": "Canadá",
    "dial": "1",
    "flag": "🇨🇦"
  },
  {
    "iso": "QA",
    "name": "Catar",
    "dial": "974",
    "flag": "🇶🇦"
  },
  {
    "iso": "TD",
    "name": "Chad",
    "dial": "235",
    "flag": "🇹🇩"
  },
  {
    "iso": "CL",
    "name": "Chile",
    "dial": "56",
    "flag": "🇨🇱"
  },
  {
    "iso": "CN",
    "name": "China",
    "dial": "86",
    "flag": "🇨🇳"
  },
  {
    "iso": "CY",
    "name": "Chipre",
    "dial": "357",
    "flag": "🇨🇾"
  },
  {
    "iso": "VA",
    "name": "Ciudad del Vaticano",
    "dial": "379",
    "flag": "🇻🇦"
  },
  {
    "iso": "CO",
    "name": "Colombia",
    "dial": "57",
    "flag": "🇨🇴",
    "aliases": [
      "colombia",
      "col"
    ]
  },
  {
    "iso": "KM",
    "name": "Comoras",
    "dial": "269",
    "flag": "🇰🇲"
  },
  {
    "iso": "CG",
    "name": "Congo",
    "dial": "242",
    "flag": "🇨🇬"
  },
  {
    "iso": "KP",
    "name": "Corea del Norte",
    "dial": "850",
    "flag": "🇰🇵",
    "aliases": [
      "corea del norte",
      "north korea"
    ]
  },
  {
    "iso": "KR",
    "name": "Corea del Sur",
    "dial": "82",
    "flag": "🇰🇷",
    "aliases": [
      "corea del sur",
      "south korea"
    ]
  },
  {
    "iso": "CI",
    "name": "Costa de Marfil",
    "dial": "225",
    "flag": "🇨🇮"
  },
  {
    "iso": "CR",
    "name": "Costa Rica",
    "dial": "506",
    "flag": "🇨🇷"
  },
  {
    "iso": "HR",
    "name": "Croacia",
    "dial": "385",
    "flag": "🇭🇷"
  },
  {
    "iso": "CU",
    "name": "Cuba",
    "dial": "53",
    "flag": "🇨🇺"
  },
  {
    "iso": "DK",
    "name": "Dinamarca",
    "dial": "45",
    "flag": "🇩🇰"
  },
  {
    "iso": "DM",
    "name": "Dominica",
    "dial": "1767",
    "flag": "🇩🇲"
  },
  {
    "iso": "EC",
    "name": "Ecuador",
    "dial": "593",
    "flag": "🇪🇨"
  },
  {
    "iso": "EG",
    "name": "Egipto",
    "dial": "20",
    "flag": "🇪🇬"
  },
  {
    "iso": "SV",
    "name": "El Salvador",
    "dial": "503",
    "flag": "🇸🇻"
  },
  {
    "iso": "AE",
    "name": "Emiratos Árabes Unidos",
    "dial": "971",
    "flag": "🇦🇪",
    "aliases": [
      "emiratos arabes",
      "dubai",
      "eau",
      "uae"
    ]
  },
  {
    "iso": "ER",
    "name": "Eritrea",
    "dial": "291",
    "flag": "🇪🇷"
  },
  {
    "iso": "SK",
    "name": "Eslovaquia",
    "dial": "421",
    "flag": "🇸🇰"
  },
  {
    "iso": "SI",
    "name": "Eslovenia",
    "dial": "386",
    "flag": "🇸🇮"
  },
  {
    "iso": "ES",
    "name": "España",
    "dial": "34",
    "flag": "🇪🇸",
    "aliases": [
      "spain",
      "espana",
      "es"
    ]
  },
  {
    "iso": "US",
    "name": "Estados Unidos",
    "dial": "1",
    "flag": "🇺🇸",
    "aliases": [
      "usa",
      "estados unidos",
      "eeuu",
      "united states",
      "ee.uu."
    ]
  },
  {
    "iso": "EE",
    "name": "Estonia",
    "dial": "372",
    "flag": "🇪🇪"
  },
  {
    "iso": "SZ",
    "name": "Esuatini",
    "dial": "268",
    "flag": "🇸🇿"
  },
  {
    "iso": "ET",
    "name": "Etiopía",
    "dial": "251",
    "flag": "🇪🇹"
  },
  {
    "iso": "PH",
    "name": "Filipinas",
    "dial": "63",
    "flag": "🇵🇭"
  },
  {
    "iso": "FI",
    "name": "Finlandia",
    "dial": "358",
    "flag": "🇫🇮"
  },
  {
    "iso": "FJ",
    "name": "Fiyi",
    "dial": "679",
    "flag": "🇫🇯"
  },
  {
    "iso": "FR",
    "name": "Francia",
    "dial": "33",
    "flag": "🇫🇷",
    "aliases": [
      "france",
      "francia"
    ]
  },
  {
    "iso": "GA",
    "name": "Gabón",
    "dial": "241",
    "flag": "🇬🇦"
  },
  {
    "iso": "GM",
    "name": "Gambia",
    "dial": "220",
    "flag": "🇬🇲"
  },
  {
    "iso": "GE",
    "name": "Georgia",
    "dial": "995",
    "flag": "🇬🇪"
  },
  {
    "iso": "GH",
    "name": "Ghana",
    "dial": "233",
    "flag": "🇬🇭"
  },
  {
    "iso": "GI",
    "name": "Gibraltar",
    "dial": "350",
    "flag": "🇬🇮"
  },
  {
    "iso": "GD",
    "name": "Granada",
    "dial": "1473",
    "flag": "🇬🇩"
  },
  {
    "iso": "GR",
    "name": "Grecia",
    "dial": "30",
    "flag": "🇬🇷"
  },
  {
    "iso": "GL",
    "name": "Groenlandia",
    "dial": "299",
    "flag": "🇬🇱"
  },
  {
    "iso": "GP",
    "name": "Guadalupe",
    "dial": "590",
    "flag": "🇬🇵"
  },
  {
    "iso": "GU",
    "name": "Guam",
    "dial": "1671",
    "flag": "🇬🇺"
  },
  {
    "iso": "GT",
    "name": "Guatemala",
    "dial": "502",
    "flag": "🇬🇹"
  },
  {
    "iso": "GF",
    "name": "Guayana Francesa",
    "dial": "594",
    "flag": "🇬🇫"
  },
  {
    "iso": "GN",
    "name": "Guinea",
    "dial": "224",
    "flag": "🇬🇳"
  },
  {
    "iso": "GQ",
    "name": "Guinea Ecuatorial",
    "dial": "240",
    "flag": "🇬🇶"
  },
  {
    "iso": "GW",
    "name": "Guinea-Bisáu",
    "dial": "245",
    "flag": "🇬🇼"
  },
  {
    "iso": "GY",
    "name": "Guyana",
    "dial": "592",
    "flag": "🇬🇾"
  },
  {
    "iso": "HT",
    "name": "Haití",
    "dial": "509",
    "flag": "🇭🇹"
  },
  {
    "iso": "HN",
    "name": "Honduras",
    "dial": "504",
    "flag": "🇭🇳"
  },
  {
    "iso": "HK",
    "name": "Hong Kong",
    "dial": "852",
    "flag": "🇭🇰"
  },
  {
    "iso": "HU",
    "name": "Hungría",
    "dial": "36",
    "flag": "🇭🇺"
  },
  {
    "iso": "IN",
    "name": "India",
    "dial": "91",
    "flag": "🇮🇳"
  },
  {
    "iso": "ID",
    "name": "Indonesia",
    "dial": "62",
    "flag": "🇮🇩"
  },
  {
    "iso": "IQ",
    "name": "Irak",
    "dial": "964",
    "flag": "🇮🇶"
  },
  {
    "iso": "IR",
    "name": "Irán",
    "dial": "98",
    "flag": "🇮🇷"
  },
  {
    "iso": "IE",
    "name": "Irlanda",
    "dial": "353",
    "flag": "🇮🇪"
  },
  {
    "iso": "CX",
    "name": "Isla de Navidad",
    "dial": "61",
    "flag": "🇨🇽"
  },
  {
    "iso": "NF",
    "name": "Isla Norfolk",
    "dial": "672",
    "flag": "🇳🇫"
  },
  {
    "iso": "IS",
    "name": "Islandia",
    "dial": "354",
    "flag": "🇮🇸"
  },
  {
    "iso": "KY",
    "name": "Islas Caimán",
    "dial": "1345",
    "flag": "🇰🇾"
  },
  {
    "iso": "CC",
    "name": "Islas Cocos",
    "dial": "61",
    "flag": "🇨🇨"
  },
  {
    "iso": "CK",
    "name": "Islas Cook",
    "dial": "682",
    "flag": "🇨🇰"
  },
  {
    "iso": "FO",
    "name": "Islas Feroe",
    "dial": "298",
    "flag": "🇫🇴"
  },
  {
    "iso": "FK",
    "name": "Islas Malvinas",
    "dial": "500",
    "flag": "🇫🇰"
  },
  {
    "iso": "MP",
    "name": "Islas Marianas del Norte",
    "dial": "1670",
    "flag": "🇲🇵"
  },
  {
    "iso": "MH",
    "name": "Islas Marshall",
    "dial": "692",
    "flag": "🇲🇭"
  },
  {
    "iso": "SB",
    "name": "Islas Salomón",
    "dial": "677",
    "flag": "🇸🇧"
  },
  {
    "iso": "TC",
    "name": "Islas Turcas y Caicos",
    "dial": "1649",
    "flag": "🇹🇨"
  },
  {
    "iso": "VG",
    "name": "Islas Vírgenes Británicas",
    "dial": "1284",
    "flag": "🇻🇬"
  },
  {
    "iso": "VI",
    "name": "Islas Vírgenes de EE.UU.",
    "dial": "1340",
    "flag": "🇻🇮"
  },
  {
    "iso": "IL",
    "name": "Israel",
    "dial": "972",
    "flag": "🇮🇱"
  },
  {
    "iso": "IT",
    "name": "Italia",
    "dial": "39",
    "flag": "🇮🇹",
    "aliases": [
      "italy",
      "italia"
    ]
  },
  {
    "iso": "JM",
    "name": "Jamaica",
    "dial": "1876",
    "flag": "🇯🇲"
  },
  {
    "iso": "JP",
    "name": "Japón",
    "dial": "81",
    "flag": "🇯🇵"
  },
  {
    "iso": "JO",
    "name": "Jordania",
    "dial": "962",
    "flag": "🇯🇴"
  },
  {
    "iso": "KZ",
    "name": "Kazajistán",
    "dial": "7",
    "flag": "🇰🇿"
  },
  {
    "iso": "KE",
    "name": "Kenia",
    "dial": "254",
    "flag": "🇰🇪"
  },
  {
    "iso": "KG",
    "name": "Kirguistán",
    "dial": "996",
    "flag": "🇰🇬"
  },
  {
    "iso": "KI",
    "name": "Kiribati",
    "dial": "686",
    "flag": "🇰🇮"
  },
  {
    "iso": "KW",
    "name": "Kuwait",
    "dial": "965",
    "flag": "🇰🇼"
  },
  {
    "iso": "LA",
    "name": "Laos",
    "dial": "856",
    "flag": "🇱🇦"
  },
  {
    "iso": "LS",
    "name": "Lesoto",
    "dial": "266",
    "flag": "🇱🇸"
  },
  {
    "iso": "LV",
    "name": "Letonia",
    "dial": "371",
    "flag": "🇱🇻"
  },
  {
    "iso": "LB",
    "name": "Líbano",
    "dial": "961",
    "flag": "🇱🇧"
  },
  {
    "iso": "LR",
    "name": "Liberia",
    "dial": "231",
    "flag": "🇱🇷"
  },
  {
    "iso": "LY",
    "name": "Libia",
    "dial": "218",
    "flag": "🇱🇾"
  },
  {
    "iso": "LI",
    "name": "Liechtenstein",
    "dial": "423",
    "flag": "🇱🇮"
  },
  {
    "iso": "LT",
    "name": "Lituania",
    "dial": "370",
    "flag": "🇱🇹"
  },
  {
    "iso": "LU",
    "name": "Luxemburgo",
    "dial": "352",
    "flag": "🇱🇺"
  },
  {
    "iso": "MO",
    "name": "Macao",
    "dial": "853",
    "flag": "🇲🇴"
  },
  {
    "iso": "MK",
    "name": "Macedonia del Norte",
    "dial": "389",
    "flag": "🇲🇰"
  },
  {
    "iso": "MG",
    "name": "Madagascar",
    "dial": "261",
    "flag": "🇲🇬"
  },
  {
    "iso": "MY",
    "name": "Malasia",
    "dial": "60",
    "flag": "🇲🇾"
  },
  {
    "iso": "MW",
    "name": "Malaui",
    "dial": "265",
    "flag": "🇲🇼"
  },
  {
    "iso": "MV",
    "name": "Maldivas",
    "dial": "960",
    "flag": "🇲🇻"
  },
  {
    "iso": "ML",
    "name": "Malí",
    "dial": "223",
    "flag": "🇲🇱"
  },
  {
    "iso": "MT",
    "name": "Malta",
    "dial": "356",
    "flag": "🇲🇹"
  },
  {
    "iso": "MA",
    "name": "Marruecos",
    "dial": "212",
    "flag": "🇲🇦"
  },
  {
    "iso": "MQ",
    "name": "Martinica",
    "dial": "596",
    "flag": "🇲🇶"
  },
  {
    "iso": "MU",
    "name": "Mauricio",
    "dial": "230",
    "flag": "🇲🇺"
  },
  {
    "iso": "MR",
    "name": "Mauritania",
    "dial": "222",
    "flag": "🇲🇷"
  },
  {
    "iso": "YT",
    "name": "Mayotte",
    "dial": "262",
    "flag": "🇾🇹"
  },
  {
    "iso": "MX",
    "name": "México",
    "dial": "52",
    "flag": "🇲🇽",
    "aliases": [
      "mexico",
      "mex"
    ]
  },
  {
    "iso": "FM",
    "name": "Micronesia",
    "dial": "691",
    "flag": "🇫🇲"
  },
  {
    "iso": "MD",
    "name": "Moldavia",
    "dial": "373",
    "flag": "🇲🇩"
  },
  {
    "iso": "MC",
    "name": "Mónaco",
    "dial": "377",
    "flag": "🇲🇨"
  },
  {
    "iso": "MN",
    "name": "Mongolia",
    "dial": "976",
    "flag": "🇲🇳"
  },
  {
    "iso": "ME",
    "name": "Montenegro",
    "dial": "382",
    "flag": "🇲🇪"
  },
  {
    "iso": "MS",
    "name": "Montserrat",
    "dial": "1664",
    "flag": "🇲🇸"
  },
  {
    "iso": "MZ",
    "name": "Mozambique",
    "dial": "258",
    "flag": "🇲🇿"
  },
  {
    "iso": "MM",
    "name": "Myanmar",
    "dial": "95",
    "flag": "🇲🇲"
  },
  {
    "iso": "NA",
    "name": "Namibia",
    "dial": "264",
    "flag": "🇳🇦"
  },
  {
    "iso": "NR",
    "name": "Nauru",
    "dial": "674",
    "flag": "🇳🇷"
  },
  {
    "iso": "NP",
    "name": "Nepal",
    "dial": "977",
    "flag": "🇳🇵"
  },
  {
    "iso": "NI",
    "name": "Nicaragua",
    "dial": "505",
    "flag": "🇳🇮"
  },
  {
    "iso": "NE",
    "name": "Níger",
    "dial": "227",
    "flag": "🇳🇪"
  },
  {
    "iso": "NG",
    "name": "Nigeria",
    "dial": "234",
    "flag": "🇳🇬"
  },
  {
    "iso": "NU",
    "name": "Niue",
    "dial": "683",
    "flag": "🇳🇺"
  },
  {
    "iso": "NO",
    "name": "Noruega",
    "dial": "47",
    "flag": "🇳🇴"
  },
  {
    "iso": "NC",
    "name": "Nueva Caledonia",
    "dial": "687",
    "flag": "🇳🇨"
  },
  {
    "iso": "NZ",
    "name": "Nueva Zelanda",
    "dial": "64",
    "flag": "🇳🇿"
  },
  {
    "iso": "OM",
    "name": "Omán",
    "dial": "968",
    "flag": "🇴🇲"
  },
  {
    "iso": "NL",
    "name": "Países Bajos",
    "dial": "31",
    "flag": "🇳🇱",
    "aliases": [
      "holanda",
      "paises bajos",
      "netherlands"
    ]
  },
  {
    "iso": "PK",
    "name": "Pakistán",
    "dial": "92",
    "flag": "🇵🇰"
  },
  {
    "iso": "PW",
    "name": "Palaos",
    "dial": "680",
    "flag": "🇵🇼"
  },
  {
    "iso": "PS",
    "name": "Palestina",
    "dial": "970",
    "flag": "🇵🇸"
  },
  {
    "iso": "PA",
    "name": "Panamá",
    "dial": "507",
    "flag": "🇵🇦"
  },
  {
    "iso": "PG",
    "name": "Papúa Nueva Guinea",
    "dial": "675",
    "flag": "🇵🇬"
  },
  {
    "iso": "PY",
    "name": "Paraguay",
    "dial": "595",
    "flag": "🇵🇾"
  },
  {
    "iso": "PE",
    "name": "Perú",
    "dial": "51",
    "flag": "🇵🇪"
  },
  {
    "iso": "PF",
    "name": "Polinesia Francesa",
    "dial": "689",
    "flag": "🇵🇫"
  },
  {
    "iso": "PL",
    "name": "Polonia",
    "dial": "48",
    "flag": "🇵🇱"
  },
  {
    "iso": "PT",
    "name": "Portugal",
    "dial": "351",
    "flag": "🇵🇹"
  },
  {
    "iso": "PR",
    "name": "Puerto Rico",
    "dial": "1787",
    "flag": "🇵🇷"
  },
  {
    "iso": "GB",
    "name": "Reino Unido",
    "dial": "44",
    "flag": "🇬🇧",
    "aliases": [
      "uk",
      "reino unido",
      "gran bretaña",
      "england",
      "inglaterra",
      "great britain"
    ]
  },
  {
    "iso": "CF",
    "name": "República Centroafricana",
    "dial": "236",
    "flag": "🇨🇫"
  },
  {
    "iso": "CZ",
    "name": "República Checa",
    "dial": "420",
    "flag": "🇨🇿"
  },
  {
    "iso": "CD",
    "name": "República Democrática del Congo",
    "dial": "243",
    "flag": "🇨🇩"
  },
  {
    "iso": "DO",
    "name": "República Dominicana",
    "dial": "1809",
    "flag": "🇩🇴"
  },
  {
    "iso": "RE",
    "name": "Reunión",
    "dial": "262",
    "flag": "🇷🇪"
  },
  {
    "iso": "RW",
    "name": "Ruanda",
    "dial": "250",
    "flag": "🇷🇼"
  },
  {
    "iso": "RO",
    "name": "Rumania",
    "dial": "40",
    "flag": "🇷🇴"
  },
  {
    "iso": "RU",
    "name": "Rusia",
    "dial": "7",
    "flag": "🇷🇺",
    "aliases": [
      "russia",
      "rusia"
    ]
  },
  {
    "iso": "EH",
    "name": "Sahara Occidental",
    "dial": "212",
    "flag": "🇪🇭"
  },
  {
    "iso": "WS",
    "name": "Samoa",
    "dial": "685",
    "flag": "🇼🇸"
  },
  {
    "iso": "AS",
    "name": "Samoa Americana",
    "dial": "1684",
    "flag": "🇦🇸"
  },
  {
    "iso": "KN",
    "name": "San Cristóbal y Nieves",
    "dial": "1869",
    "flag": "🇰🇳"
  },
  {
    "iso": "SM",
    "name": "San Marino",
    "dial": "378",
    "flag": "🇸🇲"
  },
  {
    "iso": "PM",
    "name": "San Pedro y Miquelón",
    "dial": "508",
    "flag": "🇵🇲"
  },
  {
    "iso": "VC",
    "name": "San Vicente y las Granadinas",
    "dial": "1784",
    "flag": "🇻🇨"
  },
  {
    "iso": "SH",
    "name": "Santa Elena",
    "dial": "290",
    "flag": "🇸🇭"
  },
  {
    "iso": "LC",
    "name": "Santa Lucía",
    "dial": "1758",
    "flag": "🇱🇨"
  },
  {
    "iso": "ST",
    "name": "Santo Tomé y Príncipe",
    "dial": "239",
    "flag": "🇸🇹"
  },
  {
    "iso": "SN",
    "name": "Senegal",
    "dial": "221",
    "flag": "🇸🇳"
  },
  {
    "iso": "RS",
    "name": "Serbia",
    "dial": "381",
    "flag": "🇷🇸"
  },
  {
    "iso": "SC",
    "name": "Seychelles",
    "dial": "248",
    "flag": "🇸🇨"
  },
  {
    "iso": "SL",
    "name": "Sierra Leona",
    "dial": "232",
    "flag": "🇸🇱"
  },
  {
    "iso": "SG",
    "name": "Singapur",
    "dial": "65",
    "flag": "🇸🇬"
  },
  {
    "iso": "SY",
    "name": "Siria",
    "dial": "963",
    "flag": "🇸🇾"
  },
  {
    "iso": "SO",
    "name": "Somalia",
    "dial": "252",
    "flag": "🇸🇴"
  },
  {
    "iso": "LK",
    "name": "Sri Lanka",
    "dial": "94",
    "flag": "🇱🇰"
  },
  {
    "iso": "ZA",
    "name": "Sudáfrica",
    "dial": "27",
    "flag": "🇿🇦"
  },
  {
    "iso": "SD",
    "name": "Sudán",
    "dial": "249",
    "flag": "🇸🇩"
  },
  {
    "iso": "SS",
    "name": "Sudán del Sur",
    "dial": "211",
    "flag": "🇸🇸"
  },
  {
    "iso": "SE",
    "name": "Suecia",
    "dial": "46",
    "flag": "🇸🇪"
  },
  {
    "iso": "CH",
    "name": "Suiza",
    "dial": "41",
    "flag": "🇨🇭"
  },
  {
    "iso": "SR",
    "name": "Surinam",
    "dial": "597",
    "flag": "🇸🇷"
  },
  {
    "iso": "SJ",
    "name": "Svalbard y Jan Mayen",
    "dial": "47",
    "flag": "🇸🇯"
  },
  {
    "iso": "TH",
    "name": "Tailandia",
    "dial": "66",
    "flag": "🇹🇭"
  },
  {
    "iso": "TW",
    "name": "Taiwán",
    "dial": "886",
    "flag": "🇹🇼"
  },
  {
    "iso": "TZ",
    "name": "Tanzania",
    "dial": "255",
    "flag": "🇹🇿"
  },
  {
    "iso": "TJ",
    "name": "Tayikistán",
    "dial": "992",
    "flag": "🇹🇯"
  },
  {
    "iso": "IO",
    "name": "Territorio Británico del Océano Índico",
    "dial": "246",
    "flag": "🇮🇴"
  },
  {
    "iso": "TL",
    "name": "Timor Oriental",
    "dial": "670",
    "flag": "🇹🇱"
  },
  {
    "iso": "TG",
    "name": "Togo",
    "dial": "228",
    "flag": "🇹🇬"
  },
  {
    "iso": "TK",
    "name": "Tokelau",
    "dial": "690",
    "flag": "🇹🇰"
  },
  {
    "iso": "TO",
    "name": "Tonga",
    "dial": "676",
    "flag": "🇹🇴"
  },
  {
    "iso": "TT",
    "name": "Trinidad y Tobago",
    "dial": "1868",
    "flag": "🇹🇹"
  },
  {
    "iso": "TN",
    "name": "Túnez",
    "dial": "216",
    "flag": "🇹🇳"
  },
  {
    "iso": "TM",
    "name": "Turkmenistán",
    "dial": "993",
    "flag": "🇹🇲"
  },
  {
    "iso": "TR",
    "name": "Turquía",
    "dial": "90",
    "flag": "🇹🇷"
  },
  {
    "iso": "TV",
    "name": "Tuvalu",
    "dial": "688",
    "flag": "🇹🇻"
  },
  {
    "iso": "UA",
    "name": "Ucrania",
    "dial": "380",
    "flag": "🇺🇦"
  },
  {
    "iso": "UG",
    "name": "Uganda",
    "dial": "256",
    "flag": "🇺🇬"
  },
  {
    "iso": "UY",
    "name": "Uruguay",
    "dial": "598",
    "flag": "🇺🇾"
  },
  {
    "iso": "UZ",
    "name": "Uzbekistán",
    "dial": "998",
    "flag": "🇺🇿"
  },
  {
    "iso": "VU",
    "name": "Vanuatu",
    "dial": "678",
    "flag": "🇻🇺"
  },
  {
    "iso": "VE",
    "name": "Venezuela",
    "dial": "58",
    "flag": "🇻🇪"
  },
  {
    "iso": "VN",
    "name": "Vietnam",
    "dial": "84",
    "flag": "🇻🇳"
  },
  {
    "iso": "WF",
    "name": "Wallis y Futuna",
    "dial": "681",
    "flag": "🇼🇫"
  },
  {
    "iso": "YE",
    "name": "Yemen",
    "dial": "967",
    "flag": "🇾🇪"
  },
  {
    "iso": "DJ",
    "name": "Yibuti",
    "dial": "253",
    "flag": "🇩🇯"
  },
  {
    "iso": "ZM",
    "name": "Zambia",
    "dial": "260",
    "flag": "🇿🇲"
  },
  {
    "iso": "ZW",
    "name": "Zimbabue",
    "dial": "263",
    "flag": "🇿🇼"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = COUNTRIES;
}
