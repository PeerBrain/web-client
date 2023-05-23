import { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react";

function ProfilePage() {
  const [user, setUser] = useState(localStorage.getItem('username') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState([]);
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
          throw new Error(response.status);
        } else {
          const data = await response.json();
          setFriends(Object.keys(data)); // Extracting friend names as keys
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
        <div className="buttons">
          {friends.map((friendName) => (
            <button
              key={friendName}
              className="button is-primary"
              onClick={() => {
                // Redirect to the chat page with the friend name as the recipient
                window.location.href = `https://web.peerbrain.net/chat/${friendName}`;
              }}
            >
              {friendName}
            </button>
          ))}
        </div>
        <div className="columns">
          <button
            className="column button is-primary"
            onClick={() => (window.location.href = 'https://web.peerbrain.net/logout')}
          >
            Logout
          </button>
        </div>
        <div className="columns">
          <button
            className="column button is-primary"
            onClick={() => (window.location.href = 'https://web.peerbrain.net/settings')}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
