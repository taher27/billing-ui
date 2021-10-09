import { SET_CHARGES_LIST } from "../constants/charge";

const initialState = {
  chargeList: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CHARGES_LIST:
      return {
        ...state,
        chargeList: payload,
      };

    default:
      return state;
  }
};
