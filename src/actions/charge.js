import axios from "axios";
// import https from "https";

import { addCharge, getChargesList } from "../utils/apiConfig";
import { SET_CHARGES_LIST, SET_ONE_CHARGE } from "../constants/charge";

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

const setChargesList = (charges = []) => {
  return {
    type: SET_CHARGES_LIST,
    payload: charges,
  };
};

const setOneCharge = (charges = []) => {
  return {
    type: SET_ONE_CHARGE,
    payload: charges,
  };
};

export const getAllCharges = (id = "") => {
  return async (dispatch, getState) => {
    try {
      //   const {} = getState();
      const chargeList = await axios.get(`${getChargesList()}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("chargeList: ", chargeList);

      if (id === "") {
        dispatch(setChargesList(chargeList.data));
      } else {
        dispatch(setOneCharge(chargeList.data));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const addChargeInfo = (data) => {
  console.log("config: ", data);

  return (dispatch, getState) => {
    axios
      .post(addCharge(), data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((responseData) => {
        console.log("responseData: ", responseData);
        dispatch(getAllCharges());
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
};

export const updateChargeInfo = (data, id) => {
  console.log("config: ", data);

  return (dispatch, getState) => {
    axios
      .patch(`${addCharge()}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((responseData) => {
        console.log("responseData: ", responseData);
        dispatch(getAllCharges());
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
};
