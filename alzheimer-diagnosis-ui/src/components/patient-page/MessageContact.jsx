import "./styles/PatientPageMessage.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MessageContact = () => {
  return (
    <div className="message-contact">
      <AccountCircleIcon style={{ color: "black" }} sx={{ fontSize: 65 }} />
      <div className="message-contact-person">
        <div className="message-contact-person-info">
          <h4>Emin Cingöz</h4>
          <p className="last-message">nasıl olmuş ama değil mi?</p>
        </div>
        <div className="message-last-seen">
          <h5>22.22</h5>
        </div>
      </div>
    </div>
  );
};

export default MessageContact;
