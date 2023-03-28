import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  id: "",
  tree: "",
  jackpot: 0,
};

export const getTree = createAsyncThunk("options/getTree", async () => {
  try {
    const { data } = await axios.get("options/getTree");
    console.log(data.options[0]);
    return data.options[0];
  } catch (error) {
    console.log(error);
  }
});
export const setTree = createAsyncThunk("options/setTree", async (params) => {
  try {
    const { data } = await axios.patch("options/setTree", params);
    console.log(data.options);
    return data.options;
  } catch (error) {
    console.log(error);
  }
});

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {},
  extraReducers: {
    //getTree
    [getTree.pending]: (state) => {
      state.status = null;
    },
    [getTree.fulfilled]: (state, action) => {
      state.tree = action.payload.tree;
      state.id = action.payload._id;
    },
    [getTree.rejected]: (state, action) => {},

    //setTree
    [setTree.pending]: (state) => {
      state.status = null;
    },
    [setTree.fulfilled]: (state, action) => {
      state.tree = action.payload.tree;
    },
    [setTree.rejected]: (state, action) => {},
    //getStructure
  },
});

export default optionsSlice.reducer;
