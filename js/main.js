import { getCoordinates, getWeather } from './api.js';
import { renderWeather, renderError, renderLoading } from './ui.js';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) return;

    renderLoading();

    try {
        const coords = await getCoordinates(city);
        const weather = await getWeather(coords.latitude, coords.longitude);
        renderWeather(coords, weather);
    } catch (error) {
        renderError(error.message);
    }
}

searchBtn.addEventListener('click', handleSearch);

// Melhora UX: Permite buscar ao pressionar Enter
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleSearch();
});