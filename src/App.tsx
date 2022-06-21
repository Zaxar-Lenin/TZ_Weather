import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {CardTown} from "./components/CardTown";
import {ModelWindowAdd} from "./assets/modelWindow/ModelWindowAdd";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import Preloader from "./common/preloader/Preloader";
import {getWeatherForTheCity} from "./store/reducer/reducerWeather";

function App() {
    const [activeAdd, setActiveAdd] = useState(false)

    const arrCards = useAppSelector(state => state.reducerWeather.cardTown)

    const isLoaded = useAppSelector(state => state.reducerWeather.isLoaded)

    const dispatch = useAppDispatch();

    const openModelWindow = () => {
        setActiveAdd(true)
    }


    if(!isLoaded){
        return <Preloader/>
    }

    return (
        <div className="App">
            {arrCards.map(m => <CardTown name={m.name} key ={m.id} temp={m.main.temp} weather={m.weather[0].main} country={m.sys.country} humidity={m.main.humidity}/>)}
            <div className="App__button-ball" onClick={openModelWindow}>
                <span></span>
            </div>
            <ModelWindowAdd setActive={setActiveAdd} active={activeAdd}/>
        </div>
    );
}

export default App;
