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
};

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");

  search(cityInputElement.value);
};

function search(city) {
  let apiKey = "1b4633177fe295b77ce7fe4928580db0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(displayTemperature);
};

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemp;
};

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
};

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);


search("New York");