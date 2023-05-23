import { useParams } from 'react-router-dom';
function Friends () {
    const { recipient } = useParams();
    return (
        <div className="box">
            <h1 className='title has-text-centered'>{recipient}</h1>
                <div className="columns">
                    <button
                        className="column button is-primary"
                        onClick={() => (window.location.href = `https://web.peerbrain.net/remove-friend/${recipient}`)}
                    >
                        Remove Friend
                    </button>
                    
                </div>
        </div>
    )
}

export default Friends;