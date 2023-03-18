import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export const Notification = () => {
  const { state, dispatch } = useContext(NotificationContext);
  if (state.message === null) {
    return null;
  }

  setTimeout(() => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  }, 3000);

  const style = {
    color: state.style === "alert" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={style} id="notification">
      {state.message}
    </div>
  );
};
