import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = null;
    },
  },
});

export const { saveUser, removeUser } = userReducer.actions;
export default userReducer.reducer;
