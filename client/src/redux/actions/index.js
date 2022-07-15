import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

const URL = "http://192.168.100.238:3001";

export function getProducts() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/api/product?order=ASC&option=name`);
      return dispatch({ type: GET_PRODUCTS, payload: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addToCart(data) {
  return { type: ADD_TO_CART, payload: data };
}

export function removeFromCart(id) {
  return { type: REMOVE_FROM_CART, payload: id };
}