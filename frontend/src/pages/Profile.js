import { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react";

// Assuming you have a JSONButton component defined
function JSONButton({ keyName, handleClick }) {
  return (
    <button onClick={() => handleClick(keyName)}>{keyName}</button>
  );
}

function ProfilePage() {
  const [user, setUser] = useState(localStorage.getItem('username') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  Sentry.setUser({ username: user });
  const handleButtonClick = (key) => {
    // Perform any action when a button is clicked
    console.log('Button clicked for key:', key);
  };
  const renderButtons = (data) => {
    return Object.keys(data).map((key) => (
      <JSONButton key={key} keyName={key} handleClick={handleButtonClick} />
    ));
  };

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
          console.log(data);
          setLoading(false);
          renderButtons(data); // Render buttons after data is fetched
        }
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
        {/* Buttons will be rendered by renderButtons() */}
        <div>{renderButtons(data)}</div>
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
