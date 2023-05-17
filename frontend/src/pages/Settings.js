import { useState, useEffect } from 'react';
function Settings() {
    const [user, setUser] = useState(localStorage.getItem('username') || '');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await fetch('https://mfa.peerbrain.net/api/v1/token-test', {
            method: 'GET',
            headers: {
                'token': `${token}`,
            },
            });
            if (!response.ok) {
                console.log(response.status);
            throw new Error(response.status);
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
        }
        fetchData();
    }, [token]);

    if (loading) {
        return <div className='box'>Loading...</div>;
    }

    if (error) {
        return <div className='box'>Error: {error.message}</div>;
    }
    return (
        <div className="box">
            <h1 className="title has-text-centered">Settings</h1>
            <div className="columns">
                <button className=" button is-primary" onClick={() => window.location.href = 'https://web.peerbrain.net/settings/keys'}>key settings</button>
                <button className=" button is-primary" onClick={() => window.location.href = 'https://web.peerbrain.net/profile'}>Home</button>
            </div>
        </div>
    );
}

export default Settings;