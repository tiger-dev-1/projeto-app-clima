import { getCityWeather } from './api.js';
import { renderWeather, renderError, renderLoading } from './ui.js';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

/**
 * Define o tema da página (claro/escuro) baseado no horário comercial (09h-18h).
 */
function applyTheme() {
    const hour = new Date().getHours();
    const isDay = hour >= 9 && hour < 18;
    
    if (isDay) {
        document.body.classList.add('day-theme');
        document.body.classList.remove('night-theme');
    } else {
        document.body.classList.add('night-theme');
        document.body.classList.remove('day-theme');
    }
}

/**
 * Gerencia o fluxo de busca: valida entrada, dispara o loading e renderiza o resultado ou erro.
 */
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) return;

    searchBtn.disabled = true; // Evita múltiplas requisições simultâneas
    renderLoading();

    try {
        const weatherInfo = await getCityWeather(city);
        renderWeather(weatherInfo);
    } catch (error) {
        renderError(error.message);
    } finally {
        searchBtn.disabled = false;
    }
}

searchBtn.addEventListener('click', handleSearch);

// Melhora UX: Permite buscar ao pressionar Enter
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleSearch();
});

// Inicializa o tema ao carregar
applyTheme();

// Verifica o tema a cada minuto para caso o horário mude com a página aberta
setInterval(applyTheme, 60000);