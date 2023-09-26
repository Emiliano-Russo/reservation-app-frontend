import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/user/user.interface';

interface UpdateStringPropertyAction {
  property:
    | 'name'
    | 'email'
    | 'token'
    | 'phone'
    | 'civilIdDoc'
    | 'profileImage'
    | 'country'
    | 'department';
  value: string;
}

interface IUserState {
  user: IUser | null;
  token: string | null;
}

const getUserFromLocalStorage = (): IUser | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem('token');
  return token || null;
};

const initialStateUser = (): IUserState => {
  return {
    user: getUserFromLocalStorage(),
    token: getTokenFromLocalStorage(),
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser(),
  reducers: {
    addUserAndToken(
      state,
      action: PayloadAction<{ user: IUser; token: string }>,
    ) {
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    removeUserAndToken(state) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
      };
    },
    updateStringProperty(
      state,
      action: PayloadAction<UpdateStringPropertyAction>,
    ) {
      if (action.payload.property === 'token') {
        localStorage.setItem('token', action.payload.value);
        return {
          ...state,
          token: action.payload.value,
        };
      } else if (state.user) {
        const newUser = {
          ...state.user,
          [action.payload.property]: action.payload.value,
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        return {
          ...state,
          user: newUser,
        };
      }
    },
  },
});

export const { addUserAndToken, removeUserAndToken, updateStringProperty } =
  userSlice.actions;
export default userSlice.reducer;
