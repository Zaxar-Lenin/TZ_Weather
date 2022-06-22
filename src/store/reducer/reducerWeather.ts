import {createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {weatherApi} from "../../api/objectApi";
import {ResponseCityType, ResponseCurrentCityType} from "../../types/types";

type initialStateType = {
    cardCity: ResponseCityType[]
    currentCity: ResponseCurrentCityType
    isLoaded: boolean
    arrNames: string[]
}


export const createWeatherForTheCity = createAsyncThunk(
    'weatherReducer/getWeatherForTheCity',
    async (city: string, {}) => {
        try {
            let response = await weatherApi.getCity(city)
            return response.data
        } catch (e: any) {

            console.log(e)
        }
    })


export const getCurrencyCity = createAsyncThunk(
    'weatherReducer/getCurrencyCity',
    async (param: { latitude: number | undefined, longitude: number | undefined }, {}) => {
        try {
            if (param.latitude && param.longitude) {
                let response = await weatherApi.getCurrentCity(param.latitude, param.longitude)
                console.log("TRUE")
                return response.data
            }
        } catch (e: any) {
            console.log(e)
        }
    })


export const updateCity = createAsyncThunk(
    'weatherReducer/updateCity',
    async (city: string, {}) => {
        try {
            let response = await weatherApi.getCity(city)
            return response.data
        } catch (e: any) {
            console.log(e)
        }
    })

export const reloadCard = createAsyncThunk(
    'weatherReducer/reloadCard',
    async (param: { city: string, id: number }, {}) => {
        try {
            let response = await weatherApi.getCity(param.city)
            return {data: response.data, id: param.id}
        } catch (e: any) {
            console.log(e)
        }
    })

export const reloadCurrencyCard = createAsyncThunk(
    'weatherReducer/reloadCurrencyCard',
    async (param: { latitude: number, longitude: number }, {}) => {
        try {
            let response = await weatherApi.getCurrentCity(param.latitude, param.longitude)
            return response.data
        } catch (e: any) {
            console.log(e)
        }
    })


export const actionNamesPush = createAction<string[]>("Weather/actionNamesPush")

export const actionRemoveCard = createAction<{ id: number, name: string }>("Weather/actionRemoveCard")


const initialState: initialStateType = {
    cardCity: [],
    isLoaded: false,
    currentCity: {} as ResponseCurrentCityType,
    arrNames: []
}

export const weatherSlice = createSlice({
    name: "Weather",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createWeatherForTheCity.fulfilled,
            (state, action) => {
                if (action.payload) {
                    state.cardCity.push(action.payload)
                    state.arrNames.push(action.payload.name)
                }

            })
        builder.addCase(getCurrencyCity.fulfilled,
            (state, action) => {
                if (action.payload) {
                    state.currentCity = action.payload
                    state.isLoaded = true
                }
            })
        builder.addCase(updateCity.fulfilled,
            (state, action) => {
                if (action.payload) {
                    state.cardCity.push(action.payload)
                }
            })
        builder.addCase(reloadCard.fulfilled,
            (state, action) => {
                if (action.payload) {
                    state.cardCity = state.cardCity.map(m => m.id === action.payload?.id
                        ? action.payload.data
                        : m)
                }
            })
        builder.addCase(actionNamesPush,
            (state, action) => {
                if (action.payload) {
                    state.arrNames = action.payload
                }
            })
        builder.addCase(actionRemoveCard,
            (state, action) => {
                state.cardCity = state.cardCity.filter(f => f.id !== action.payload.id)
                if (state.arrNames.length === 1) {
                    state.arrNames = []
                    localStorage.setItem("array", "[]")
                } else state.arrNames = state.arrNames.filter(f => f !== action.payload.name)

            })
        builder.addCase(reloadCurrencyCard.fulfilled,
            (state, action) => {
                if (action.payload) {
                    state.currentCity = action.payload
                }
            })

    }
})


export const reducerWeather = weatherSlice.reducer





