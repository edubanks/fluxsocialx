
function gerarPost() {
    const tema = document.getElementById('temaInput').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    if (!tema) {
        resultadoDiv.innerHTML = "Por favor, digite um tema.";
        return;
    }

    const sugestoes = {
        "marketing digital": [
            "Dica de hoje: Foque em conteúdo que resolve problemas reais do seu público!",
            "Mostre bastidores do seu trabalho e crie conexão.",
            "Faça stories com enquetes para engajar seu público!"
        ],
        "moda": [
            "Tendência da semana: tons neutros com detalhes dourados.",
            "Mostre como combinar peças básicas com estilo.",
            "Crie um vídeo com 3 looks diferentes usando a mesma peça!"
        ],
        "fitness": [
            "Compartilhe seu pré-treino favorito com seu público.",
            "Dê uma dica de respiração para melhorar o foco no treino.",
            "Mostre sua evolução com um antes e depois motivador!"
        ]
    };

    const chave = tema.toLowerCase();
    const sugestao = sugestoes[chave];

    if (sugestao) {
        const aleatoria = sugestao[Math.floor(Math.random() * sugestao.length)];
        resultadoDiv.innerHTML = aleatoria;
    } else {
        resultadoDiv.innerHTML = "Aqui vai uma sugestão universal: Crie um post que eduque, inspire ou gere conversa!";
    }
}
