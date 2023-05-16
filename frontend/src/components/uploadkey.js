async function UploadKey(data, token) {
    const publicKey = data.public;
    const symmetricKey = data.Symmetric;
    const privateKey = data.private;
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
    if (!response.ok) {
        console.log(response.status);
        throw new Error(response.status);
    }
    if (response.ok) {
        localStorage.setItem('publicKey', btoa(publicKey));
        localStorage.setItem('symmetricKey', symmetricKey);
        localStorage.setItem('privateKey', btoa(privateKey));
        window.location.href = 'https://web.peerbrain.net/settings/keys/updated';
    }


}
export default UploadKey;