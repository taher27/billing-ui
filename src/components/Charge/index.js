import React, { Component } from "react";
import { connect } from "react-redux";
import * as s from "./charge.module.scss";
import * as _ from "lodash";
import HeaderTab from "../HeaderTab";
import { addChargeInfo, getAllCharges } from "../../actions/charge";

import Table from "../Table";
import { chargeTableList } from "../../utils/tableViewConfig";
import editIcon from "../../assets/svgs/editIcon.svg";

class Charge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      errorMsg: "",
      activeScreen: "view",
    };
    this.setActiveScreen = this.setActiveScreen.bind(this);
  }

  componentDidMount() {
    const { getAllCharges } = this.props;
    getAllCharges();
  }

  getChargeName(e) {
    let val = _.get(e, "target.value", "");
    this.setState({
      name: val,
    });
  }

  addCharge() {
    const { name } = this.state;
    const { addChargeInfo } = this.props;

    let obj = {
      name: name,
    };

    addChargeInfo(JSON.stringify(obj));
    this.setActiveScreen("view");
  }

  refreshScreen = () => {
    const { getAllCharges } = this.props;
    getAllCharges();
  };

  setActiveScreen = (screen) => {
    if (screen === "view") {
      this.refreshScreen();
    }
    this.setState({
      activeScreen: screen,
    });
  };

  render() {
    const { errorMsg, activeScreen } = this.state;

    const AddCharge = () => {
      const { name } = this.state;
      return (
        <>
          <h1>Add Charge</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Charge name"
            value={name}
            onChange={(e) => {
              this.getChargeName(e);
            }}
          />

          <button
            className={s.addButton}
            onClick={() => {
              this.addCharge();
            }}
          >
            Add Charge
          </button>
        </>
      );
    };

    const ViewCharge = () => {
      const {
        charge: { chargeList },
      } = this.props;
      console.log("this.props: ", this.props);
      let chargeData = [];

      chargeList.forEach((item) => {
        let actionArray = [];
        actionArray.push({
          src: editIcon,
          message: "",
          handler: () => {
            console.log("item: ", item);
          },
        });
        let Obj = {
          name: item.name,
          action: actionArray,
        };
        chargeData.push(Obj);
      });

      return (
        <>
          <h1>Charges</h1>
          <div>
            <Table
              head={chargeTableList}
              data={chargeData}
              recordsPerPage={7}
              rowbreak
            />
          </div>
        </>
      );
    };

    return (
      <>
        <div className={s.container}>
          <div className={s.header}>
            <HeaderTab
              handlerActiveScreen={this.setActiveScreen}
              headerButton={chargeHeaderButtonArray}
              defaultTab={"view"}
              activeScreen={activeScreen}
            />
          </div>

          <div className={s.bodyView}>
            {activeScreen === "add" && <>{AddCharge()}</>}
            {activeScreen === "view" && <>{ViewCharge()}</>}
          </div>

          <div className={s.footer}>
            <div className={s.errorMsg}>
              <span>{errorMsg}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const chargeHeaderButtonArray = [
  {
    name: "ADD Charge",
    key: "add",
  },
  {
    name: "View Charges",
    key: "view",
  },
];

const mapActionsToProps = {
  getAllCharges,
  addChargeInfo,
};
export default connect((state) => state, mapActionsToProps)(Charge);
