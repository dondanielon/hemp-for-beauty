import { getAllProductsFromApi, getUsersListFromApi } from "../../services";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_TO_CART = "ADD_TO_CART";
export const SET_USER = "SET_USER";
export const SET_USER_DATA = "SET_USER_DATA";
export const REMOVE_USER = "REMOVE_USER";
export const GET_USERS_LIST = "GET_USERS_LIST";
export const ADD_SPECIFIC_TO_CART = "ADD_SPECIFIC_TO_CART";
export const REMOVE_SPECIFIC_TO_CART = "REMOVE_SPECIFIC_TO_CART"
export const SET_CART_LIST_WITH_LOCAL_STORAGE = "SET_CART_LIST_WITH_LOCAL_STORAGE";

export function getProducts() {
  return async (dispatch) => {
    try {
      const products = await getAllProductsFromApi();
      return dispatch({ type: GET_PRODUCTS, payload: products.data.content });
    } catch (error) {
      console.log(error)
    }
  };
}

export function getUsersList(accessToken) {
  return async (dispatch) => {
    try {
      const userList = await getUsersListFromApi(accessToken);
      return dispatch({ type: GET_USERS_LIST, payload: userList.data.content });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addToCart(data) {
  return { type: ADD_TO_CART, payload: data };
}

export function addSpecificToCart(id, quantity) {
  return { type: ADD_SPECIFIC_TO_CART, payload: { id, quantity }}
}

export function removeSpecificToCart(id, quantity) {
  return { type: REMOVE_SPECIFIC_TO_CART, payload: { id, quantity }}
}

export function logIn(user) {
  return { type: SET_USER, payload: user };
}

export function logOut() {
  return { type: REMOVE_USER, payload: {} };
}

export function setCartListWithLocalStorage(list) {
  return { type: SET_CART_LIST_WITH_LOCAL_STORAGE, payload: list }
}

export function setUserData(data) {
  return { type: SET_USER_DATA, payload: data }
}