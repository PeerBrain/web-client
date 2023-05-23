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
            console.log(data);
            // list each key from data
            // for each key, create a button with the key as the text
            // when the button is clicked, it will redirect to the chat page with the key as the recipient
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    console.log(key);
                    var btn = document.createElement("BUTTON");
                    btn.innerHTML = key;
                    btn.onclick = function() {
                        window.location.href = 'https://web.peerbrain.net/chat/' + key;
                    }
                    var columnsElement = document.querySelector('.Friends');
                    document.body.insertAdjacentHTML(btn, columnsElement);
                }
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
        <div className="Friends">
        </div>
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
