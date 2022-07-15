import { ADD_TO_CART, GET_PRODUCTS, REMOVE_FROM_CART } from "../actions";

const initialState = {
  products: [],
  cartList: []
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {

    case GET_PRODUCTS: 
      return {
        ...state,
        products: payload
      }
    

    case ADD_TO_CART: 
      const inCart = state.cartList.find((item) => item.id === payload.id ? true : false);
      return {
        ...state,
        cartList: inCart ? state.cartList.map((item) => item.id === payload.id ? {...item, qty: item.qty + payload.qty} : item) : [...state.cartList, payload]
      }

    case REMOVE_FROM_CART:
      const newList = state.cartList.filter((item) => item.id !== payload);
      return {
        ...state,
        cartList: newList
      }

    default: 
      return { ...state };
  }
};