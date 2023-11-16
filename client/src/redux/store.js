import {configureStore} from "@reduxjs/toolkit";
import { subscriptionReducer, updateprofile, userReducer } from "./reducers/userReduce";
import { courseReducer } from "./reducers/courseReducer";
import { adminReducer } from "./reducers/adminReducer";

export const server="https://ilearn-rer6.onrender.com/api/v1";


const store= configureStore({
    reducer:{
        user:userReducer,
        profile:updateprofile,
        course:courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
    },
});



export default store;