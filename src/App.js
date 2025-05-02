import { useState } from "react";
import "./App.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

function App() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const onClick = async () => {
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      console.log(result.data);
      setWeather(result.data);
    } catch (err) {
      console.log(err.message, ":City Not Found");
      // alert("City Not Found!");
      setWeather("");
    }
  };
  return (
    <div className="bg-cyan-50 h-screen flex flex-col items-center gap-4">
      <div className="mt-20">
        <h1 className="text-3xl font-bold underline">Weather App</h1>
      </div>
      <div className="bg-blue-700 border border-black rounded-lg w-80 p-6 mx-auto">
        <div className="text-center">
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a City name..."
            className="border border-black rounded-full p-1 bg-cyan-50"
          />
          <button
            onClick={onClick}
            className="border border-black p-2 rounded-full bg-cyan-50"
          >
            <FaSearch />
          </button>
          <br />
          <br />
          <img
            className="h-20 w-20 rounded-full relative left-24"
            alt=""
            src="https://media.istockphoto.com/id/1826107287/vector/cartoon-flat-summer-sun-sunglasses.jpg?s=612x612&w=0&k=20&c=ZxO502b__I6oZzityuNqjCXQv984Q9Ho3ijTX9IgeYE="
          />
        </div>
        <br />
        {weather && (
          <div className="text-white text-center">
            <h1 className="text-4xl font-semibold">
              {weather.main.temp} {`\u00B0`}C
            </h1>
            <h1 className="text-2xl ">{weather.name}</h1>
            <br />
            <br />
            <div className="flex gap-4">
              <h1>Humidity: {weather.main.humidity}%</h1>
              <h1>Speed: {weather.wind.speed} Km/h</h1>
            </div>
            <br />
            <h1 className="text-xl capitalize">
              {weather.weather[0].description}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
