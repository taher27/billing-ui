import axios from "axios";
// import https from "https";

import { addCustomer, getCustomersList } from "../utils/apiConfig";
import { SET_MY_CUSTOMERS_LIST, SET_ONE_CUSTOMER } from "../constants/customer";

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

const setCustomersList = (myCustomers = []) => {
  return {
    type: SET_MY_CUSTOMERS_LIST,
    payload: myCustomers,
  };
};

const setOneCustomer = (myCustomers = []) => {
  return {
    type: SET_ONE_CUSTOMER,
    payload: myCustomers,
  };
};

export const getAllCustomers = (id = "") => {
  return async (dispatch, getState) => {
    //   dispatch(setLoader('fetchingMyRoostNetwork', true));
    try {
      //   const {} = getState();
      const customersList = await axios.get(`${getCustomersList()}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("customersList: ", customersList);
      if (id === "") {
        dispatch(setCustomersList(customersList.data));
      } else {
        dispatch(setOneCustomer(customersList.data));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const addCustomerInfo = (data) => {
  console.log("config: ", data);

  return (dispatch, getState) => {
    axios
      .post(addCustomer(), data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((responseData) => {
        console.log("responseData: ", responseData);
        dispatch(getAllCustomers());
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
};

export const UpdateCustomerInfo = (data, id) => {
  console.log("config: ", data);

  return (dispatch, getState) => {
    axios
      .patch(`${addCustomer()}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((responseData) => {
        console.log("responseData: ", responseData);
        dispatch(getAllCustomers());
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
};
