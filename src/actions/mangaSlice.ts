import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mangaData: [],
  mangaCardData: [],
};

const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    setMangaData: (state, action) => {
      state.mangaData = action.payload;
    },
  },
});

export const { setMangaData } = mangaSlice.actions;
export default mangaSlice.reducer;
