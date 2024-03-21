import { configureStore } from "@reduxjs/toolkit";
import  itemSlice  from "./features/item";
import currentTab from "./features/currentTab";

export const store = configureStore({
    reducer: {
        item : itemSlice,
        ct: currentTab 
    }
})