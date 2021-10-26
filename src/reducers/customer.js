import { SET_MY_CUSTOMERS_LIST, SET_ONE_CUSTOMER } from "../constants/customer";

const initialState = {
  customerList: [],
  oneCustomer: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MY_CUSTOMERS_LIST:
      return {
        ...state,
        customerList: payload,
      };
    case SET_ONE_CUSTOMER:
      return {
        ...state,
        oneCustomer: payload,
      };

    default:
      return state;
  }
};
