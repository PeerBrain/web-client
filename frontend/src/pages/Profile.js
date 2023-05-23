import { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react";

function ProfilePage() {
  const [user, setUser] = useState(localStorage.getItem('username') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  Sentry.setUser({ username: user });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://peerbrain.teckhawk.be/api/v1/friends', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
            console.log(response.status);
          throw new Error(response.status);
        }
        else {
            const data = await response.json();
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
            }
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
