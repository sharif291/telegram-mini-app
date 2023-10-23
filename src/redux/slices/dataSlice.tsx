import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IBetData {
  pair: {
    id: number;
    name: string;
  };
  amount: number;
  direction: string;
}

// Define the initial state using that type
const initialState: IBetData = {
  pair: { id: 0, name: "" },
  amount: 0,
  direction: "",
};

const dataSlice = createSlice({
  name: "betData",
  initialState: initialState,
  reducers: {
    setPair: (state, action) => {
      return { ...state, pair: action.payload };
    },
    setAmount: (state, action) => {
      return { ...state, amount: parseFloat(action.payload) };
    },
    setDirection: (state, action) => {
      return { ...state, direction: action.payload };
    },
    resetData: () => {
      return { ...initialState };
    },
  },
});

export const state = (state: RootState) => state.data;
export const { setPair, setAmount, setDirection, resetData } =
  dataSlice.actions;
export default dataSlice.reducer;
