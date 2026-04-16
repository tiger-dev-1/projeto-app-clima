const resultDiv = document.getElementById('weatherResult');

/**
 * Exibe uma mensagem de carregamento enquanto aguarda a resposta da API.
 */
export function renderLoading() {
    resultDiv.innerHTML = '<p class="loading">Buscando dados meteorológicos...</p>';
}

/**
 * Exibe uma mensagem de erro estilizada para o usuário.
 * @param {string} message - A mensagem de erro capturada pelo sistema.
 */
export function renderError(message) {
    resultDiv.innerHTML = `<p class="error" style="color: #e74c3c;">Erro: ${message}</p>`;
}

/**
 * Monta e insere o HTML do cartão de clima com os dados recebidos.
 * @param {Object} weatherInfo - Objeto contendo nome, temp, descrição e horário.
 */
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