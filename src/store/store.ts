import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducerWeather} from "./reducer/reducerWeather";

export const rootReducer = combineReducers(
    {
        reducerWeather
    }
)

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend()
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>