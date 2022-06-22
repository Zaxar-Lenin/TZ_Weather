import React, {useEffect} from "react";
import {CardCity} from "./cardCity/CardCity";
import {useAppSelector} from "../../hooks/hooks";
import {selectorCardCity} from "../../store/selectors/selectors";


export const Cards = () => {
    const arrCards = useAppSelector(selectorCardCity)


    return (
        <div className='cards'>
            {arrCards.map(m => {
                return <CardCity id={m.id} name={m.name} key={m.id} temp={m.main.temp} weather={m.weather[0].main}
                                 country={m.sys.country} humidity={m.main.humidity}/>
            })}
        </div>
    )
}