import React, { Component } from "react";
import { connect } from "react-redux";
import * as s from "./customer.module.scss";
import * as _ from "lodash";
import HeaderTab from "../HeaderTab";
import { getAllCustomers, addCustomerInfo } from "../../actions/customer";
import Table from "../Table";
import { customerTableList } from "../../utils/tableViewConfig";
import editIcon from "../../assets/svgs/editIcon.svg";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cname: "",
      address: "",
      phone: "",
      pobox: "",
      vat: "",
      region: "",
      errorMsg: "",
      activeScreen: "view",
    };
    this.setActiveScreen = this.setActiveScreen.bind(this);
  }

  componentDidMount() {
    const { getAllCustomers } = this.props;
    getAllCustomers();
  }

  getCompanyname(e) {
    let val = _.get(e, "target.value", "");
    this.setState({
      cname: val,
    });
  }

  getAddress(e) {
    let val = _.get(e, "target.value", "");
    this.setState({
      address: val,
    });
  }

  getPhone(e) {
    let val = _.get(e, "target.value", "");
    this.setState({
      phone: val,
    });
  }

  getPobox(e) {
    let val = _.get(e, "target.value", "");
    this.setState({
      pobox: val,
    });
  }

  getVAT(e) {
    let val = _.get(e, "target.value", "");
    if (val.length >= 14) {
      this.setState({
        errorMsg: "*VAT number should be of 13 digit",
      });
      return;
    }
    this.setState({
      vat: val,
    });
  }

  getRegion(e) {
    let val = _.get(e, "target.value", "");
    this.setState({
      region: val,
    });
  }

  addCustomer() {
    const { cname, address, phone, pobox, vat, region } = this.state;
    const { addCustomerInfo } = this.props;
    
    let obj = {
      cname: cname,
      address: address,
      phone: phone,
      pobox: pobox,
      vat: vat,
      region: region,
    };

    addCustomerInfo(JSON.stringify(obj));
    this.setActiveScreen("view");
  }

  refreshScreen = () => {
    const { getAllCustomers } = this.props;
    getAllCustomers();
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

    const AddCustomer = () => {
      const { cname, address, phone, pobox, vat, region } = this.state;
      return (
        <>
          <h1>Add Customer Details</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Customer name"
            value={cname}
            onChange={(e) => {
              this.getCompanyname(e);
            }}
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            onChange={(e) => {
              this.getAddress(e);
            }}
            value={address}
          />

          <label htmlFor="address">Region</label>
          <input
            type="text"
            id="region"
            placeholder="Region"
            onChange={(e) => {
              this.getRegion(e);
            }}
            value={region}
          />

          <label htmlFor="address">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Phone"
            onChange={(e) => {
              this.getPhone(e);
            }}
            value={phone}
          />

          <label htmlFor="address">P O Box</label>
          <input
            type="text"
            id="pobox"
            placeholder="P O Box"
            onChange={(e) => {
              this.getPobox(e);
            }}
            value={pobox}
          />

          <label htmlFor="address">VAT</label>
          <input
            type="text"
            id="vat"
            placeholder="VAT"
            onChange={(e) => {
              this.getVAT(e);
            }}
            value={vat}
          />

          <button
            className={s.addButton}
            onClick={() => {
              this.addCustomer();
            }}
          >
            Add Customer
          </button>
        </>
      );
    };

    const ViewCustomer = () => {
      const {
        customer: { customerList },
      } = this.props;
      console.log("this.props: ", this.props);
      let customerData = [];

      customerList.forEach((item) => {
        let actionArray = [];
        actionArray.push({
          src: editIcon,
          message: "",
          handler: () => {
            console.log("item: ", item);
          },
        });
        let Obj = {
          name: item.cname,
          address: item.address,
          phone: item.phone,
          pobox: item.pobox,
          vat: item.vat,
          region: item.region,
          action: actionArray,
        };
        customerData.push(Obj);
      });
      return (
        <>
          <h1>Customers</h1>
          <div>
            <Table
              head={customerTableList}
              data={customerData}
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
              headerButton={customerHeaderButtonArray}
              defaultTab={"view"}
              activeScreen={activeScreen}
            />
          </div>

          <div className={s.bodyView}>
            {activeScreen === "add" && <>{AddCustomer()}</>}
            {activeScreen === "view" && <>{ViewCustomer()}</>}
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

const customerHeaderButtonArray = [
  {
    name: "ADD Customer",
    key: "add",
  },
  {
    name: "View Customers",
    key: "view",
  },
];

const mapActionsToProps = {
  getAllCustomers,
  addCustomerInfo,
};
export default connect((state) => state, mapActionsToProps)(Customer);
