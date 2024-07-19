// BIBLIOTECAS USADAS
// Lib (elliptic.min.js): https://cdnjs.cloudflare.com/ajax/libs/elliptic/6.5.3/elliptic.min.js
// Lib (crypto-js): https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js
// Lib (BigInteger-js): https://peterolson.github.io/BigInteger.js/BigInteger.min.js

// =============================== BITCOIN FINDER VERSÃO APP SCRIPT ===============================
// ===============================               V1.0               ===============================
// ===============================              MkSoft              ===============================
// ================================================================================================

// REFERÊNIAS
// Investidor Internacional
// https://www.youtube.com/@investidorint
// https://github.com/lmajowka/webloteria
// https://www.youtube.com/watch?v=uIg-GsUgdFE

// LINKS ÚTEIS
// [bitcoin-puzzle] https://privatekeys.pw/puzzles/bitcoin-puzzle-tx
// [site mksoft] https://mksoft.com.br/

// coloque seus emails aqui
const EMAILS_TO = 'maickon4developers.redmi12@gmail.com;maickon2test@gmail.com';

function saveWallet(key, value) {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(key, value);
}

function viewWallet(key) {
  const scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty(key);
}

function getWallet(number, viewSize = false) {
  const private_key = PRIVATE_KEY_RANGES[number-1];
  const bitcoin_address = BITCOIN_ADDRESS[number-1];

  if(viewSize) {
    log('PRIVATE_KEY_RANGES: '+PRIVATE_KEY_RANGES.length);
    log('BITCOIN_ADDRESS: '+BITCOIN_ADDRESS.length);
  }
  return {
    id: number,
    key: private_key,
    address: bitcoin_address
  }
}

function divideBigIntHexRange(minHex, maxHex, numIntervals) {
  minHex = minHex.toLowerCase().replace(/^0x/, '');
  maxHex = maxHex.toLowerCase().replace(/^0x/, '');
  
  const minBigInt = bigInt(minHex, 16);
  const maxBigInt = bigInt(maxHex, 16);
  const rangeSize = maxBigInt.subtract(minBigInt).add(1).divide(numIntervals);
  const intervals = [];

  for (let i = 0; i < numIntervals; i++) {
    const intervalMin = minBigInt.add(rangeSize.multiply(i));
    const intervalMax = (i === numIntervals - 1) ? maxBigInt : intervalMin.add(rangeSize).subtract(1);

    intervals.push({
      min: '0x'+intervalMin.toString(16),
      max: '0x'+intervalMax.toString(16),
    });
  }

  return intervals;
}

function removeVerifiedRange(originalMaxHex = '0xfffff', originalMinHex = '0x80000', verifiedMaxHex = '0xfffff', verifiedMinHex = '0x96a0d') {
  originalMinHex = originalMinHex.toLowerCase().replace(/^0x/, '');
  originalMaxHex = originalMaxHex.toLowerCase().replace(/^0x/, '');
  verifiedMinHex = verifiedMinHex.toLowerCase().replace(/^0x/, '');
  verifiedMaxHex = verifiedMaxHex.toLowerCase().replace(/^0x/, '');

  const originalMin = bigInt(originalMinHex, 16);
  const originalMax = bigInt(originalMaxHex, 16);
  const verifiedMin = bigInt(verifiedMinHex, 16);
  const verifiedMax = bigInt(verifiedMaxHex, 16);

  let remainingIntervals = [];

  if (verifiedMin.compareTo(originalMax) > 0 || verifiedMax.compareTo(originalMin) < 0) {
    remainingIntervals.push({
      min: originalMinHex,
      max: originalMaxHex
    });
    return remainingIntervals;
  }

  if (verifiedMin.compareTo(originalMin) > 0) {
    remainingIntervals.push({
      min: originalMin.toString(16),
      max: verifiedMin.subtract(bigInt(1)).toString(16)
    });
  }

  if (verifiedMax.compareTo(originalMax) < 0) {
    remainingIntervals.push({
      min: verifiedMax.add(bigInt(1)).toString(16),
      max: originalMax.toString(16)
    });
  }

  return remainingIntervals;
}

function start() {
  let wallet = getWallet(66);
  // log(wallet);
  // let wallet_areas = divideBigIntHexRange(wallet.key.min, wallet.key.max, 10);
  // wallet.areas = wallet_areas;
  // log(wallet);
  loop(wallet);
}

