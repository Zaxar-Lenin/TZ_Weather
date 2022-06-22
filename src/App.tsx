import React, {useEffect, useState} from 'react';
import './App.css';
import {ModelWindowAdd} from "./assets/modelWindow/ModelWindowAdd";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import Preloader from "./common/preloader/Preloader";
import {actionNamesPush, getCurrencyCity, updateCity} from "./store/reducer/reducerWeather";
import {Cards} from "./components/cards/Cards";
import {CardCurrencyCity} from "./components/cardCurrencyCity/CardCurrencyCity";
import {selectorArrNames, selectorCurrentCity, selectorIsLoaded} from "./store/selectors/selectors";
import {usePosition} from "use-position";

function App() {
    const dispatch = useAppDispatch();

    const watch = true;
    const {
        latitude,
        longitude,
    } = usePosition(watch);

    let arrNames = useAppSelector(selectorArrNames)

    let currencyCity = useAppSelector(selectorCurrentCity)

    let isLoaded = useAppSelector(selectorIsLoaded)


    useEffect(() => {
        let array = localStorage.getItem("array")
        if (array) {
            let arr = JSON.parse(array)
            if (arr.length > 0) {
                arr.forEach((f: string) => {
                    dispatch(updateCity(f))
                })
            }
        }

    }, [])


    useEffect(() => {
        dispatch(getCurrencyCity({latitude, longitude}))
    }, [latitude, longitude])


    useEffect(() => {
        let array = localStorage.getItem("array")
        if (array) {
            let arr = JSON.parse(array)
            if (arrNames.length > 0) {
                let arr1 = JSON.stringify(arrNames)
                localStorage.setItem("array", arr1)
            }
            if (arr.length > 0 && arrNames.length === 0) {
                dispatch(actionNamesPush(arr))
            }
        }
        let arr = JSON.stringify(arrNames)
        localStorage.setItem("array", arr)
    }, [arrNames])


    const [activeAdd, setActiveAdd] = useState(false)

    const openModelWindow = () => {
        setActiveAdd(true)
    }


    if (!isLoaded) {
        return <Preloader/>
    }

    return (
        <div className="App">
            <h1 className="title">World Weather</h1>
            <div className="text">Watch weather in your current location</div>
            <CardCurrencyCity name={currencyCity.city.name} humidity={currencyCity.list[0].main.humidity}
                              temp={currencyCity.list[0].main.temp} country={currencyCity.city.country}
                              weather={currencyCity.list[0].weather[0].main}/>
            <Cards/>
            <div className="App__button-ball" onClick={openModelWindow}>
                <span></span>
            </div>
            <ModelWindowAdd setActive={setActiveAdd} active={activeAdd}/>
        </div>
    );
}

export default App;
