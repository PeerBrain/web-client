async function UploadKey(data, token) {
    const publicKey = data.public;
    const symmetricKey = data.Symmetric;
    const privateKey = data.private;
    await fetch('https://peerbrain.teckhawk.be/api/v1/post_key_store', {
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
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                localStorage.setItem('publicKey', btoa(publicKey));
                localStorage.setItem('symmetricKey', symmetricKey);
                localStorage.setItem('privateKey', btoa(privateKey));
                alert("Key Uploaded");
            }
            else {
                alert("Key Upload Failed");
            }
        })


}
export default UploadKey;