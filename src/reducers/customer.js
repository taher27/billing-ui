import { SET_MY_CUSTOMERS_LIST } from "../constants/customer";

const initialState = {
  customerList: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MY_CUSTOMERS_LIST:
      return {
        ...state,
        customerList: payload,
      };

    default:
      return state;
  }
};
