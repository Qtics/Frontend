import { createSlice } from "@reduxjs/toolkit";

const currentTab = createSlice({
    name: "tab",
    initialState: {
        tab: "home"
    },
    reducers : {
        setTab : (state,action) => {
            state.tab = action.payload
        }
    }
})

export const {setTab} = currentTab.actions;

export default currentTab.reducer