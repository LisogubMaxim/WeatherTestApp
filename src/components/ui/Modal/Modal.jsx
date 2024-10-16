import React, { useEffect, useState } from "react";
import axios from "axios";

import weatherCode from "../../../data/weatherCode.json";

import styles from "../Modal/modal.module.scss";
import Map from "../../Map/Map";

const Modal = ({ isOpen, onClose, location, picture }) => {
  const [weather, setWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [icon, setIcon] = useState(null);
  const [descriptionIcon, setDescriptionIcon] = useState(null);

  const isDayOrNight = (time) => {
    const date = new Date(time);
    const hours = date.getHours();

    if (hours >= 6 && hours < 18) {
      return "day";
    } else {
      return "night";
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.coordinates.latitude}&longitude=${location.coordinates.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode&timezone=auto`
        );
        setWeather(response.data.current_weather);
        setDailyWeather(response.data.daily);
        setHourlyWeather(response.data.hourly);
        console.log(response.data.hourly);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (isOpen) {
      fetchWeather();

      const intervalId = setInterval(fetchWeather, 300000);

      return () => clearInterval(intervalId);
    }
  }, [isOpen, location.coordinates.latitude, location.coordinates.longitude]);

  useEffect(() => {
    if (weather) {
      const getWeatherIcon = (code) => {
        const dayOrNight = isDayOrNight(weather.time);
        setIcon(weatherCode[code][dayOrNight]?.image);
        setDescriptionIcon(weatherCode[code][dayOrNight]?.description);
      };

      getWeatherIcon(weather.weathercode);
    }
  }, [weather]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.overview} onClick={onClose}></div>
      <div className={styles.block}>
        <div className={styles.close} onClick={onClose}>
          <img src={`${process.env.PUBLIC_URL}/images/cross.svg`} alt="" />
        </div>
        <h2>Weather</h2>
        {weather && dailyWeather ? (
          <div>
            <div className={styles.weatherIcon}>
              <img src={icon} alt={descriptionIcon} />
            </div>
            <p>Current Temperature: {weather.temperature}°C</p>

            <p>Min Temperature: {dailyWeather.temperature_2m_min[0]}°C</p>
            <p>Max Temperature: {dailyWeather.temperature_2m_max[0]}°C</p>

            <h3>Hourly Weather</h3>
            <div className={styles.hourlyWeather}>
              {hourlyWeather.time.slice(0, 24).map((time, index) => (
                <div key={index} className={styles.hour}>
                  <p>{new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  <p>Temperature: {hourlyWeather.temperature_2m[index]}°C</p>
                  <img
                    src={weatherCode[hourlyWeather.weathercode[index]][isDayOrNight(time)]?.image}
                    alt={weatherCode[hourlyWeather.weathercode[index]][isDayOrNight(time)]?.description}
                  />
                </div>
              ))}
            </div>

            <div>
              <Map location={location} picture={picture} />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
