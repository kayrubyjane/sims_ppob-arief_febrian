import {
    LOAD_HISTORY,
    LOAD_HISTORY_SUCCESS,
    LOAD_HISTORY_FAILURE,
} from "../types/actionTypes";

const initialState = {
    history: [],
    loading: false,
    error: null,
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_HISTORY:
            return { ...state, loading: true, error: null };
        case LOAD_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                history: action.payload,
                error: null,
            };
        case LOAD_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default transactionReducer;
