import {
     TOPUP_REQUEST,
     TOPUP_SUCCESS,
     TOPUP_FAILURE,
} from "../types/actionTypes";

const initialState = {
     loading: false,
     successMessage: null,
     errorMessage: null,
};

const topUpReducer = (state = initialState, action) => {
     switch (action.type) {
          case TOPUP_REQUEST:
               return {
                    ...state,
                    loading: true,
                    successMessage: null,
                    errorMessage: null,
               };
          case TOPUP_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    successMessage: action.payload,
                    errorMessage: null,
               };
          case TOPUP_FAILURE:
               return {
                    ...state,
                    loading: false,
                    successMessage: null,
                    errorMessage: action.error,
               };
          default:
               return state;
     }
};

export default topUpReducer;
