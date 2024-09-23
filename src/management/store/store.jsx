import { configureStore } from "@reduxjs/toolkit";
import { uReducer } from "../reducers/user";

const store = configureStore({
    reducer:{ 
        "user" : uReducer
    }
})

export default store;