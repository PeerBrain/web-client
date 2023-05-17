async function ResetPassword(data) {
    const username = data.username;
    const response = await fetch('https://peerbrain.teckhawk.be/get_password_reset_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({
            'username': username,
        })
    })
    if (response.ok) {
        alert("Password reset email sent");
    } else {
        alert("Cannot reset password for that user");
    }

}

export default ResetPassword;