// Elementos do DOM
const gameDisplay = document.getElementById('game');
const gameResult = document.getElementById('game-result');
const playerImg = document.getElementById('jogador');
const pcImg = document.getElementById('pc');
const fraseElement = document.getElementById('frase');
const playAgainBtn = document.getElementById('botao');
const roundCounter = document.getElementById('content-number');
const playerScoreElement = document.getElementById('player-score');
const pcScoreElement = document.getElementById('pc-score');
const drawScoreElement = document.getElementById('draw-score');
const rodadasScoreElement = document.getElementById('rodadas-score');
const resetScoresBtn = document.getElementById('resetScores');
const dadosBtn = document.getElementById('dadosBtn');
const dadosBox = document.getElementById('dadosBox');
const fecharDadosBtn = document.getElementById('fecharDadoaBtn');
const regrasBtn = document.getElementById('regrasBtn');
const regrasBox = document.getElementById('regrasBox');
const fecharRegrasBtn = document.getElementById('fecharRegrasBtn');

// Opções do jogo
const options = [
  { name: 'Tesoura', beats: ['Papel', 'Lagarto'], icon: '/image/icon-scissors.svg' },
  { name: 'Papel', beats: ['Pedra', 'Spock'], icon: '/image/icon-paper.svg' },
  { name: 'Spock', beats: ['Tesoura', 'Pedra'], icon: '/image/icon-spock.svg' },
  { name: 'Pedra', beats: ['Lagarto', 'Tesoura'], icon: '/image/icon-rock.svg' },
  { name: 'Lagarto', beats: ['Spock', 'Papel'], icon: '/image/icon-lizard.svg' }
];

// Variáveis de estado
let playerScore = 0;
let pcScore = 0;
let drawScore = 0;
let rounds = 0;
// Carregar pontuações salvas
loadScores();

// Função para selecionar uma opção
// Mapeamento das classes de cor
const optionBorderClasses = {
  'Tesoura': 'tesoura',
  'Papel': 'papel',
  'Spock': 'spock',
  'Pedra': 'pedra',
  'Lagarto': 'lagarto'
};

// Modifique a função select
window.select = function (index) {
  const playerChoice = options[index];
  const pcChoice = options[Math.floor(Math.random() * options.length)];

  // Esconder o jogo e mostrar a tela de resultado
  gameDisplay.style.display = 'none';
  gameResult.style.display = 'block';
  playAgainBtn.style.display = 'none';

  // Iniciar contagem regressiva
  fraseElement.textContent = '3';

  // Efeito de embaralhamento
  const efeito = setInterval(() => {
    const randomPlayer = Math.floor(Math.random() * options.length);
    playerImg.src = options[randomPlayer].icon;
    const randomPc = Math.floor(Math.random() * options.length);
    pcImg.src = options[randomPc].icon;
  }, 100);

  // Contagem regressiva
  const tempo = setInterval(() => {
    let contador = parseInt(fraseElement.textContent);
    contador--;
    fraseElement.textContent = contador;

    if (contador === 0) {
      clearInterval(tempo);
      clearInterval(efeito);

      // Mostrar escolhas reais
      playerImg.src = playerChoice.icon;
      pcImg.src = pcChoice.icon;

      // Pegar elementos das bordas
      const playerBorder = document.querySelector('.jogador-choice .border-inner');
      const pcBorder = document.querySelector('.pc-choice .border-inner');

      // Remover todas as classes de cor primeiro
      playerBorder.classList.remove('tesoura', 'papel', 'spock', 'pedra', 'lagarto');
      pcBorder.classList.remove('tesoura', 'papel', 'spock', 'pedra', 'lagarto');

      // Adicionar classes corretas baseadas nas escolhas
      playerBorder.classList.add(optionBorderClasses[playerChoice.name]);
      pcBorder.classList.add(optionBorderClasses[pcChoice.name]);

      // Determinar o vencedor
      const result = determineWinner(playerChoice, pcChoice);

      // Atualizar interface
      updateResultText(result, playerChoice, pcChoice);
      updateScores(result);
      playAgainBtn.style.display = 'block';

      // Animação do vencedor
      if (result === 'win') {
        playerBorder.classList.add('winner');
      } else if (result === 'lose') {
        pcBorder.classList.add('winner');
      }
    }
  }, 1000);
};

