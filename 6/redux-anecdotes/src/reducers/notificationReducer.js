export const showNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      notification,
    });
    var timer = setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
      });
    }, time * 1000);
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.notification;
    case "HIDE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export default notificationReducer;
