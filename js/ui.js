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
    const locationText = state ? `${cityName}, ${state} - ${country}` : `${cityName} - ${country}`;

    // Limpamos o conteúdo anterior e criamos o card de forma segura
    resultDiv.innerHTML = ''; 
    const card = document.createElement('div');
    card.className = 'weather-card';

    card.innerHTML = `
        <h2 class="location-title"></h2>
        <p class="temp">${temp}°C</p>
        <p class="details"></p>
        <p class="timestamp">Consulta realizada às ${time}</p>
    `;

    // Inserimos os dados sensíveis como texto puro para evitar injeção de código
    card.querySelector('.location-title').textContent = locationText;
    card.querySelector('.details').textContent = description;
    
    resultDiv.appendChild(card);
}