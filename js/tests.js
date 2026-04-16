import { getCityWeather } from './api.js';

/**
 * Executa uma série de testes de integração para validar a API e o comportamento visual.
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

    // Caso de Teste 5: Verificação Visual de Temas (Dia/Noite)
    try {
        console.log("Teste 5: Iniciando demonstração visual de temas...");
        const body = document.body;
        const originalIsDay = body.classList.contains('day-theme');

        console.log("🌞 Forçando TEMA CLARO (Visualização de 3 segundos)...");
        body.classList.add('day-theme');
        body.classList.remove('night-theme');
        
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log("🌙 Forçando TEMA ESCURO (Visualização de 3 segundos)...");
        body.classList.add('night-theme');
        body.classList.remove('day-theme');

        await new Promise(resolve => setTimeout(resolve, 3000));

        // Restaura o tema correto baseado no horário atual
        console.log("♻️ Restaurando tema automático do sistema...");
        body.classList.toggle('day-theme', originalIsDay);
        body.classList.toggle('night-theme', !originalIsDay);
        
        console.log("✅ Teste 5: Ciclo visual concluído com sucesso.");
    } catch (error) {
        console.error("❌ Teste 5: Erro ao alternar temas.", error.message);
    }

    console.log("🏁 Testes finalizados.");
}

runTests();