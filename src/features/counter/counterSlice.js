import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
  cityName: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (
        state.ids.find((item) => item.id === action.payload.id) === undefined
      ) {
        state.ids.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      let index = state.ids.indexOf(
        state.ids.find((item) => item.id === action.payload)
      );
      if (index !== -1) {
        state.ids.splice(index, 1);
      }
    },
    updateCityName: (state, action) => {
      state.cityName = action.payload;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  updateCityName,
} = counterSlice.actions;

export default counterSlice.reducer;
