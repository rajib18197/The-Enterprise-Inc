import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomes } from "../../services/apiHomes";

const initialState = {
  homes: [],
  isHomesLoading: false,
  isHomesError: false,
  homesError: "",

  currentFocusedHome: {},
};

export const fetchHomes = createAsyncThunk(
  "vacationHomes/fetchHomes",
  async function () {
    const data = await getHomes();
    return data;
  }
);

const homesSlice = createSlice({
  name: "vacationHomes",
  initialState,
  reducers: {
    focusedHome(state, action) {
      state.currentFocusedHome = action.payload;
    },

    removeFocused(state) {
      state.currentFocusedHome = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomes.pending, (state) => {
        state.isHomesLoading = true;
        state.isHomesError = false;
        state.homesError = "";
      })
      .addCase(fetchHomes.fulfilled, (state, action) => {
        state.isHomesLoading = false;
        state.homes = action.payload;
      })
      .addCase(fetchHomes.rejected, (state, action) => {
        state.isHomesLoading = false;
        state.homes = [];
        state.isHomesError = true;
        state.homesError = action.error?.message;
      });
  },
});

export default homesSlice.reducer;
export const { focusedHome, removeFocused } = homesSlice.actions;

export const getHomesState = (state) => state.homes;
