import React, { useState } from 'react'
import './App.css'
import axios from 'axios'


const App = () => {

const [city , setCity] = useState("")
const [weather, setWeather] = useState(null)
const [errormessage, setErrorMessage] = useState('')

// const fetchWeather = ()=>{

//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dbd07579425315f4c22d13a0cc14a4c7&units=metric`
//   )
//   .then((res)=> res.json())
//   .then((data)=> setWeather(data))
//   .catch((error)=> console.log(error.message))

// }

// const error = ()=>{
//   setErrorMessage("City no Found. Please Enter a valid city name.")
// }


const HandleSumbit =  async  (e)=>{
  e.preventDefault()
 try{
  const response =  await  axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dbd07579425315f4c22d13a0cc14a4c7&units=metric`)
  setWeather(response.data)
  setErrorMessage()
 }catch(error){
  setErrorMessage("City not found. Please Enter Vaild city name")
 }
}

  return (
    <div className='app flex justify-center flex-col items-center'>
    <h1 className='text py-4 text-5xl font-serif'> SEARCH CITY FOR WEATHER</h1>
    <div className='form'>
      <form onSubmit={HandleSumbit}>
        <input
        type='text'
        placeholder='Enter your City'
        className='px-4 py-3 w-[320px]'
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        />
        <button className='  px-4 py-4 bg-green-500 text-white font-medium w-[130px] ' type='submit'>Search</button>
      </form>
    </div>
    {errormessage && <p>{errormessage}</p>}
   {
    weather &&
    <div className=' h-[390px] w-[450px] bg-green-700 m-4 flex flex-col justify-center items-center'>
    <h3 className='font-mono text-white text-6xl'>{weather.name}</h3>
    <img
          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt=""
          className="w-[150px]"
        />
        <h3 className='text-5xl text-white '>{weather.main.temp}</h3>
        <p className='text-white p-3'>{weather.weather[0].main}</p>
  </div>
   }
    </div>
  )
}

export default App
