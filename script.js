// Weather Api
const apiKey = "ff77349cf3ff082fc8d44b4a9ebb3767";

function getApi(city) {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var city = data[0].name

            console.log(data);
            console.log('lat', lat);
            console.log('lon', lon);
            console.log('name', city);
            getWeather(lat, lon, city);
    });
}

function getWeather(lat, lon, city) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let temp = data.main.temp;
            let humidity = data.main.humidity;
            let windSpeed = data.wind.speed;
            
            document.getElementById('currentWeather').innerHTML =

            `<div class='current'>
                <h3>${city}</h3>
                <p>Temp: <span>${temp}</span></p>
                <p>Humidity: <span>${humidity}</span></p> 
                <p>Wind Speed: <span>${windSpeed}</span></p>
            </div>`
        })
}

function searchCity(event) {
    event.preventDefault();
    var text = (this.querySelector('[name=city]'));
    var city = {text};

    localStorage.setItem('city', JSON.stringify(city));
    this.reset();

    getApi(city);
}

$('#submit').click(function(){
    let city = $('#city').val()
    getApi(city)
  });