import { createSlice } from "@reduxjs/toolkit";
import { PlantListData } from "../../models/plants";

export const PlantList = {
  currentPlantList: PlantListData,
  isFetching: Boolean,
  error: Boolean,
};

const initialState = {
  currentPlantList: {
    plants: [],
    totalCount: 0,
    pageCount: 0,
  },
  isFetching: false,
  error: false,
};

const plantListSlice = createSlice({
    name: 'plantList',
    initialState,
    reducers:{
        plantListStart: (state) => {
            state.isFetching = true;
        },
        plantListSuccess: (state, action) => {
            state.isFetching = false;
            state.currentPlantList = action.payload;
            state.error = false;
        },
        plantListFailure: (state) => {
            state.isFetching = false;
            state.error = true;
          },
    }
})

export const {plantListStart, plantListSuccess, plantListFailure} = plantListSlice.actions;
export default plantListSlice.reducer;