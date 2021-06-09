function formateDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`
  };
  if (hours > 12) {
    hours = hours - 12;
  };
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  };
  return `${day} ${hours}:${minutes}`;
};

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
};

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1b4633177fe295b77ce7fe4928580db0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
};

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
    forecastHTML = 
    forecastHTML + 
    `
      <div class="col-2">
        <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
        </div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="weather-icon" width="42">
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">
                ${Math.round(forecastDay.temp.max)}°
              </span>
              <span class="weather-forecast-temperature-min">
                ${Math.round(forecastDay.temp.min)}°
              </span>
            </div>
      </div>
    `;
    }
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
};


function displayTemperature(response) {
  let cityElement = document.querySelector('#city');
  let dateElement = document.querySelector('#date');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let iconElement = document.querySelector('#icon');
  let temperatureElement = document.querySelector('#temperature');
  let windElement = document.querySelector('#wind');

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`)
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
};

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");

  search(cityInputElement.value);
};

function search(city) {
  let apiKey = "1b4633177fe295b77ce7fe4928580db0";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(displayTemperature);
};

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");