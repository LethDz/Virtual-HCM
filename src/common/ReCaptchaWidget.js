import React, { Component } from 'react';
const Recaptcha = require('react-recaptcha');

let recaptchaInstance = null;

class ReCaptchaWidget extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.needVerifyRobot !== this.props.needVerifyRobot &&
      this.props.needVerifyRobot
    ) {
      recaptchaInstance.reset();
    }
  }

  verifyCallback = () => {
    this.props.setNeedVerifyRobot(false);
  };

  expiredCallback = () => {
    this.props.setNeedVerifyRobot(true);
  };

  render() {
    return (
      <Recaptcha
        ref={(e) => (recaptchaInstance = e)}
        sitekey={process.env.REACT_APP_RECAPTCHA_S_K}
        render="explicit"
        hl="en"
        verifyCallback={this.verifyCallback}
        expiredCallback={this.expiredCallback}
        onloadCallback={() => {}}
      />
    );
  }
}

export default ReCaptchaWidget;
