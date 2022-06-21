import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {weatherApi} from "../../api/objectApi";
import {ResponseType} from "../../types/types";

type initialStateType = {
    cardTown: ResponseType[]
    isLoaded: boolean
}


export const getWeatherForTheCity = createAsyncThunk(
    'weatherReducer/getWeatherForTheCity',
    async (city: string, {dispatch, getState, rejectWithValue}) => {
        try {
            let response = await weatherApi.cityWeatherQuery(city)
            return response.data
        } catch (e: any) {

            console.log(e)
        }
    })


const initialState: initialStateType = {
    cardTown: [],
    isLoaded: true,
}

export const weatherSlice = createSlice({
    name: "Weather",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWeatherForTheCity.fulfilled,
            (state, action) => {
                    action.payload && state.cardTown.push(action.payload)
            })
    }
})


export const reducerWeather = weatherSlice.reducer





