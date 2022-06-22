import {instance, KEY} from "./instance";
import {ResponseCityType, ResponseCurrentCityType} from "../types/types";

export const weatherApi = {
    getCity(city: string) {
        return instance.get<ResponseCityType>(`weather?q=${city}&APPID=${KEY}&units=metric`)
    },
    getCurrentCity(latitude: number | undefined, longitude: number | undefined,) {
        return instance.get<ResponseCurrentCityType>(`forecast?lat=${latitude}&lon=${longitude}&APPID=${KEY}&units=metric`)
    }
}
