import React, {useEffect, useState} from "react";
import s from "./CardCurrencyCity.module.css";
import {reloadCurrencyCard} from "../../store/reducer/reducerWeather";
import {useAppDispatch} from "../../hooks/hooks";
import {usePosition} from "use-position";

type  TypeCardTownProps = {
    name: string
    temp: number
    humidity: number
    country: string
    weather: string
}

export const CardCurrencyCity = ({temp, name, humidity, country, weather}: TypeCardTownProps) => {

    const watch = true;
    const {
        latitude,
        longitude,
    } = usePosition(watch);

    const [seconds, setSeconds] = useState(60);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(setSeconds, 1000, seconds - 1);
        } else {
            setMinutes(minutes => minutes + 1)
            setSeconds(60)
        }
    }, [seconds, minutes]);


    const dispatch = useAppDispatch();

    const reloadHandler = () => {
        if (latitude && longitude) {
            dispatch(reloadCurrencyCard({latitude, longitude}))
            setSeconds(60)
            setMinutes(0)
        }
    }

    return (
        <div className={s.currencyCard}>
            <h1 className={s.title}>{name},{country}</h1>
            <div className={s.text}>Your current location</div>
            <div className={s.currencyCard__box}>
                <div>Weather</div>
                <div>{weather}</div>
            </div>
            <div className={s.currencyCard__box}>
                <div>Temperature</div>
                <div>{temp} &deg;C</div>
            </div>
            <div className={s.currencyCard__box}>
                <div>Humidity</div>
                <div>{humidity} %</div>
            </div>
            <div className={s.boxDown}>
                <div className={s.boxDown__time}>
                    {minutes === 0 ? "a few seconds ago" : `${minutes} minute ago`}
                </div>
                <div onClick={reloadHandler} className={s.boxDown__button}>reload</div>
            </div>
        </div>
    )
}