// hiding city data and err from user till they search for a city
const weather = document.querySelector(".weather")
weather.style.display = 'none'
const err = document.querySelector("#err")
err.style.display = 'none'

// api info
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric"
const apiKey = "651e1f85e1bb5128051bbe69e0a23400"

// function to handleErrors
const handleErr = (res) => {
    if(res === 404){
        err.innerText = `Please enter correct city name!`
        err.style.display = 'block'
        weather.style.display = 'none'
        setTimeout(()=>{
            err.style.display='none'
        },2000)
    }
    else{
        err.innerText = `There was some Error, Please try again later!`
        err.style.display = 'block'
        weather.style.display = 'none'
        setTimeout(()=>{
            err.style.display='none'
        },2000)
    }
}

// getting elements from dom to be updated dynamically
const cityOutput = document.querySelector(".city")
const tempOutput = document.querySelector(".temp")
const humidityOutput = document.querySelector(".humidity")
const windOutput = document.querySelector(".wind")
const weatherIcon = document.querySelector(".weather-icon")

// function to display weather data in weather card
const displayWeather = (data) =>{
    cityOutput.innerHTML = data.name
    tempOutput.innerHTML = `${Math.round(data.main.temp)}°c`
    humidityOutput.innerHTML = `${data.main.humidity}%`
    windOutput.innerHTML = `${data.wind.speed}km/h`
    const imgType = (data.weather[0].main).toLowerCase()
    weatherIcon.src = `images/${imgType}.png`
    weather.style.display = 'block'
    err.style.display = 'none'
}

// updating weather card dynamically
const checkWeather = async (city) => {
    const response = await fetch(apiUrl +`&appid=${apiKey}`+`&q=${city}`)
    let data = await response.json()
    // error handling
    if(response.status === 200){
        displayWeather(data)
    }
    else{
        handleErr(response.status)
    }
    // console.log(data)
}

// getting the city searched from the input in the card
const cityInput = document.querySelector("#cityInput")
const searchBtn = document.querySelector("#searchBtn")
const getCity = (e) => {
    if(cityInput.value === ""){
        alert("You must write a city name")
    }
    else{
        city = cityInput.value
        // console.log(city)
        checkWeather(city)
    }
}

// event listeners on click or enterKeyPressed event
searchBtn.addEventListener('click', getCity)
cityInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        getCity()
    }
})

