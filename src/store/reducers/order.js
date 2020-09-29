import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  let changedState = state;

  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      changedState = {
        ...state,
        purchased: false,
      };
      break;
    case actionTypes.PURCHASE_BURGER_START:
      changedState = {
        ...state,
        loading: true,
      };
      break;
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      changedState = {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
      break;
    case actionTypes.PURCHASE_BURGER_FAIL:
      changedState = {
        ...state,
        loading: false,
      };
      break;
    case actionTypes.FETCH_ORDERS_START:
      changedState = {
        ...state,
        loading: true,
      };
      break;
    case actionTypes.FETCH_ORDERS_SUCCESS:
      changedState = {
        ...state,
        orders: action.orders,
        loading: false,
      };
      break;
    case actionTypes.FETCH_ORDERS_FAIL:
      changedState = {
        ...state,
        loading: false,
      };
      break;
    default:
      changedState = state;
      break;
  }

  return changedState;
};

export default reducer;
