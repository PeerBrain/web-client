import { NavBar } from "../components/navbar";
export const ProfilePage = () => (
    <div className="column">
        <div className="box">
          <h1 className="title has-text-centered">PeerBrain</h1>
          <h2 className="subtitle has-text-centered">Logged in as test</h2>
            <div class="columns">
                <button className="column button is-primary" onclick="window.location.href='https://web.peerbrain.net/login';">
                Logout
                </button>
            </div>
            <div class="columns">
                <button className="column button is-primary" onclick="window.location.href='https://web.peerbrain.net/login';">
                    Change Password
                </button>    
            </div>
            <div class="columns">
                <button className="column button is-primary" onclick="window.location.href='https://web.peerbrain.net/login';">
                    Delete Account
                </button>
                </div>
        </div>  
          
    </div>
  );