function getRandomObject(arr) {
  if (arr.length === 0) {
    throw new Error('O array não pode estar vazio.');
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return {
    areaIndex: randomIndex,
    area: arr[randomIndex]
  };
}

/*
{
  key={
    min=0x80000, 
    max=0xfffff
  }, 
  id=20.0, 
  address=1HsMJxNiV7TLxmoF6uJNkydxPFDog4NQum, 
  areas=[
    {max=0x8cccb, min=0x80000}, {min=0x8cccc, max=0x99997}, {max=0xa6663, min=0x99998}, {min=0xa6664, max=0xb332f}, {max=0xbfffb, min=0xb3330}, {min=0xbfffc, max=0xcccc7}, {min=0xcccc8, max=0xd9993}, {max=0xe665f, min=0xd9994}, {max=0xf332b, min=0xe6660}, {min=0xf332c, max=0xfffff}
  ]
}

database:
  walleet: 20,
  address: 1HsMJxNiV7TLxmoF6uJNkydxPFDog4NQum,
  areas=[
    {max=0x8cccb, min=0x80000, current: [{min=80000, max=969a7}, {min=96a0d, max=fffff}]},
  ]
  checked: 100
*/


// Exemplo de uso da função sendEmail
function sendMail(body, subject) {
  let to = EMAILS_TO;
  GmailApp.sendEmail(to, subject, body);
}


function loop(wallet) {
  log(`ACESSANDO A CARTEIRA ${wallet.id}`);
  log('EXECUTANDO...');

  // let selected = getRandomObject(wallet.areas);
  // let privateKeyInt = generateRandomNumber(selected.area.min, selected.area.max);
  let privateKeyInt = generateRandomNumber(wallet.key.min, wallet.key.max);
  let startPrivateKeyInt = privateKeyInt;
  for (let i = 0; i < 50000; i++) {
    const address = generateAddress(privateKeyInt.toString(16));
    if (address == wallet.address) {
      log('FINALIZANDO...');
      log('CHAVE PRIVADA ENCONTRADA: ' + privateKeyInt.toString(16));
      saveWallet('PRIVATE_KEY', privateKeyInt.toString(16));
      const mailMessage = `
PARABÉNS!!! HOJE É O SEU DIA! A CHAVE PRIVADA DA CARTEIRA ${wallet.id} FOI ENCONTRADA
CHAVE PRIVADA ENCONTRADA: ${privateKeyInt.toString(16)}
CARA, TU TA RICO!!! kkkkk`;
      const mailSubject = `Mensagem do APP BitcoinFinder - Wallet ${wallet.id}`;
      sendMail(mailMessage, mailSubject);
      return; // Stop the loop
    }
    privateKeyInt++;
  }
  log('FINALIZANDO...');
  log('NADA ENCONTRADO!');
  log('ULTIMA CHAVE CHECADA: ' + privateKeyInt.toString(16));
  log('NOVO INTERVALO A PESQUISAR: ' + startPrivateKeyInt.toString(16) + '...' + privateKeyInt.toString(16));
  // let current = removeVerifiedRange(wallet.key.max, wallet.key.min, startPrivateKeyInt.toString(16), privateKeyInt.toString(16));
  // let myWallet = {
  //   wallet: wallet.id,
  //   address: wallet.address,
  //   areas: {}
  // }

  // if(!myWallet.areas[selected.areaIndex]) {
  //   myWallet.areas[selected.areaIndex] = [];
  // }

  // myWallet.areas[selected.areaIndex].push({
  //   max: wallet.key.max,
  //   min: wallet.key.min,
  //   current: [current]
  // });

  // saveWallet(`WALLET${wallet.id}`, JSON.stringify(myWallet));

  // log(myWallet);
}

function log(message) {
  Logger.log(message);
}

function generateAddress(privateKeyInt) {
  const EC = elliptic.ec;
  const ec = new EC('secp256k1');
  const keyPair = ec.keyFromPrivate(privateKeyInt, 'hex');
  const publicKey = keyPair.getPublic(true, 'hex');
  const sha256Hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
  const ripemd160Hash = CryptoJS.RIPEMD160(sha256Hash);
  const version = '00';
  const versionedHash = version + ripemd160Hash.toString();
  const checksum = CryptoJS.SHA256(CryptoJS.SHA256(CryptoJS.enc.Hex.parse(versionedHash))).toString().substring(0, 8);
  const addressHex = versionedHash + checksum;
  const address = hexToBase58(addressHex);

  return address;
}

function hexToBase58(hex) {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const base = BigInt(58);
  let num = BigInt('0x' + hex);
  let encoded = '';

  while (num > 0) {
    const remainder = num % base;
    num = num / base;
    encoded = alphabet[remainder] + encoded;
  }

  for (let i = 0; i < hex.length && hex[i] === '0'; i += 2) {
    encoded = '1' + encoded;
  }

  return encoded;
}

function generateRandomNumber(min, max) {
  const range = BigInt(max - min);
  let randomBigInt = BigInt(0);
  const randomBytes = [];
  for (let i = 0; i < 32; i++) {
    randomBytes.push(Math.floor(Math.random() * 256));
  }

  let hexString = "";
  for (let i = 0; i < randomBytes.length; i++) {
    hexString += randomBytes[i].toString(16).padStart(2, "0");
  }

  randomBigInt = BigInt('0x' + hexString);
  const result = BigInt(min) + (randomBigInt % range);

  return result;
}
