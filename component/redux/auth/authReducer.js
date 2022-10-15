import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nikName: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
