import axios from 'axios';

export const instance = axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5/",
})


export const KEY = "2056b8395c02496613c18b2594513a15"
