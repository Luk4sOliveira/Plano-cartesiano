//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//BOTÕES
function mostrarConteudo(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "Qual é o nome do eixo horizontal do plano cartesiano?",
        alternativas: ["a) Eixo das ordenadas", "b) Eixo das abscissas", "c) Origem", "d) Quadrante"],
        correta: 1,
        explicacao: "O eixo horizontal do plano cartesiano é o eixo das abscissas (x). O eixo vertical é o das ordenadas (y), e o ponto onde os dois se cruzam é a origem, (0, 0)."
    },
    {
        pergunta: "Em qual quadrante está o ponto P(−3, 4)?",
        alternativas: ["a) 1º Quadrante", "b) 2º Quadrante", "c) 3º Quadrante", "d) 4º Quadrante"],
        correta: 1,
        explicacao: "No ponto P(−3, 4), x é negativo e y é positivo. Os quadrantes são numerados no sentido anti-horário:<p>1º quadrante: x > 0 e y > 0</p><p>2º quadrante: x < 0 e y > 0</p><p>3º quadrante: x < 0 e y < 0</p><p>4º quadrante: x > 0 e y < 0</p>"
    },
    {
        pergunta: "Qual é o ponto simétrico de A(3, 5) em relação ao eixo x?",
        alternativas: ["a) (−3, 5)", "b) (−3, −5)", "c) (5, 3)", "d) (3, −5)"],
        correta: 3,
        explicacao: "Na simetria em relação ao eixo x, a abscissa não muda e a ordenada troca de sinal. Assim, (3, 5) vira (3, −5). Em relação ao eixo y, seria o contrário: o x trocaria de sinal."
    },
    {
        pergunta: "Qual é a distância entre os pontos A(1, 2) e B(4, 6)?",
        alternativas: ["a) 5", "b) 7", "c) √7", "d) 25"],
        correta: 0,
        explicacao: "Aplicando a fórmula da distância entre dois pontos: <p>d = √[(x₂ − x₁)² + (y₂ − y₁)²] = √[(4 − 1)² + (6 − 2)²] = √(9 + 16) = √25 = 5</p><p>Isso equivale ao Teorema de Pitágoras: a distância horizontal (3) e a vertical (4) são os catetos, e a distância entre os pontos é a hipotenusa (3² + 4² = 5²).</p>"
    },
    {
        pergunta: "Qual é o ponto médio do segmento com extremos A(2, 3) e B(8, 7)?",
        alternativas: ["a) (6, 4)", "b) (10, 10)", "c) (3, 2)", "d) (5, 5)"],
        correta: 3,
        explicacao: "O ponto médio é a média das coordenadas dos extremos: <p>xₘ = (2 + 8) / 2 = 5</p><p>yₘ = (3 + 7) / 2 = 5</p><p>Logo, M(5, 5).</p>"
    },
    {
        pergunta: "Sobre a reta y = −2x + 5, é correto afirmar que:",
        alternativas: ["a) É crescente e corta o eixo y no ponto (0, 5)", "b) É decrescente e corta o eixo y no ponto (0, 5)", "c) É decrescente e corta o eixo y no ponto (0, −2)", "d) É crescente e corta o eixo x no ponto (0, 5)"],
        correta: 1,
        explicacao: "Na equação reduzida y = mx + n: <p>O coeficiente angular é m = −2. Como é negativo, a reta é decrescente.</p><p>O coeficiente linear é n = 5. Ele indica onde a reta corta o eixo y, no ponto (0, 5).</p>"
    },
    {
        pergunta: "Qual é a equação reduzida da reta que passa pelos pontos (1, 3) e (3, 7)?",
        alternativas: ["a) y = 2x + 1", "b) y = 2x + 3", "c) y = 4x − 1", "d) y = x + 2"],
        correta: 0,
        explicacao: "Calcule o coeficiente angular: m = (7 − 3) / (3 − 1) = 4/2 = 2.<p>Use um dos pontos, por exemplo (1, 3): y − 3 = 2(x − 1).</p><p>Desenvolva: y = 2x − 2 + 3, ou seja, y = 2x + 1.</p><p>Teste com o outro ponto: para x = 3, y = 2·3 + 1 = 7.</p><p>A interseção é (2, 5). Conferindo na outra reta: −2 + 7 = 5</p>"
    },
    {
        pergunta: "Qual é o ponto de interseção das retas y = 2x + 1 e y = −x + 7?",
        alternativas: ["a) (1, 6)", "b) (3, 4)", "c) (2, 5)", "d) (2, 3)"],
        correta: 2,
        explicacao: "No ponto de interseção, as duas retas têm o mesmo y. Basta igualar as equações:<p>2x + 1 = −x + 7</p><p>3x = 6, logo x = 2</p><p>Substituindo: y = 2·2 + 1 = 5</p>"
    },
    {
        pergunta: "Qual é o vértice da parábola de f(x) = x² − 6x + 5?",
        alternativas: ["a) (3, −4)", "b) (−3, 4)", "c) (6, 5)", "d) (3, 5)"],
        correta: 0,
        explicacao: "Na função f(x) = x² − 6x + 5, temos a = 1, b = −6 e c = 5.<p>xᵥ = −b / (2a) = 6 / 2 = 3</p><p>yᵥ = f(3) = 3² − 6·3 + 5 = 9 − 18 + 5 = −4</p><p>Como a > 0, a parábola tem concavidade para cima. Por isso, o vértice (3, −4) é o ponto de mínimo da função.</p>"
    },
    {
        pergunta: "O número de bactérias de uma cultura é dado por P(t) = 100 · 2^(t/3), em que t é o tempo em horas. Considerando log 2 ≈ 0,30 (logaritmo decimal), em quantas horas a cultura chegará a 1000 bactérias?",
        alternativas: ["a) 7 horas", "b) 8 horas", "c) 9 horas", "d) 10 horas"],
        correta: 3,
        explicacao: "Queremos P(t) = 1000: <p>100 · 2^(t/3) = 1000</p><p>Divida por 100: 2^(t/3) = 10</p><p>Aplique log dos dois lados: (t/3) · log 2 = log 10</p><p>Como log 2 ≈ 0,30 e log 10 = 1: (t/3) · 0,30 = 1</p><p>t/3 = 1 / 0,30 ≈ 3,33</p><p>t ≈ 3,33 · 3 ≈ 10</p><p>A cultura chega a 1000 bactérias em aproximadamente 10 horas.</p>"
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta!\n${pergunta.explicacao}`;
        pontos++;
        document.getElementById("pontuacao").textContent = `Pontos: ${pontos}`;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta.\n${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
    }

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}