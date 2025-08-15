import { createAPI } from './createAPI';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import scanIdReducer from './scanIdSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['auth', 'scanId']
};

const rootReducer = combineReducers({
    [createAPI.reducerPath]: createAPI.reducer,
    auth: authReducer,
    scanId: scanIdReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(createAPI.middleware),
});

export const persistor = persistStore(store);
