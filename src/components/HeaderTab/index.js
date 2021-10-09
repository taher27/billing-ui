import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";

// import {sendDataToElectronMainThread} from '../../utils/electronBridges';

import * as s from "./headerButton.module.scss";

class HeaderTab extends Component {
  componentDidMount() {
    const { defaultTab } = this.props;
    this.setState({
      activeScreen: defaultTab,
    });
  }

  render() {
    const {
      handlerActiveScreen,
      headerButton,
      activeScreen,
    } = this.props;

    const renderButtonList = headerButton.map((button, i) => {
      let buttonCss = cx(s.collabButton, {
        [s.active]: activeScreen === button.key,
      });

      return (
        <div
          key={i}
          className={buttonCss}
          onClick={() => {
            handlerActiveScreen(button.key);
            this.setState({
              activeScreen: button.key,
            });
          }}
        >
          {button.name}
        </div>
      );
    });
    return <div className={s.collabOption}>{renderButtonList}</div>;
  }
}

const mapActionToProps = {};

export default connect((state) => state, mapActionToProps)(HeaderTab);
