import React from "react";
import { connect } from "react-redux";

class Notification extends React.Component {
  render() {
    if (this.props.notification === "") {
      return null;
    }
    const style = {
      padding: 10,
      borderWidth: 1,
    };
    return <div style={style}>{this.props.notification}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
