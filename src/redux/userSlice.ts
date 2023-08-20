import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/user.interface';

interface UpdateStringPropertyAction {
    property: 'name' | 'username' | 'email' | 'bio';
    value: string;
}

interface UpdateArrayPropertyAction {
    property: 'followers' | 'following' | 'posts' | 'chats';
    value: string[];
}

const getUserFromLocalStorage = (): IUser | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const initialStateUser = (): IUser | null => {
    const userFromLocalStorage = getUserFromLocalStorage();
    return userFromLocalStorage ? userFromLocalStorage : null;
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUser(),
    reducers: {
        addUser(state, action: PayloadAction<IUser>) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        },
        removeUser(state) {
            localStorage.removeItem('user');
            return null;
        },
        updateStringProperty(state, action: PayloadAction<UpdateStringPropertyAction>) {
            if (state) {
                const newState = {
                    ...state,
                    [action.payload.property]: action.payload.value,
                };
                localStorage.setItem('user', JSON.stringify(newState));
                return newState;
            }
        },
        updateArrayProperty(state, action: PayloadAction<UpdateArrayPropertyAction>) {
            if (state) {
                const newState = {
                    ...state,
                    [action.payload.property]: action.payload.value,
                };
                localStorage.setItem('user', JSON.stringify(newState));
                return newState;
            }
        }
    }
});

export const {
    addUser,
    removeUser,
    updateStringProperty,
    updateArrayProperty,
} = userSlice.actions;
export default userSlice.reducer;