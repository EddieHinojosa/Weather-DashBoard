//api key generated from openweathermap.org
const apiKey = '3b58890c03b5bd5e440882745e74cfa4';


document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-search').value;
    if (city) {
        getWeather(city);
        addToHistory(city);
    }
});

document.getElementById('history-list').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        getWeather(e.target.textContent);
    }
});


//function to fetch the weather data from the api
function getWeather(city) {
    //fetch request to the api
    fetch(`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
        //function to display the weather data
        displayWeather(data);
    });
};


function getWeather(city) {
    //fetch request tot he api
    fetch (`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        //function to display the weather data
        displayWeather(data)

    displayWeather(weatherData);
    });
};

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.cityName;
    document.getElementById('date').textContent = data.date;
    document.getElementById('weather-icon').src = data.icon;
    document.getElementById('temperature').textContent = `Temperature: ${data.temperature}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.humidity}`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.windSpeed}`;

    const forecastContainer = document.getElementById('forecast-display');
    forecastContainer.innerHTML = '';
    data.forecast.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `
            <p>${day.date}</p>
            <img src="${day.icon}" alt="Weather Icon">
            <p>Temp: ${day.temp}</p>
            <p>Wind: ${day.wind}</p>
            <p>Humidity: ${day.humidity}</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}

function addToHistory(city) {
    const historyList = document.getElementById('history-list');
    const historyItem = document.createElement('li');
    historyItem.textContent = city;
    historyList.appendChild(historyItem);
}
