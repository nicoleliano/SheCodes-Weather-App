function displayTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector('#city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let temperatureElement = document.querySelector('#temperature');
  let windElement = document.querySelector('#wind');
  
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
 };

let apiKey = "1b4633177fe295b77ce7fe4928580db0";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);