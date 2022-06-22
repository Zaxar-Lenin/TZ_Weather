import s from "./CardCity.module.css"
import React, {useEffect, useState} from "react";
import {actionRemoveCard, reloadCard} from "../../../store/reducer/reducerWeather";
import {useAppDispatch} from "../../../hooks/hooks";
import moment, {now} from "moment";

type  TypeCardTownProps = {
    name: string
    temp: number
    humidity: number
    country: string
    weather: string
    id: number
}

export const CardCity = ({temp, id, name, humidity, country, weather}: TypeCardTownProps) => {

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

    const removeHandler = () => {
        dispatch(actionRemoveCard({id, name}))
    }

    const reloadHandler = () => {
        dispatch(reloadCard({city: name, id}))
        setSeconds(60)
        setMinutes(0)
    }

    return (
        <div className={s.card}>
            <h1>{name},{country}</h1>
            <div className={s.card__box}>
                <div>Weather</div>
                <div>{weather}</div>
            </div>
            <div className={s.card__box}>
                <div>Temperature</div>
                <div>{temp} &deg;C</div>
            </div>
            <div className={s.card__box}>
                <div>Humidity</div>
                <div>{humidity} %</div>
            </div>
            <div className={s.boxDown}>
                <div className={s.boxDown__time}>
                    {minutes === 0 ? "a few seconds ago" : `${minutes} minute ago`}
                </div>
            </div>
            <div className={s.boxDownTwo}>
                <div onClick={removeHandler} className={s.boxDownTwo__button}>remove</div>
                <div onClick={reloadHandler} className={s.boxDownTwo__button}>reload</div>
            </div>
        </div>
    )
}