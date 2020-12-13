const search = document.getElementById('search');
const searchCity = document.getElementById('cities');
const locationTimeDate = document.getElementById('locationTimeDate');
const timeDate = document.getElementById('timeDate');
const currentWeather = document.getElementById('currentWeather');
const mainElement = document.getElementById('main');

const key = '4be94bb229074b36c999e13b27e66bb7';
const cnt = 7;

// Functions
// 1. Function to fetch data from api when searched and display on DOM
async function getLocation(city) {
    const results = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    const data = await results.json()

    locationTimeDate.innerHTML = `
    <h2>${Math.floor(data.main.temp) - 273}°c</h2>
    <h3 class="location" id="searchLocaton">${data.name}, ${data.sys.country}</h3>
    <span class="timeDate" id="timeDate">${new Date((data.dt) * 1000 + (data.timezone)).toDateString()}  ${new Date( ((data.dt) * 1000 )+(data.timezone) * 5).toLocaleTimeString()}</span>
    `;
    console.log(data);

    currentWeather.innerHTML = `
        <span class="currTemp"><h2>Feels Like: ${Math.floor(data.main.feels_like) - 273}°c</h2>High: ${Math.floor(data.main.temp_max) - 273}°c / Low: ${Math.floor(data.main.temp_min) - 273}°c</span>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h3 class="weather">${data.weather[0].main}</h3>
    `
}

// 2. Function to fetch hourly data from api
async function getWeatherUpdates(city) {
    const results = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${cnt}&appid=${key}`)
    const data = await results.json()
    console.log(data);

    hourlyWeather(data)
}

// 3. Function to create div for hourly weather and display data on DOM
function hourlyWeather(data) {
    console.log(data);

    for(i = 0; i < data.list.length; i+= 1) {

    const weatherUpdates = document.createElement('div');   
    weatherUpdates.classList.add('weatherUpdates');

    weatherUpdates.innerHTML = `
    <h3> ${data.list[i].weather[0].main}</h3>
    <h1>${Math.floor(data.list[i].main.temp) - 273}°c</h1>
    <h2>Feels Like: ${Math.floor(data.list[i].main.feels_like - 273)}°c</h2>
    <p> High ${Math.floor(data.list[i].main.temp_max - 273)}°c / Low ${Math.floor(data.list[i].main.temp_min - 273)}°c</p>
    <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">
    <span>${new Date((data.list[i].dt) * 1000 + (data.city.timezone)).toDateString()} ${new Date( ((data.list[i].dt) * 1000 )+(data.city.timezone) * 5).toLocaleTimeString()} </span>

    `;
    mainElement.appendChild(weatherUpdates);

    console.log(weatherUpdates);
    }
    console.log(mainElement);
}   

// Event Listeners
// 1. Event listener to submit form and get city
search.addEventListener('submit', e => {
    e.preventDefault();

    const city = searchCity.value.trim();
    if(city) {
        getLocation(city) 
        getWeatherUpdates(city)
    }else{
        alert('Please enter a valid city name')
    }
    mainElement.innerHTML = ''
})

// 2. Event listener to get current location and display current weather onload
window.addEventListener("load", () => {
    let long;
    let lat;
  
     navigator.geolocation.getCurrentPosition((position) => {
     long = position.coords.longitude;
     lat = position.coords.latitude;
        const api = fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`)

        .then(res => res.json())
        .then( data => {
            console.log(data);

            locationTimeDate.innerHTML = `
                <h2>${Math.floor(data.main.temp) - 273}°c</h2>
                <h3 class="location" id="searchLocaton">${data.name}, ${data.sys.country}</h3>
                <span class="timeDate" id="timeDate">${new Date((data.dt) * 1000 + (data.timezone)).toDateString()}  ${new Date( ((data.dt) * 1000 )+(data.timezone) * 5).toLocaleTimeString()}</span>
                `;
            currentWeather.innerHTML = `
                <span class="currTemp"><h2>Feels Like: ${Math.floor(data.main.feels_like) - 273}°c</h2>High: ${Math.floor(data.main.temp_max) - 273}°c / Low: ${Math.floor(data.main.temp_min) - 273}°c</span>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <h3 class="weather">${data.weather[0].main}</h3>
                `
         });
        })
});


