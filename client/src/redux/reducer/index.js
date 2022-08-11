import { 
  ADD_TO_CART, 
  GET_PRODUCTS, 
  SET_USER, 
  REMOVE_USER, 
  GET_USERS_LIST,
  ADD_SPECIFIC_TO_CART, 
  REMOVE_SPECIFIC_TO_CART,
  SET_CART_LIST_WITH_LOCAL_STORAGE,
  SET_USER_DATA
} from "../actions";

const initialState = {
  products: [],
  cartList: [],
  user: {},
  userData: {},
  usersList: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {

    case GET_PRODUCTS: 
      return {
        ...state,
        products: payload
      }

    case SET_CART_LIST_WITH_LOCAL_STORAGE:
      return {
        ...state,
        cartList: payload
      }

    case ADD_TO_CART: 
      const inCart = state.cartList.find((item) => item.id === payload.id ? true : false);
      const list = inCart ? state.cartList.map((item) => item.id === payload.id ? {...item, qty: item.qty + payload.qty} : item) : [...state.cartList, payload]
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 2);

      window.localStorage.setItem(
        "hempCartList", JSON.stringify(list)
      );
      window.localStorage.setItem(
        "expiration-date-cart-list", expirationDate.toISOString()
      );

      return {
        ...state,
        cartList: list
      }
    
    case ADD_SPECIFIC_TO_CART:
      const newList = state.cartList.map((item) => item.id === payload.id ? {...item, qty: item.qty + payload.quantity} : item)
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 2);

      window.localStorage.setItem(
        "hempCartList", JSON.stringify(newList)
      );
      window.localStorage.setItem(
        "expiration-date-cart-list", expiration.toISOString()
      );

      return {
        ...state,
        cartList: newList
      }
    
    case REMOVE_SPECIFIC_TO_CART:
      const productToChange = state.cartList.find((item) => item.id === payload.id);
      let updatedList
      if (productToChange.qty - payload.quantity <= 0) {
        updatedList = state.cartList.filter((item) => item.id !== payload.id);
      } else {
        updatedList = state.cartList.map((item) => item.id === payload.id ? {...item, qty: item.qty - payload.quantity} : item);
      }

      const exptnDate = new Date();
      exptnDate.setDate(exptnDate.getDate() + 2);

      window.localStorage.setItem(
        "hempCartList", JSON.stringify(updatedList)
      );
      window.localStorage.setItem(
        "expiration-date-cart-list", exptnDate.toISOString()
      );

      return {
        ...state,
        cartList: updatedList
      }

    case SET_USER:
      return {
        ...state,
        user: payload
      }

    case SET_USER_DATA: 
      return {
        ...state, 
        userData: payload
      }

    case REMOVE_USER:
      return {
        ...state,
        user: payload
      }
    
    case GET_USERS_LIST:
      return {
        ...state,
        usersList: payload
      }

    default: 
      return { ...state };
  }
};