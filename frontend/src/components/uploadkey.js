async function UploadKey(data, token) {
    const publicKey = data.public;
    const symmetricKey = data.Symmetric;
    await fetch('https://peerbrain.teckhawk.be/api/v1/post_key_store', {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "public_key": publicKey,
            "symmetric_key": symmetricKey
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                alert("Key Uploaded");
            }
            else {
                alert("Key Upload Failed");
            }
        })


}
export default UploadKey;