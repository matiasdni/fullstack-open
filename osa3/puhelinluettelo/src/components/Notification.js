export const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  if (message === null) {
    return null;
  } else if (message.slice(0, 6).includes("ERROR:", 0)) {
    return (
      <div className="notification" style={errorStyle}>
        {message.split(":").pop()}
      </div>
    );
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  );
};
