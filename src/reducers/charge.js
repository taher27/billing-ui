import { SET_CHARGES_LIST, SET_ONE_CHARGE } from "../constants/charge";

const initialState = {
  chargeList: [],
  oneCharge: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CHARGES_LIST:
      return {
        ...state,
        chargeList: payload,
      };

    case SET_ONE_CHARGE:
      return {
        ...state,
        oneCharge: payload,
      };

    default:
      return state;
  }
};
