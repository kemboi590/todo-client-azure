
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { usersAPI } from "../features/auth/usersAPI";
import { loginAPI } from "../features/auth/loginAPI";
import userSlice from '../features/auth/userSlice'
import { todosAPI } from "../features/todo/todoAPI";


const persistConfig = {
    key: 'todostore',
    version: 1,
    storage,
    whitelist: ['user']// Only persist the user slice - this means only the user state will be saved in local storage
}

const rootReducer = combineReducers({ //combining all reducers into one root reducer
    [usersAPI.reducerPath]: usersAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [todosAPI.reducerPath]: todosAPI.reducer,
    user: userSlice
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
        .concat(usersAPI.middleware)
        .concat(loginAPI.middleware)
        .concat(todosAPI.middleware)
    // 
})

export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>

