/**
 * Converte o nome de uma cidade em coordenadas geográficas (lat/lon).
 * @param {string} city - Nome da cidade para busca.
 * @returns {Promise<Object>} Objeto contendo latitude, longitude e nome formatado.
 */
export async function getCoordinates(city) {
    // encodeURIComponent garante que espaços e acentos não quebrem a URL
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error("Erro ao conectar com o serviço de localização");
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
        throw new Error("Cidade não encontrada");
    }
    
    return data.results[0]; // Retorna lat, lon e nome formatado
}

/**
 * Busca os dados meteorológicos atuais baseados em coordenadas.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @returns {Promise<Object>} JSON bruto com as informações do clima.
 */
export async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error("Erro ao buscar dados meteorológicos");
    
    return response.json();
}

/**
 * Traduz o código numérico da API (WMO Weather interpretation codes) para texto.
 * @param {number} code - Código da condição climática.
 * @returns {string} Descrição amigável em português.
 */
function getWeatherDescription(code) {
    const mapping = {
        0: "Céu limpo",
        1: "Ensolarado", 2: "Parcialmente Nublado", 3: "Encoberto",
        45: "Nevoeiro", 48: "Nevoeiro com Rima",
        51: "Garoa leve", 53: "Garoa moderada", 55: "Garoa densa",
        61: "Chuva leve", 63: "Chuva moderada", 65: "Chuva forte",
        71: "Neve leve", 73: "Neve moderada", 75: "Neve forte",
        80: "Pancadas de Chuva Leves", 81: "Pancadas de Chuva Moderadas", 82: "Pancadas de chuva Fortes",
        95: "Trovoada Leve a Moderada",
    };
    return mapping[code] || "Condição desconhecida";
}

/**
 * Função principal de integração: coordena a busca de localização e clima.
 * Trata erros de nome inválido, rede e falhas de API através das funções internas.
 * @param {string} city - Nome da cidade digitada pelo usuário.
 * @returns {Promise<Object>} Dados processados prontos para a interface (UI).
 */
export async function getCityWeather(city) {
    // 1. Busca coordenadas (já trata cidade inválida e erro de rede)
    const coords = await getCoordinates(city);
    
    // 2. Busca clima (já trata erro de rede e API)
    const weatherData = await getWeather(coords.latitude, coords.longitude);
    
    const { temperature, weathercode } = weatherData.current_weather;
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // 3. Retorna o objeto exatamente como pedido
    return {
        cityName: coords.name,
        state: coords.admin1 || "",
        country: coords.country || "",
        temp: temperature,
        description: getWeatherDescription(weathercode),
        time: timeString
    };
}
