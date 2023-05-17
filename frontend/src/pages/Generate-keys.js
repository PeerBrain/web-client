import React, { useState } from 'react';
import forge from 'node-forge';
import { saveAs } from 'file-saver';


const SymmetricDownload = (symmetricKey) => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(symmetricKey);

  // Create a Blob object from the content
  const blob = new Blob([keyData], { type: 'text/plain;charset=utf-8' });

  // Save the blob as a file
  saveAs(blob, 'message.key');
};

function GenerateKeypair() {
  const [keypair, setKeypair] = useState(null);
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const token = localStorage.getItem('token');

  const handleGenerateKeypair = async () => {
    const rsa = forge.pki.rsa;
    const keyPair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });

    const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);
    const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
    const randomBuffer = forge.random.getBytesSync(32);
    const symmetricKey = forge.util.encode64(randomBuffer)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    localStorage.setItem('symmetric-key', symmetricKey);
    localStorage.setItem('public-key', btoa(publicKey));
    localStorage.setItem('private-key', btoa(privateKey));
    const response = await fetch('https://peerbrain.teckhawk.be/api/v1/post_key_store', {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "pub_key": publicKey,
            "symmetric_key": symmetricKey
        })
    })

    setKeypair({
      symmetricKey: symmetricKey,
      publicKey: btoa(publicKey),
      privateKey: btoa(privateKey),
    });

    setShowGenerateButton(false);
  };

  return (
    <div className='box'>
      <h1 className='title has-text-centered'>Generate Keypair</h1>
      {showGenerateButton && (
        <button className="column button is-primary" onClick={handleGenerateKeypair}>Generate Keypair</button>
      )}
      {keypair && (
        <div className='columns'>
          <p>We suggest backing up these keys as they can't be recoved!</p>
          <button className="column button is-primary" onClick={() => SymmetricDownload(keypair.symmetricKey)}>Download Symmetric Key</button>
          <button className="column button is-primary" onClick={() => saveAs(new Blob([atob(keypair.publicKey)], { type: 'text/plain;charset=utf-8' }), 'public_key.pem')}>Download Public Key</button>
          <button className="column button is-primary" onClick={() => saveAs(new Blob([atob(keypair.privateKey)], { type: 'text/plain;charset=utf-8' }), 'private_key.pem')}>Download Private Key</button>
        </div>
      )}
    </div>
  );
}

export default GenerateKeypair;
