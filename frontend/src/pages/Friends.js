import { useParams } from 'react-router-dom';
function Friends () {
    const { recipient } = useParams();
    return (
        <div className="box">
            {recipient}
        </div>
    )
}

export default Friends;