export const HomePage = () => (
    <div className="column">
        <div className="box">
          <h1 className="title has-text-centered">PeerBrain</h1>
          <div class="columns">
            <button className="column button is-primary" onclick="window.location.href='https://web.peerbrain.net/login';">
              Login
            </button>
            <button className="column button is-primary" onclick="window.location.href='https://web.peerbrain.net/register';">
              Register
            </button>
          </div>
          
        </div>
    </div>
  );