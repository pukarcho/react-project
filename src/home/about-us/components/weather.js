import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

function Weather() {
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        fetch('http://api.openweathermap.org/data/2.5/weather?id=725993&appid=78ff6432fd3471b769c8db8dc475247e&units=metric')
        .then((response) => response.text())
        .then((data) => data ? JSON.parse(data) : {})
        .then((data) => {
            setWeatherData(data);
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }, []);
    
    return (
        <div style={{marginTop: "30px"}}>
            <p>Weather in Veliko Tarnovo:</p>
            {Object.keys(weatherData).length !== 0 ? (
                <p><strong>{weatherData.main.temp} &#8451;</strong> - { weatherData.weather[0].description}</p>
            ) : null}
        </div>
    );
}

export default Weather;