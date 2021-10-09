// http://localhost:9000/customers/

export const httpUrl = () => {
  return `http://localhost:9000`;
};

export const getCustomersList = () => {
  return `${httpUrl()}/customers`;
};

export const addCustomer = () => {
  return `${httpUrl()}/customers`;
};

export const getChargesList = () => {
  return `${httpUrl()}/charges`;
};

export const addCharge = () => {
  return `${httpUrl()}/charges`;
};
