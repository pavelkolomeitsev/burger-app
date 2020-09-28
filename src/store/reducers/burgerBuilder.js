import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  let changedState = state;

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      changedState = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      break;
    case actionTypes.REMOVE_INGREDIENT:
      changedState = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
      break;
    case actionTypes.SET_INGREDIENTS:
      changedState = {
        ...state,
        ingredients: action.ingredients,
      };
      break;
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      changedState = {
        ...state,
      };
      break;
    default:
      changedState = state;
      break;
  }

  return changedState;
};

export default reducer;
