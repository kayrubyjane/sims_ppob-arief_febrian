import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authReducers';
import servicesReducer from './reducers/serviceReducers';
import topUpReducer from "./reducers/topUpReducers";
import transactionReducer from './reducers/transactionReducers'
import purchaseReducer from "./reducers/purchaseReducers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        services: servicesReducer,
        topup: topUpReducer,
        transaction: transactionReducer,
        purchase: purchaseReducer,
    },
});

export default store;
