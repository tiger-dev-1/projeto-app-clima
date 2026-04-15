const resultDiv = document.getElementById('weatherResult');

export function renderLoading() {
    resultDiv.innerHTML = '<p class="loading">Buscando dados meteorológicos...</p>';
}

export function renderError(message) {
    resultDiv.innerHTML = `<p class="error" style="color: #e74c3c;">Erro: ${message}</p>`;
}

export function renderWeather(coords, weather) {
    const { temperature, windspeed } = weather.current_weather;
    
    resultDiv.innerHTML = `
        <div class="weather-card">
            <h2>${coords.name}, ${coords.country || ''}</h2>
            <p class="temp">${temperature}°C</p>
            <p class="details">Vento: ${windspeed} km/h</p>
        </div>
    `;
}