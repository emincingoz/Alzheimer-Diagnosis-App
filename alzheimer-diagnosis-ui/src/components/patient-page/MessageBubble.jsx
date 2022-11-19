import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MessageBubble = () => {
  return (
    <div className="message-bubble">
      <div className="bubble-contact-pp">
        <AccountCircleIcon sx={{ fontSize: 33 }} />
      </div>
      {/*<div className="message-body">
        <div className="message-bubble-text">
          <p>nasıl olmuş ama, bu kesinlikle mükemmel.</p>
        </div>
        <div className="message-bubble-sent-time">23.03</div>
      </div>*/}
      <div className="message-body">
        <div className="message-bubble-text">
          <p>
            nasıl olmuş ama, bu kesinlikle mükemmel. dfgfdhgfhgjhgjhgj
            fghgjhgkjhkjhd fhgjhgjh
          </p>
        </div>
        <div className="message-bubble-sent-time">23.03</div>
      </div>
    </div>
  );
};

export default MessageBubble;
