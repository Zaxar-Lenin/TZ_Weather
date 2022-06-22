import {RootState} from "../store";

export const selectorCurrentCity = (state:RootState )=> state.reducerWeather.currentCity
export const selectorIsLoaded = (state:RootState )=> state.reducerWeather.isLoaded
export const selectorArrNames = (state:RootState )=> state.reducerWeather.arrNames
export const selectorCardCity = (state:RootState )=> state.reducerWeather.cardCity