loadMembers(3, [2,3], true);

const API_KEY = '67a3d8987c73f087e61bc5614e4cda84';
const CITY = 'Timbuktu';
const UNITS = 'imperial';

async function fetchWeather() {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`);
        const data = await res.json();

        // Update DOM
        document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°F`;
        document.getElementById('description').textContent = capitalize(data.weather[0].description);
        document.getElementById('temp-max').textContent = `${Math.round(data.main.temp_max)}°F`;
        document.getElementById('temp-min').textContent = `${Math.round(data.main.temp_min)}°F`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;

        // Convert sunrise/sunset from UNIX to readable time
        document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise, data.timezone);
        document.getElementById('sunset').textContent = formatTime(data.sys.sunset, data.timezone);

        // Weather icon
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weather-icon').alt = data.weather[0].description;

    } catch (err) {
        console.error('Failed to fetch weather:', err);
    }
}

function formatTime(unixTime, timezoneOffset) {
    const date = new Date((unixTime + timezoneOffset) * 1000);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

fetchWeather();
