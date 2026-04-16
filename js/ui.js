const resultDiv = document.getElementById('weatherResult');

export function renderLoading() {
    resultDiv.innerHTML = '<p class="loading">Buscando dados meteorológicos...</p>';
}

export function renderError(message) {
    resultDiv.innerHTML = `<p class="error" style="color: #e74c3c;">Erro: ${message}</p>`;
}

export function renderWeather(weatherInfo) {
    const { cityName, state, country, temp, description, time } = weatherInfo;
    const location = state ? `${cityName}, ${state} - ${country}` : `${cityName} - ${country}`;
    
    resultDiv.innerHTML = `
        <div class="weather-card">
            <h2 class="location-title">${location}</h2>
            <p class="temp">${temp}°C</p>
            <p class="details">${description}</p>
            <p class="timestamp">Consulta realizada às ${time}</p>
        </div>
    `;
}