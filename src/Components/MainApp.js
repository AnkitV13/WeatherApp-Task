import React, { useState, useEffect } from 'react'
import "./CSS/style.css"

const MainApp = () => {

    const [city,setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");
    const [wind,setWind] = useState(0.0);
    const [des, setDes] = useState("clear");
    const [pop, setPop] = useState();
    

    useEffect( ()=>{
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=b3257e61c452dcc761c19d2378555860`
            const res = await fetch(url);
            const response = await res.json();
            // console.log(response);
            setCity(response.main);
            setWind(response.wind);
            setDes(response.weather?.[0]?.main)
           
        };

        fetchApi();

        const str = {search}
        const newStr = str.search
        const newSearch = newStr.charAt(0).toUpperCase() + newStr.slice(1);
        // console.log(newSearch)
        

        const populationApi = async () => {
            const url = `https://restcountries.com/v3.1/all?fields=capital,population`
            const result = await fetch(url);
            const answer = await result.json();
            for(let i=0;i<answer.length;i++){
                if(answer[i].capital[0] === newSearch)
                    setPop(answer[i].population)
            }
            // console.log(answer);
        };

        populationApi();
    },[search])


  return (
    <div>
        <div className='heading'>
            <h1>Weather Application</h1>
            <p>(Just Type the city Name and get the results)</p>
        </div>
        <div className = "container">
                <div className = "input-cont">
                    <input type = "text" className = "cont" id = "search-box" placeholder = "Enter your City..." onChange={(event) => {setSearch(event.target.value)}}/>
                </div>
            {!city ? (<p className="noData">No Data Found...</p>) : (
            <div>
                <div className = "place">
                    <div className = "city">{search}</div>
                </div>
                <div className = "current">
                    <div className = "temp">{city.temp}<span>°c</span></div>
                    <div className = "min-max">Weather: {des}</div>
                    <div className = "min-max">Humidity: {city.humidity}</div>
                    <div className = "min-max">Wind-Speed: {wind.speed}</div>
                    {pop  && (<div className = "min-max">Population: {pop}</div>)}
                </div>
            </div>
        )}
        </div>
    </div>
  )
}

export default MainApp;