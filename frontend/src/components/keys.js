import React, { useState } from 'react';
import forge from 'node-forge';


  const HandleGenerateKeypair = async () => {
    const [keypair, setKeypair] = useState(null);
    const rsa = forge.pki.rsa;
    const keyPair = rsa.generateKeyPair({bits: 2048, e: 0x10001});

    const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);
    const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
    const randomBuffer = forge.random.getBytesSync(32);
    console.log(randomBuffer)
    const symmetricKey = forge.util.encode64(randomBuffer).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    localStorage.setItem('symmetric-key', symmetricKey);
    localStorage.setItem('public-key', btoa(publicKey));
    localStorage.setItem('private-key', btoa(privateKey));

    setKeypair({
      symmetricKey: symmetricKey,
      publicKey: btoa(publicKey),
      privateKey: btoa(privateKey),
    });
    window.location.href = 'https://web.peerbrain.net/settings/keys';
  };

export default HandleGenerateKeypair;
