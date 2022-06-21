import s from "./CardTown.module.css"

type  TypeCardTownProps = {
    name: string
    temp: number
    humidity: number
    country: string
    weather: string
}

export const CardTown = ({temp,name,humidity,country,weather}: TypeCardTownProps) => {
    return (
        <div className = {s.card}>
            <h1>{name},{country}</h1>
            <div className ={s.card__box}>
                <div>Weather</div>
                <div>{weather}</div>
            </div>
            <div className ={s.card__box}>
                <div>Temperature</div>
                <div>{temp - 273} C</div>
            </div>
            <div className ={s.card__box}>
                <div>Humidity</div>
                <div>{humidity} ///</div>
            </div>
        </div>
    )
}