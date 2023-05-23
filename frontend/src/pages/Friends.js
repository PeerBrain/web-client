import { useParams } from 'react-router-dom';
function Friends () {
    const { recipient } = useParams();
    return (
        <div className="box">
            <h1 className='title has-text-centered'>{recipient}</h1>
        </div>
    )
}

export default Friends;