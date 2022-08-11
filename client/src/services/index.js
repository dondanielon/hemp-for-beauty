import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function loginWithCredentials({email, password}) {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, {email, password});
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function getAllProductsFromApi() {
  return axios.get(`${baseUrl}/product?order=ASC&option=name`);
}

export async function getUsersListFromApi(accessToken) {
  const options = {
    method: "GET",
    headers: { authorization: `Bearer ${accessToken}` }
  };
  return axios.get(`${baseUrl}/user/all`, options);
}

export async function addStock(productId, quantity, accessToken) {
  const options = {
    method: "PATCH",
    headers: { authorization: `Bearer ${accessToken}` }
  };
  const body = {
    productId,
    quantity
  };
  return axios.patch(`${baseUrl}/product/add`, body, options);
}

export async function removeStock(productId, quantity, accessToken) {
  const options = {
    method: "PATCH",
    headers: { authorization: `Bearer ${accessToken}` }
  };
  const body = {
    productId,
    quantity
  };
  return axios.patch(`${baseUrl}/product/remove`, body, options);
}