function calcularResultados() {
    // Verificar se todas as perguntas foram respondidas
    const perguntas = document.querySelectorAll('input[type="radio"]:checked');
    const totalPerguntas = document.querySelectorAll('li').length;

    if (perguntas.length < totalPerguntas) {
        alert("Por favor, responda todas as perguntas antes de ver o resultado.");
        return;
    }

    // Contagem de respostas para cada dimensão DISC
    let dominancia = 0;
    let influencia = 0;
    let estabilidade = 0;
    let conformidade = 0;

    perguntas.forEach((pergunta) => {
        switch (pergunta.value) {
            case 'Dominância':
                dominancia++;
                break;
            case 'Influência':
                influencia++;
                break;
            case 'Estabilidade':
                estabilidade++;
                break;
            case 'Conformidade':
                conformidade++;
                break;
        }
    });

    // Exibir resultados no texto
    const resultadoTexto = document.getElementById('disc-resultado-texto');
    resultadoTexto.innerHTML = `
        <p>Dominância: ${dominancia}</p>
        <p>Influência: ${influencia}</p>
        <p>Estabilidade: ${estabilidade}</p>
        <p>Conformidade: ${conformidade}</p>
    `;

    // Gerar gráficos
    gerarGraficos(dominancia, influencia, estabilidade, conformidade);
}

// Função para gerar gráficos
function gerarGraficos(dominancia, influencia, estabilidade, conformidade) {
    const ctxBarras = document.getElementById('grafico-barras').getContext('2d');
    const ctxRadar = document.getElementById('grafico-radar').getContext('2d');

    // Gráfico de Barras
    new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: ['Dominância', 'Influência', 'Estabilidade', 'Conformidade'],
            datasets: [{
                label: 'Pontuação DISC',
                data: [dominancia, influencia, estabilidade, conformidade],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500, // Duração da animação em milissegundos
                easing: 'easeOutBounce' // Efeito de animação
            }
        }
    });

    // Gráfico de Radar (Teia)
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Dominância', 'Influência', 'Estabilidade', 'Conformidade'],
            datasets: [{
                label: 'Perfil DISC',
                data: [dominancia, influencia, estabilidade, conformidade],
                backgroundColor: 'rgba(15, 102, 255, 0.2)',
                borderColor: 'rgba(15, 102, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500, // Duração da animação
                easing: 'easeInOutQuad' // Efeito de animação
            }
        }
    });
}
