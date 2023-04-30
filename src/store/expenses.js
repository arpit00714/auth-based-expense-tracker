import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { expenses : [] };

const expenseSlice = createSlice({
  name: 'expense',
  initialState: initialCounterState,
  reducers: {

   setExpenses(state,action) {
    state.expenses = action.payload
   }
    // increase(state, action) {
    //   state.counter = state.counter + action.payload;
    // },
    // toggleCounter(state) {
    //   state.showCounter = !state.showCounter;
    // },
  },
});

export const expensesActions = expenseSlice.actions;

export default expenseSlice.reducer;