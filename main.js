const api = {
    key: "b2cc690bb60b88d4cb15c9a63f19a360",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) { //if user presses 'Enter'
        getResults(searchBox.value);
        //console.log(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);

    var city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    var temprature = document.querySelector('.current .temp');
    temprature.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    var highLow = document.querySelector('.current .hi-low');
    highLow.innerText = `${weather.main.temp_min}°C /  ${weather.main.temp_max}°C`;

    var currentDate = new Date();
    var date = document.querySelector('.location .date');
    date.innerText = dateBuilder(currentDate);

    var weather_el = document.querySelector('.current .weather');
    weather_el.innerText = `${weather.weather[0].main}`;
}


function dateBuilder(d) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var day = days[d.getDay()];
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();

    var suffix;

    switch (date) {
        case 1:
            suffix = 'st';
            break;
        case 2:
            suffix = 'nd';
            break;
        case 3:
            suffix = 'rd';
            break;
        default:
            suffix = 'th';
    }

    return `${day}, ${month} ${date}${suffix}, ${year}`;
}