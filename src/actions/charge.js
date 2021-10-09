import axios from "axios";
// import https from "https";

import { addCharge, getChargesList } from "../utils/apiConfig";
import { SET_CHARGES_LIST } from "../constants/charge";

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

const setChargesList = (charges = []) => {
  return {
    type: SET_CHARGES_LIST,
    payload: charges,
  };
};

export const getAllCharges = () => {
  return async (dispatch, getState) => {
    try {
      //   const {} = getState();
      const chargeList = await axios.get(
        getChargesList(),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("chargeList: ", chargeList);

      dispatch(setChargesList(chargeList.data));
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
