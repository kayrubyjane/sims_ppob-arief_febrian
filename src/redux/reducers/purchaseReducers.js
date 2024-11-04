import {
     PURCHASE_REQUEST,
     PURCHASE_SUCCESS,
     PURCHASE_FAILURE,
     RESET_PURCHASE_STATUS,
} from "../types/actionTypes";

const initialState = {
     loading: false,
     purchaseStatus: null,
     error: null,
};

const purchaseReducer = (state = initialState, action) => {
     switch (action.type) {
          case PURCHASE_REQUEST:
               return { ...state, loading: true, purchaseStatus: null, error: null };
          case PURCHASE_SUCCESS:
               return { ...state, loading: false, purchaseStatus: "success", error: null };
          case PURCHASE_FAILURE:
               return { ...state, loading: false, purchaseStatus: "failure", error: action.error };
          case RESET_PURCHASE_STATUS:
               return { ...state, purchaseStatus: null };
          default:
               return state;
     }
};

export default purchaseReducer;
