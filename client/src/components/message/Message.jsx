import "./message.css";
import {format} from "timeago.js";


const Message = ({message,own}) => {
    return (
        <div className={own?"message own": "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://images.pexels.com/photos/5612320/pexels-photo-5612320.jpeg?cs=srgb&dl=pexels-thirdman-5612320.jpg&fm=jpg" alt="" />
                <p className="messageText">{message?.text}</p>
            </div>
            <div className="messageBottom">{format(message?.createdAt)}</div>
        </div>
    )
}

export default Message
