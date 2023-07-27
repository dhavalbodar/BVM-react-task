import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UserPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  value: number;
  userList: User[];
  loginUser: User | undefined;
}

const initialState: AuthState = {
  value: 0,
  userList: [
    {
      id: "1",
      name: "test1",
      email: "test1@gmail.com",
      password: "test@123",
    },
  ],
  loginUser: undefined,
};

const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    createUser: (state: AuthState, action: PayloadAction<User>) => {
      const payload = { ...action.payload };
      return {
        ...state,
        loginUser: { ...payload },
        userList: [...state.userList, { ...payload }],
      };
    },
    saveLoginUser: (state: AuthState, action: PayloadAction<User>) => {
      const payload = action.payload;
      return {
        ...state,
        loginUser: { ...payload },
      };
    },
  },
});

export const { createUser, saveLoginUser } = authSlice.actions;
export default authSlice.reducer;
