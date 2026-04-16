import { getCityWeather } from './api.js';

/**
 * Suíte de testes simplificada para o App de Clima
 */
async function runTests() {
    console.log("🧪 Iniciando testes de integração...");

    // Caso de Teste 1: Cidade Válida
    try {
        console.log("Teste 1: Buscando cidade válida (Londres)...");
        const data = await getCityWeather("London");
        
        if (data.cityName && typeof data.temp === 'number' && data.description) {
            console.log("✅ Teste 1: Passou! Dados recebidos com sucesso.");
        } else {
            console.error("❌ Teste 1: Falhou! Objeto retornado está incompleto.", data);
        }
    } catch (error) {
        console.error("❌ Teste 1: Falhou com erro inesperado:", error.message);
    }

    // Caso de Teste 2: Cidade Inválida
    try {
        console.log("Teste 2: Buscando cidade inexistente...");
        await getCityWeather("CidadeQueNaoExiste12345");
        console.error("❌ Teste 2: Falhou! A API deveria ter retornado erro para cidade inexistente.");
    } catch (error) {
        if (error.message === "Cidade não encontrada") {
            console.log("✅ Teste 2: Passou! Erro de cidade não encontrada capturado corretamente.");
        } else {
            console.error("❌ Teste 2: Falhou! Retornou um erro inesperado:", error.message);
        }
    }

    // Caso de Teste 4: Caso Extremo - Caracteres Especiais e Espaços
    try {
        console.log("Teste 4: Buscando cidade com acentos e espaços (São José dos Campos)...");
        const data = await getCityWeather("São José dos Campos");
        
        if (data.cityName.includes("São José")) {
            console.log("✅ Teste 4: Passou! Caracteres especiais tratados corretamente.");
        } else {
            console.error("❌ Teste 4: Falhou! O nome da cidade retornou incorreto.", data.cityName);
        }
    } catch (error) {
        console.error("❌ Teste 4: Falhou! O sistema não soube lidar com acentos ou espaços.", error.message);
    }

    console.log("🏁 Testes finalizados.");
}

// Executa os testes
runTests();