import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect } from "react";

const MessageBubble = (props) => {
  /*useEffect(() => {
    //console.log("sentTime: ", props.sentTime);
  }, [props.sentTime]);*/

  return (
    <div
      className="message-bubble"
      style={props.isMyMessage === true ? { justifyContent: "end" } : {}}
    >
      <div
        className="bubble-contact-pp"
        style={props.isMyMessage === true ? { display: "none" } : {}}
      >
        <AccountCircleIcon sx={{ fontSize: 33 }} />
      </div>
      <div
        className="message-body"
        style={
          props.isMyMessage === true ? { borderRadius: "15px 15px 0 15px" } : {}
        }
      >
        <div className="message-bubble-text">
          <p>{props.message}</p>
        </div>
        <div className="message-bubble-sent-time">{props.sentTime}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
