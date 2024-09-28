const apiKey = 'YOUR API KEY'; 
var mess=document.getElementById("mess");
mess.title="mess";

var cityElement = document.getElementById("city");
var dateElement = document.getElementById("date");
var imageElement = document.getElementById("image");
var temperatureElement = document.getElementById("temperature");
var descriptionElement = document.getElementById("description");
var humidityElement = document.getElementById("humidity");
var windSpeedElement = document.getElementById("wind_speed");
var feelLikeElement = document.getElementById("feel_like");
var sunriseElement = document.getElementById("sunrise");
var sunsetElement = document.getElementById("sunset");
var longitudeElement = document.getElementById("Longitude");
var latitudeElement = document.getElementById("Latitude");
const forecastContainer = document.getElementById('forecast-container');
const options = { weekday: 'short', day: '2-digit', month: 'short' };
const datee = new Date(); // Current date
const formattedDate = datee.toLocaleDateString('en-US', options).toUpperCase();
dateElement.textContent = formattedDate;

var Weather_info= document.getElementsByClassName("Weather_info");
var search_button=document.getElementById("search-button");
var city_name=document.getElementById("city-input");
search_button.addEventListener('click',()=>{
    fetchWeatherData(city_name.value);
    console.log(city_name);
});


function fetchWeatherData(city) {
    const api_url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4&aqi=no`;
    fetch(api_url)
        .then(response => {
            if (!response.ok) {
                mess.innerHTML="City not found";
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            mess.innerHTML="";
            console.log(data);
            Weather_info[0].style.display="block";
            temperatureElement.innerHTML = data.current.temp_c; // Temperature in Celsius
            descriptionElement.innerHTML = data.current.condition.text; // Weather description
            cityElement.innerHTML = data.location.name+","+data.location.country; // City name
            longitudeElement.innerHTML = data.location.lon; // Longitude
            latitudeElement.innerHTML = data.location.lat; // Latitude
            feelLikeElement.innerHTML = data.current.feelslike_c; // Feels like temperature
            humidityElement.innerHTML = data.current.humidity; // Humidity
            windSpeedElement.innerHTML = data.current.wind_kph; // Wind speed in km/h
            var icon = data.current.condition.icon; // Weather icon
            imageElement.src = `https:${icon}`; // Weather icon URL
            sunriseElement.innerHTML = data.forecast.forecastday[0].astro.sunrise;
            sunsetElement.innerHTML = data.forecast.forecastday[0].astro.sunset;
            forecastContainer.innerHTML = ''; // Clear any previous content

            for (let i = 1; i < 3; i++) { // Loop for the next 3 days
                const day = data.forecast.forecastday[i];
                const dayContainer = document.createElement('div');
                dayContainer.className = 'forecast-day';
                dayContainer.innerHTML = 
                   `<h3>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                    <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                    <p>${day.day.condition.text}</p>`;
                forecastContainer.appendChild(dayContainer); // Append to the forecast container
            }
        })
        .catch(error => {
            console.error(error);
            // alert("No city found")
            forecastContainer.innerHTML = ''; // Clear forecast container
            Weather_info[0].style.display="none";
        });
}
