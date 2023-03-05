import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLoadng: false,
  status: null,
  formCall: "login",
  registerEvent: false,
};

export const passwordUpdate = createAsyncThunk("auth/passwordUpdate", async (params) => {
  try {
    const { data } = await axios.patch("user/passwordUpdate", params);
    console.log(data);
    return data.updatedUser;
  } catch (error) {
    console.log(error);
  }
});
export const updateData = createAsyncThunk("auth/updateData", async (params) => {
  try {
    const { data } = await axios.patch("user/nameUpdate", params);
    console.log(data);
    return data.updatedUser;
  } catch (error) {
    console.log(error);
  }
});

export const updateContacts = createAsyncThunk("auth/updateContacts", async (params) => {
  try {
    const { data } = await axios.patch("user/contactUpdate", params);
    console.log(data);
    return data.updatedUser;
  } catch (error) {
    console.log(error);
  }
});

export const updateAvatar = createAsyncThunk("auth/updateAvatar", async (updatedAvatar) => {
  try {
    const { data } = await axios.patch("user/avatarUpdate", updatedAvatar);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ upliner, login, email, phone, password }) => {
    try {
      const { data } = await axios.post("auth/register", {
        upliner,
        login,
        email,
        phone,
        password,
      });
      console.log(data);
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
  try {
    const { data } = await axios.post("auth/login", {
      email,
      password,
    });
    console.log(data);
    if (data.token) {
      window.localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const { data } = await axios.get("auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoadng = false;
      state.status = "You logout from system";
      window.localStorage.removeItem("token");
    },
    changeFormState: (state, action) => {
      state.formCall = action.payload;
    },
    cleanStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: {
    //updateAvatar
    [updateAvatar.pending]: (state) => {
      state.isLoadng = true;
      state.status = null;
    },
    [updateAvatar.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.user = action.payload;
      //state.token = action.payload.token;
    },
    [updateAvatar.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoadng = false;
    },
    //updateContacts
    [updateContacts.pending]: (state) => {
      state.isLoadng = true;
      state.status = null;
    },
    [updateContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.user = action.payload;
      //state.token = action.payload.token;
    },
    [updateContacts.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoadng = false;
    },
    //updateData
    [updateData.pending]: (state) => {
      state.isLoadng = true;
      state.status = null;
    },
    [updateData.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.user = action.payload;
      //state.token = action.payload.token;
    },
    [updateData.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoadng = false;
    },
    //registerUser
    [registerUser.pending]: (state) => {
      state.isLoadng = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      //state.token = action.payload.token;
      state.registerEvent = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoadng = false;
    },
    //loginUser
    [loginUser.pending]: (state) => {
      state.isLoadng = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoadng = false;
    },
    //check Auth
    [getMe.pending]: (state) => {
      state.isLoadng = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoadng = false;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logOut, changeFormState, cleanStatus } = authSlice.actions;
export default authSlice.reducer;
