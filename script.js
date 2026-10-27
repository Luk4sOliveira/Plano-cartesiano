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

//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//EIXO E ALIADOS
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        "pergunta": "O que o Teorema de Pitágoras relaciona?",
        "alternativas": [
            "Os ângulos de qualquer triângulo",
            "A área de um círculo",
            "Os lados de um triângulo retângulo",
            "Os lados de qualquer quadrilátero"
        ],
        "correta": 2,
        "explicacao": "O teorema relaciona os comprimentos dos lados de um triângulo retângulo."
    },
    {
        "pergunta": "Como se chama o lado oposto ao ângulo reto?",
        "alternativas": [
            "Hipotenusa",
            "Cateto maior",
            "Cateto menor",
            "Base"
        ],
        "correta": 0,
        "explicacao": "A hipotenusa é o lado oposto ao ângulo reto e o maior lado do triângulo retângulo."
    },
    {
        "pergunta": "Qual é a fórmula do Teorema de Pitágoras?",
        "alternativas": [
            "a + b = c",
            "a² + b² = c²",
            "a² − b² = c",
            "a · b = c²"
        ],
        "correta": 1,
        "explicacao": "O quadrado da hipotenusa (c²) é igual à soma dos quadrados dos catetos (a² + b²)."
    },
    {
        "pergunta": "Os catetos de um triângulo retângulo medem 3 cm e 4 cm. Quanto mede a hipotenusa?",
        "alternativas": [
            "6 cm",
            "7 cm",
            "12 cm",
            "5 cm"
        ],
        "correta": 3,
        "explicacao": "3² + 4² = 9 + 16 = 25, e a raiz quadrada de 25 é 5."
    },
    {
        "pergunta": "A hipotenusa mede 13 m e um dos catetos mede 5 m. Quanto mede o outro cateto?",
        "alternativas": [
            "8 m",
            "12 m",
            "10 m",
            "18 m"
        ],
        "correta": 1,
        "explicacao": "13² − 5² = 169 − 25 = 144, e a raiz quadrada de 144 é 12."
    },
    {
        "pergunta": "Qual destas trincas de números é uma tripla pitagórica?",
        "alternativas": [
            "5, 12, 13",
            "2, 3, 4",
            "6, 7, 8",
            "4, 5, 6"
        ],
        "correta": 0,
        "explicacao": "5² + 12² = 25 + 144 = 169 = 13²."
    },
    {
        "pergunta": "Em um triângulo retângulo, qual é sempre o maior lado?",
        "alternativas": [
            "Um dos catetos",
            "Depende do triângulo",
            "A hipotenusa",
            "Todos têm o mesmo tamanho"
        ],
        "correta": 2,
        "explicacao": "A hipotenusa é sempre maior que cada cateto, pois c² = a² + b²."
    },
    {
        "pergunta": "Uma escada de 10 m apoia-se numa parede, com o pé a 6 m dela. A que altura da parede ela chega?",
        "alternativas": [
            "4 m",
            "16 m",
            "12 m",
            "8 m"
        ],
        "correta": 3,
        "explicacao": "10² − 6² = 100 − 36 = 64, e a raiz quadrada de 64 é 8."
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
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
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
