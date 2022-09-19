import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function loginWithCredentials({ email, password }) {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function registerNewAccount(credentials) {
  try {
    const response = await axios.post(`${baseUrl}/user/create`, credentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export function getUserInfo(accessToken) {
  const config = {
    method: "GET",
    url: `${baseUrl}/user/info`,
    headers: { authorization: `Bearer ${accessToken}` },
  };

  return axios(config);
}

export function getAllProductsFromApi() {
  return axios.get(`${baseUrl}/product?order=ASC&option=name`);
}

export function getUsersListFromApi(accessToken) {
  const options = {
    method: "GET",
    headers: { authorization: `Bearer ${accessToken}` },
  };
  return axios.get(`${baseUrl}/user/all`, options);
}

export function addStock(productId, quantity, accessToken) {
  const options = {
    method: "PATCH",
    headers: { authorization: `Bearer ${accessToken}` },
  };
  const body = {
    productId,
    quantity,
  };
  return axios.patch(`${baseUrl}/product/add`, body, options);
}

export function removeStock(productId, quantity, accessToken) {
  const options = {
    method: "PATCH",
    headers: { authorization: `Bearer ${accessToken}` },
  };
  const body = {
    productId,
    quantity,
  };
  return axios.patch(`${baseUrl}/product/remove`, body, options);
}

export function getAllStateCodes() {
  const config = {
    method: "GET",
    url: `${baseUrl}/shipment/states-codes`,
  };

  return axios(config);
}

export function getShipmentRate(body) {
  const config = {
    method: "POST",
    url: `${baseUrl}/shipment/rate`,
    data: body,
  };

  return axios(config);
}

export function createIntent(body) {
  const config = {
    method: "POST",
    url: `${baseUrl}/payment/create-intent`,
    data: body,
  };

  return axios(config);
}

export function createOrder(body) {
  const config = {
    method: "POST",
    url: `${baseUrl}/order/create-order`,
    data: body,
  };

  return axios(config);
}

export function getSpecificOrder(id) {
  const config = {
    method: "GET",
    url: `${baseUrl}/order/fetch/${id}`,
  };

  return axios(config);
}
