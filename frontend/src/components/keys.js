const crypto = require('crypto');
const { privateKeyExport, publicKeyExport } = require('crypto');

function generate_keypair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicExponent: 65537,
  });

  const private_key = privateKeyExport({
    format: 'pem',
    type: 'pkcs8',
    key: privateKey,
  });

  const public_key = publicKeyExport({
    format: 'pem',
    type: 'spki',
    key: publicKey,
  });

  const key = crypto.randomBytes(32);
  localStorage.setItem("symmetric-key", key)
  localStorage.setItem("publickey", public_key)
  localStorage.setItem("privatekey", private_key)
  return [key, public_key, private_key];
}


export default generate_keypair