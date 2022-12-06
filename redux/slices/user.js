import { createSlice } from '@reduxjs/toolkit'

const initialState = {
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser: (_, { payload }) => payload
  }
});

export const { changeUser } = userSlice.actions;

export default userSlice.reducer;
