import {instance, KEY} from "./instance";
import {ResponseType} from "../types/types";

export const weatherApi = {
    cityWeatherQuery(city: string) {
        return instance.get<ResponseType>(`weather?q=${city}&APPID=${KEY}`)
    }
}
