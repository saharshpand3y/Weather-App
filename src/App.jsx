import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'
import Weather from './components/Weather'
const headerData = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
}

const App = () => {
  const API_URI = import.meta.env.VITE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [weatherData, setWeatherData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm)
  }, 1000, [searchTerm])
  const fetchWeatherInfo = async (city = '') => {
    setIsLoading(true)
    setErrorMessage(null)
    const baseURL = `${API_URI}/weather?q=${city}&appid=${API_KEY}`;
    try {
      const response = await fetch(encodeURI(baseURL), headerData);
      if (!response.ok){
        setErrorMessage("Failed to fetch Weather Data");
        throw new Error('Failed to fetch Weather Data')
      }
      const data = await response.json()
      if(!data) {
        setWeatherData([]);
        throw new Error("Failed to fetch Weather Data");
      }
      setWeatherData(data || [])
    } catch (error) {
      setErrorMessage("Failed to fetch Weather Data");
      throw new Error(error);
      
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchWeatherInfo(debouncedSearchTerm);
    } else {
      setWeatherData({})
      setErrorMessage(null)
    }
  }, [debouncedSearchTerm])
  return (
    <div className="app">
      <div className="weather">
        <Search searchState={{searchTerm, setSearchTerm}} />
        {
          isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <Weather data={weatherData} searchTerm={searchTerm} />
          )
        }
      </div>
    </div>
  );
}

export default App