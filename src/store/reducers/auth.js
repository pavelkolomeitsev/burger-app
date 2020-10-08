import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  let changedState = null;

  switch (action.type) {
    case actionTypes.AUTH_START:
      changedState = {
        ...state,
        error: null,
        loading: true,
      };
      break;
    case actionTypes.AUTH_SUCCESS:
      changedState = {
        ...state,
        token: action.idToken,
        userId: action.localId,
        error: null,
        loading: false,
      };
      break;
    case actionTypes.AUTH_FAIL:
      changedState = {
        ...state,
        error: action.error,
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
