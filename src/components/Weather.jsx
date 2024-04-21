import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from "react-router-dom"
import clear_icon from "../assets/Images/clear.png"
import cloud_icon from "../assets/Images/cloud.png"
import drizzle_icon from "../assets/Images/drizzle.png"
import rain_icon from "../assets/Images/rain.png"
import snow_icon from "../assets/Images/snow.png"
import clear_bg_image from "../assets/Images/sunny.jpg" 
import cloudy_bg from "../assets/Images/cloudy.webp" 
import rainy_bg_image from "../assets/Images/rainn.jpeg" 


// This is the useState section to update the values into set function and i have used axios function to fetch the url...........
const Weather = () => {
    const {cityName} = useParams()
    const [wicon, setWicon] = useState(cloud_icon)
    const [bgImage, setBgImage] = useState(cloudy_bg)
    const [getweather, setGetweather] = useState(null)
   
      useEffect(()=>{
        const getweatherdata = async () => {
            try{
              const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=47cc295a4ac1dca70a35665748d53393`)      
                    setGetweather(res.data)
            }
            catch(err){
                console.log("fetching error", err)
            }       
        }
               
        getweatherdata();
    },[cityName])

//  This section is basically to update the weather background dynamically for the condition like {Sunny, Rain, Snow, Clouds etc}........
    useEffect(() => {
        if (getweather && getweather.weather) {
            const weatherIcon = getweather.weather[0].icon;

            if (weatherIcon === "01d" || weatherIcon === "01n") {
                setWicon(clear_icon);
                setBgImage(clear_bg_image);
                
            } 
            else if (weatherIcon === "02d" || weatherIcon === "02n") {
                setWicon(cloud_icon);
                setBgImage(cloudy_bg);
            } 
            else if (weatherIcon === "03d" || weatherIcon === "03n") {
                setWicon(drizzle_icon);
                setBgImage(cloudy_bg);
            } 
            else if (weatherIcon === "04d" || weatherIcon === "04n") {
                setWicon(drizzle_icon);
                setBgImage(cloudy_bg);
            } 
             else if (weatherIcon === "09d" || weatherIcon === "09n") {
                setWicon(rain_icon);
                setBgImage(rainy_bg_image);
            }
             else if (weatherIcon === "10d" || weatherIcon === "10n") {
                setWicon(rain_icon);
                setBgImage(rainy_bg_image);
            } 
            else if (weatherIcon === "13d" || weatherIcon === "13n") {
                setWicon(snow_icon);
                setBgImage(cloudy_bg);
            } 
            else {
                setWicon(clear_icon);
            }
        }
    }, [getweather]);
       
   

    // This console.log helps the user to see the data coming from API and ignore the error
    console.log("state", getweather)


         return (
             <div>
                 <>
             {
                
                getweather && (<div className="min-h-screen flex items-center text-white md:text-black justify-center bg-cover bg-center " style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="flex flex-col  opacity-120 rounded">
                         <div className="flex justify-around">
                            <div className="font-bold text-xl ">{cityName}
                                <div className="text-sm text-white md:text-black font-bold">Thursday 2024
                                </div>
                            </div>
                            <div className="font-bold text-xl">{getweather.timezone}</div>
                        </div>
                <div className="self-center inline-flex items-center justify-center ">
                        <div>
                            <img src = {wicon} />
                        </div>
                </div>
                        <div className="flex flex-row items-center justify-center mt-6">
                                <div className="font-medium text-6xl">{(getweather.main.temp - 273.0000).toFixed(1)} °C</div>
                                <div className="flex flex-col items-center ml-6">
                                <div>{getweather.weather[0].main}</div>
                                         <div className="mt-1">
                                             <span className="text-sm">
                                            <i className="far fa-long-arrow-up" />
                                             </span>
                                             <span className="text-sm font-semibold text-white md:text-black  ">{(getweather.main.temp_max - 273.0000).toFixed(1)} °C</span>
                                         </div>
                                    <div>
                                        <span className="text-sm">
                                        <i className="far fa-long-arrow-down" />
                                        </span>
                                        <span className="text-sm font-semibold text-white md:text-black  ">{(getweather.main.temp_min - 273.0000).toFixed(1)} °C</span>
                                    </div>
                                </div>
                            </div>
                                <div className="flex flex-row justify-between mt-6">
                                    <div className="flex flex-col items-center">
                                    <div className="font-bold text-sm">Wind</div>
                                    <div className="text-sm font-semibold">{getweather.wind.speed} km/hr</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                    <div className="font-bold text-sm">Humidity</div>
                                    <div className="text-sm font-semibold">{getweather.main.humidity} %</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                    <div className="font-bold text-sm">Pressure</div>
                                    <div className="text-sm font-semibold">{getweather.main.pressure} hpa</div>
                                    </div>
                                </div>
                 </div>
            </div>
       )
          }
       </>

     </div>
            )
                }

export default Weather