# 🌤️ App de Clima - Consulta Meteorológica

Este é um projeto prático desenvolvido para consulta de clima em tempo real. O aplicativo permite que qualquer pessoa digite o nome de uma cidade e receba instantaneamente a temperatura atual e a condição climática (ex: Céu limpo, Chuva moderada, etc.).

O sistema consome dados reais da API pública [Open-Meteo](https://open-meteo.com/), garantindo informações precisas e atualizadas.

## ✨ Funcionalidades

- **Busca Inteligente:** Encontre o clima de qualquer cidade do mundo.
- **Tratamento de Nomes:** O sistema entende acentos e espaços (ex: "São Paulo" ou "Cuiabá").
- **Interface Amigável:** Exibição clara em cartões de fácil leitura.
- **Mensagens de Erro:** Caso a cidade não seja encontrada ou haja falha na internet, o app avisa você de forma educada.

## 🚀 Como Executar o Projeto

Como este projeto utiliza módulos modernos do JavaScript, ele não pode ser aberto simplesmente clicando duas vezes no arquivo HTML. Siga estes passos simples:

1. **Baixe o projeto:** Baixe a pasta completa (ou o arquivo .zip) e extraia no seu computador.
2. **Abra no VS Code:** Abra a pasta do projeto no seu editor Visual Studio Code.
3. **Instale a Extensão:** Procure na aba de extensões por **"Live Server"** (ou similar) e instale-a.
4. **Inicie o App:** 
   - Com o arquivo `index.html` aberto, clique no botão **"Go Live"** no canto inferior direito do VS Code.
   - Uma nova aba abrirá automaticamente no seu navegador com o aplicativo funcionando!

## 🧪 Testes Automatizados

O projeto conta com uma suíte de testes integrada para garantir que tudo funcione conforme o esperado, verificando desde cidades válidas até casos de erro.

### Como ver os testes:
1. No seu navegador, com o app aberto, aperte a tecla **F12** (ou clique com o botão direito e vá em "Inspecionar").
2. Clique na aba **Console**.
3. Você verá os logs de "🧪 Iniciando testes..." com os resultados de cada validação.

### Como desativar os testes:
Se você quiser esconder os testes para que apenas o app de clima apareça no console, siga este passo:
1. Abra o arquivo `index.html`.
2. Procure pela linha:
   ```html
   <script type="module" src="js/tests.js"></script>
   ```
3. Comente a linha adicionando `<!--` no início e `-->` no fim, assim:
   ```html
   <!-- <script type="module" src="js/tests.js"></script> -->
   ```
4. Salve o arquivo e os testes não serão mais executados.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura da página.
- **CSS3:** Estilização e layout responsivo.
- **JavaScript (ES6+):** Lógica, consumo de API assíncrona e módulos.
- **Open-Meteo API:** Fonte de dados meteorológicos gratuita e aberta.

---
*Projeto desenvolvido para fins educacionais.*
