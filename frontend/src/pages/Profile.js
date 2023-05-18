import { useState, useEffect } from 'react';

function ProfilePage() {
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
    <div className="column">
      <div className="box">
        <h1 className="title has-text-centered">PeerBrain</h1>
        <h2 className="subtitle has-text-centered">Logged in as {user}</h2>
        <div className="columns">
          <button className="column button is-primary" onClick={() => window.location.href = 'https://web.peerbrain.net/logout'}>
            Logout
          </button>
        </div>
        <div className="columns">
          <button className="column button is-primary" onClick={() => window.location.href = 'https://web.peerbrain.net/settings'}>
           Settings
          </button>
        </div>
      </div>  
    </div>
  );
}

export default ProfilePage;
