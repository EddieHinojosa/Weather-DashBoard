const apiKey = '3b58890c03b5bd5e440882745e74cfa4';

document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-search').value;
    if (city) {
        getWeather(city);
        addToHistory(city);
    }
});

document.getElementById('history-list').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === 'LI') {
        getWeather(e.target.textContent);
    }
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        alert("City not found");
        console.error("Error fetching data", error);
    });
}

function displayWeather(data) {
    const cityName = data.city.name;
    const currentWeather = data.list[0];
    
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('date').textContent = new Date(currentWeather.dt_txt).toLocaleDateString();
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp} °F`;
    document.getElementById('humidity').textContent = `Humidity: ${currentWeather.main.humidity} %`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${currentWeather.wind.speed} m/s`;
    
    displayForecast(data);
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-display');
    forecastContainer.innerHTML = '';

    for (let i = 1; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const dayDiv = document.createElement('div');

        dayDiv.innerHTML = `
            <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather Icon">
            <p>Temp: ${forecast.main.temp} °F</p>
            <p>Humidity: ${forecast.main.humidity} %</p>
            <p>Wind: ${forecast.wind.speed} m/s</p>
        `;

        forecastContainer.appendChild(dayDiv);
    }
}

function addToHistory(city) {
    const historyList = document.getElementById('history-list');
    const historyItem = document.createElement('li');
    historyItem.textContent = city;
    historyList.appendChild(historyItem);
}