// Função para resetar as bordas ao jogar novamente
playAgainBtn.addEventListener('click', function () {
  const playerBorder = document.querySelector('.jogador-choice .border-inner');
  const pcBorder = document.querySelector('.pc-choice .border-inner');

  // Remover classes de cor e vencedor
  playerBorder.classList.remove('tesoura', 'papel', 'spock', 'pedra', 'lagarto', 'winner');
  pcBorder.classList.remove('tesoura', 'papel', 'spock', 'pedra', 'lagarto', 'winner');

  // Voltar para a tela do jogo
  gameDisplay.style.display = 'block';
  gameResult.style.display = 'none';
});

// Função para determinar o vencedor
function determineWinner(player, pc) {
  if (player.name === pc.name) return 'draw';
  if (player.beats.includes(pc.name)) return 'win';
  return 'lose';
}

// Função para atualizar o texto de resultado
function updateResultText(result, playerChoice, pcChoice) {
  let frase = '';

  if (result === 'win') {
    frase = `Você ganhou!<br>${playerChoice.name} ${getAction(playerChoice, pcChoice)} ${pcChoice.name}`;
  } else if (result === 'lose') {
    frase = `Você perdeu!<br>${pcChoice.name} ${getAction(pcChoice, playerChoice)} ${playerChoice.name}`;
  } else {
    frase = `Empate!<br>Ambos escolheram ${playerChoice.name}`;
  }

  fraseElement.innerHTML = frase;
}

// Função para obter a ação entre duas opções
function getAction(winner, loser) {
  const actions = {
    'Tesoura': { 'Papel': 'corta', 'Lagarto': 'decapita' },
    'Papel': { 'Pedra': 'cobre', 'Spock': 'refuta' },
    'Spock': { 'Tesoura': 'quebra', 'Pedra': 'vaporiza' },
    'Pedra': { 'Lagarto': 'esmaga', 'Tesoura': 'amassa' },
    'Lagarto': { 'Spock': 'envenena', 'Papel': 'come' }
  };

  return actions[winner.name][loser.name];
}

// Função para atualizar pontuações
function updateScores(result) {
  rounds++;
  roundCounter.textContent = rounds;

  if (result === 'win') {
    playerScore++;
  } else if (result === 'lose') {
    pcScore++;
  } else {
    drawScore++;
  }

  updateScoreDisplay();
}

// Função para atualizar a exibição das pontuações
function updateScoreDisplay() {
  playerScoreElement.textContent = playerScore;
  pcScoreElement.textContent = pcScore;
  drawScoreElement.textContent = drawScore;
  rodadasScoreElement.textContent = rounds;
}

// Função para salvar pontuações no localStorage
function saveScores() {
  localStorage.setItem('playerScore', playerScore);
  localStorage.setItem('pcScore', pcScore);
  localStorage.setItem('drawScore', drawScore);
  localStorage.setItem('rounds', rounds);
}

// Função para carregar pontuações do localStorage
function loadScores() {
  playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
  pcScore = parseInt(localStorage.getItem('pcScore')) || 0;
  drawScore = parseInt(localStorage.getItem('drawScore')) || 0;
  rounds = parseInt(localStorage.getItem('rounds')) || 0;

  roundCounter.textContent = rounds;
  updateScoreDisplay();
}

// Event listeners
playAgainBtn.addEventListener('click', function () {
  gameDisplay.style.display = 'block';
  gameResult.style.display = 'none';
});

resetScoresBtn.addEventListener('click', function () {
  playerScore = 0;
  pcScore = 0;
  drawScore = 0;
  rounds = 0;

  roundCounter.textContent = rounds;
  updateScoreDisplay();
  saveScores();
});

// Mostrar/ocultar caixa de dados
dadosBtn.addEventListener('click', function () {
  dadosBox.style.opacity = '1';
  dadosBox.style.visibility = 'visible';
});

fecharDadosBtn.addEventListener('click', function () {
  dadosBox.style.opacity = '0';
  dadosBox.style.visibility = 'hidden';
});

// Mostrar/ocultar caixa de regras
regrasBtn.addEventListener('click', function () {
  regrasBox.style.opacity = '1';
  regrasBox.style.visibility = 'visible';
});

fecharRegrasBtn.addEventListener('click', function () {
  regrasBox.style.opacity = '0';
  regrasBox.style.visibility = 'hidden';
});