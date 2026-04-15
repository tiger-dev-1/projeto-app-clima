export async function getCoordinates(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=pt&format=json`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error("Erro ao conectar com o serviço de localização");
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
        throw new Error("Cidade não encontrada");
    }
    
    return data.results[0]; // Retorna lat, lon e nome formatado
}

export async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error("Erro ao buscar dados meteorológicos");
    
    return await response.json();
}
