import React, { Component } from "react";
import cx from "classnames";
import * as s from "./toggleText.module.scss";
// import * as _ from 'lodash';


class ToggleText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  toggleDescription() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const {
      data,
      stringKey,
    } = this.props;

    let fullData =
      stringKey === "name"
        ? data[stringKey][0] !== ""
          ? data[stringKey][0]
          : "-"
        : data[stringKey] !== ""
        ? data[stringKey]
        : " - ";

    const lessData =
      fullData && fullData.length > 65
        ? fullData.slice(0, 65)
        : fullData !== ""
        ? fullData
        : " - ";

    const dataRendering = (data) => {
      if (data.length === 0) {
        return <div>-</div>;
      }
      const color = cx(s.descriptionSpan, {});

      return (
        <>
          <span className={color}>
            {!this.state.show ? (
              <>
                {lessData}{" "}
                {fullData && fullData.length > 65 && (
                  <span
                    onClick={() => this.toggleDescription()}
                    className={s.seemore}
                  >
                    ... See More
                  </span>
                )}
              </>
            ) : (
              <>
                {fullData}{" "}
                {fullData && fullData.length > 65 && (
                  <span
                    onClick={() => this.toggleDescription()}
                    className={s.seemore}
                  >
                    . See Less
                  </span>
                )}
              </>
            )}
          </span>
        </>
      );
    };

    return <div className={s.container}>{dataRendering(data)}</div>;
  }
}

export default ToggleText;
// const mapActionToProps = {};

// export default connect((state) => state, mapActionToProps)(ToggleText);
