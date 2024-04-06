import { createSlice } from '@reduxjs/toolkit'


// Define the initial state using that type
const initialState = {
  transactions: [],
  monthly: [],
  weekly: [],
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setMonthly: (state, action) => {
      state.monthly = action.payload;
    },
    setWeekly: (state, action) => {
      state.weekly = action.payload;
    }
  },
})

export const { setTransactions, setMonthly, setWeekly } = transactionsSlice.actions

export default transactionsSlice.reducer