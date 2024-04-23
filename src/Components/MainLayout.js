import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Search } from "react-bootstrap-icons";
import Loader from "./Loader/Loader";

const MainLayout = () => {

    const api = 'e137d0954aa2487f99e20701242304'
    const searchInputRef = useRef(null)

    const [ipAddress, setIPAddress] = useState()
    const [weatherData, setWeatherData] = useState()
    const [searchInput, setSearchInput] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const getWeather = async (location) => {
        setLoading(true)
        const response = await axios(`https://api.weatherapi.com/v1/current.json?key=${api}&q=${location}&aqi=no`)
        if (response.data)
            setLoading(false)
        return response.data
    }


    useEffect(() => {
        axios('https://api.ipify.org?format=json').then(data => setIPAddress(data.data.ip))
    }, [])

    useEffect(() => {
        if (ipAddress !== null && ipAddress !== undefined && ipAddress !== '') {
            getWeather(ipAddress).then(res => {setWeatherData(res); setError(false)}).catch(err => {setError(true);setLoading(false)})
        }
    }, [ipAddress])

    useEffect(() => {
        if (loading) {
            setWeatherData(null)
            setError(false)
        }
        if (!loading) {
            searchInputRef.current.focus();
        }
    }, [loading])




    const searchWeatherHandler = () => {
        setSearchInput('')
        getWeather(searchInput).then(response => {setWeatherData(response); setError(false)}).catch(err => {setError(true);setLoading(false)})
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            searchWeatherHandler()
    }

    return (

        <div className="bg-black/30 flex flex-col justify-center items-center text-white w-3/4 h-max min-h-[300px] py-8 px-12 rounded-xl">
            {!loading ? (
                <Fragment>
                    <div className="w-full h-max relative flex items-center bg-white rounded-2xl mb-8">
                        <input ref={searchInputRef} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyUp={handleKeyPress} className="grow h-[35px] text-black text-base ps-2 bg-transparent outline-none" placeholder="Enter a city name, IP, ..." />
                        <button onClick={searchWeatherHandler} className="w-[35px] h-[35px] text-lg bottom-[1px] right-[10px] text-black"><Search /></button>
                    </div>
                    {error ? (
                        <div className="text-center text-xl">There is a problem finding the City or the City is wrong!</div>
                    ) : (
                        <Fragment>
                            <h1 className="w-full text-xl text-center">{weatherData.location.name}, {weatherData.location.country}</h1>
                            <div className="flex flex-wrap w-full mt-8">
                                <div className="w-full lg:w-1/3 my-6 lg:my-0 flex flex-col justify-center items-center lg:text-start">
                                    <div>
                                        <img width={100} src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                                    </div>
                                    <div className="text-lg text-center">{weatherData.current.condition.text}</div>
                                </div>
                                <div className="w-full lg:w-1/3 my-6 lg:my-0 flex justify-center items-center text-4xl">{weatherData.current.temp_c} °C</div>
                                <div className="w-full lg:w-1/3 my-6 lg:my-0 flex justify-center text-base">
                                    <div className="text-start">
                                        <p>Wind: {weatherData.current.wind_kph} kmph</p>
                                        <p>Wind Direction: {weatherData.current.wind_dir}</p>
                                        <p>Precip: {weatherData.current.precip_mm} mm</p>
                                        <p>Pressure: {weatherData.current.pressure_mb} mb</p>
                                        <p>Gust: {weatherData.current.gust_kph} kmph</p>
                                        <p>Humidity: {weatherData.current.humidity} %</p>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}

                </Fragment>
            ) : <Loader />}
        </div>

    )

}

export default MainLayout