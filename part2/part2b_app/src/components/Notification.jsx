import "../index.css";

const Notification = ({ message, errorMessage }) => {
  return message ? (
    <div className="notification">{message}</div>
  ) : errorMessage ? (
    <div className="error">{errorMessage}</div>
  ) : (
    ""
  );
};

export default Notification;
