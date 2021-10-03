import "./chatOnline.css";
import {useState, useEffect} from "react";
import axios from "axios";
const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    const handleClick = async (user) =>{
        try{
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        }catch (err) {
            console.log(err);
        }
    }

    useEffect(() =>{
        const getFriends = async() =>{
            const res = await axios.get("/users/friends/"+currentId);
            setFriends(res.data);
        };

        getFriends();
    },[currentId]);

    useEffect(() =>{
        setOnlineFriends(friends?.filter(f=>onlineUsers.includes(f._id)));
    },[friends, onlineUsers]);
    return (
        <div className="chatOnline">
            {onlineFriends?.map(o =>(
                <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
                    <div className="chatOnlineImgContainer">
                        <img className="chatOnlineImg" src="https://images.pexels.com/photos/2894230/pexels-photo-2894230.jpeg?cs=srgb&dl=pexels-eunhyuk-ahn-2894230.jpg&fm=jpg" alt="" />
                        <div className="chatOnlineImgBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    )
}

export default ChatOnline
