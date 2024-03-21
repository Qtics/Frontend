import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    subsystem: "",
    assembly: "",
    component: "",
    description: "",
    unitPrice: "",
    quantity: "",
    minimumQuantity: "",
    additionalCost: "",
    discount: "",
    allItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.allItems.push(action.payload);
      state.subsystem = "";
      state.assembly = "";
      state.component = "";
      state.description = "";
      state.unitPrice = "";
      state.quantity = "";
      state.minimumQuantity = "";
      state.additionalCost = "";
      state.discount = "";
    },
    setSubsystem: (state, action) => {
      state.subsystem = action.payload;
    },
    setAssembly: (state, action) => {
      state.assembly = action.payload;
    },
    setComponent: (state, action) => {
      state.component = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setUnitPrice: (state, action) => {
      state.unitPrice = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setMinimumQuantity: (state, action) => {
      state.minimumQuantity = action.payload;
    },
    setAdditionalCost: (state, action) => {
      state.additionalCost = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setAllItems: (state, action) => {
      state.allItems = action.payload;
    },
  },
});

export const {
  setAdditionalCost,
  setAllItems,
  setAssembly,
  setComponent,
  setDescription,
  setDiscount,
  setMinimumQuantity,
  setQuantity,
  setSubsystem,
  setUnitPrice,
  addItem
} = itemSlice.actions;

export default itemSlice.reducer;
