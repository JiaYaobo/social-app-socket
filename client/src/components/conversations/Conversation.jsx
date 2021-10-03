import "./conversation.css";
import axios from "axios";
import {useState, useEffect} from "react";


const Conversation = ({conversation, currentUser}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser] = useState(null);
    useEffect( () => {
        const friendId = conversation?.members.find(m=>m!==currentUser._id);
        const getUser = async ()=>{
            try {
                const res = await axios.get("/users?userId="+friendId);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    },[currentUser, conversation,user]);
    return (
        <div className="conversation">
            <img className="conversationImg" src={user?.profilePicture? PF+user?.profilePicture: "https://images.pexels.com/photos/2894230/pexels-photo-2894230.jpeg?cs=srgb&dl=pexels-eunhyuk-ahn-2894230.jpg&fm=jpg"} alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

export default Conversation
