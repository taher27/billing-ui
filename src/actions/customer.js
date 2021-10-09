import axios from "axios";
// import https from "https";

import { addCustomer, getCustomersList } from "../utils/apiConfig";
import { SET_MY_CUSTOMERS_LIST } from "../constants/customer";

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

const setCustomersList = (myCustomers = []) => {
  return {
    type: SET_MY_CUSTOMERS_LIST,
    payload: myCustomers,
  };
};

export const getAllCustomers = () => {
  return async (dispatch, getState) => {
    //   dispatch(setLoader('fetchingMyRoostNetwork', true));
    try {
      //   const {} = getState();
      const customersList = await axios.get(getCustomersList(), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("customersList: ", customersList);

      dispatch(setCustomersList(customersList.data));
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
