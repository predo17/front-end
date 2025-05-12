const frase = document.getElementById("frase");
const jogador = document.getElementById("jogador");
const pc = document.getElementById("pc");
const botao = document.getElementById("botao");
const game = document.getElementById("game");
const gameResult = document.getElementById("game-result");
const cores = ["amarelo", "azul", "azul-claro", "vermelho", "roxo"];
//botão de regra, dados e de reset dados
const regrasBtn = document.getElementById('regrasBtn');
const regrasBox = document.getElementById('regrasBox');
const dadosBtn = document.getElementById('dadosBtn');
const dadosBox = document.getElementById('dadosBox');
const fecharRegrasBtn = document.getElementById('fecharRegrasBtn');
const fecharDadoaBtn = document.getElementById('fecharDadoaBtn');
const resetScores = document.getElementById('resetscores')

regrasBtn.addEventListener('click', () => {
  regrasBox.style.display = 'block';
  setTimeout(() => {
    regrasBox.classList.add('show');
  }, 10);
});

fecharRegrasBtn.addEventListener('click', () => {
  regrasBox.classList.remove('show');
  setTimeout(() => {
    regrasBox.style.display = 'none';
  }, 500);
});

dadosBtn.addEventListener('click', () => {
  dadosBox.style.display = 'block';
  setTimeout(() => {
    dadosBox.classList.add('show');
  }, 10);
});

fecharDadoaBtn.addEventListener('click', () => {
  dadosBox.classList.remove('show');
  setTimeout(() => {
    dadosBox.style.display = 'none';
  }, 500);
});

const imagens = [
  "/image/icon-scissors.svg",
  "/image/icon-paper.svg",
  "/image/icon-spock.svg",
  "/image/icon-rock.svg",
  "/image/icon-lizard.svg"
];

let index = 0;
let efeito;
let escolhaJogador = 0;
let rodadas = parseInt(localStorage.getItem('rodadas')) || 0;
let playerWins = parseInt(localStorage.getItem('playerWins')) || 0;
let pcWins = parseInt(localStorage.getItem('pcWins')) || 0;
let draws = parseInt(localStorage.getItem('draws')) || 0;
let rodadasws = parseInt(localStorage.getItem('rodadasws')) || 0;

document.getElementById('content-number').textContent = rodadas;
document.getElementById('player-score').textContent = playerWins;
document.getElementById('pc-score').textContent = pcWins;
document.getElementById('draw-score').textContent = draws;
document.getElementById('rodadas-score').textContent = rodadasws;

function efeitoImagem() {
  jogador.src = imagens[index];
  pc.src = imagens[index];

  index++;
  if (index === imagens.length) {
    index = 0;
  }
}

efeito = setInterval(efeitoImagem, 100); 


function select(opcao) {
  escolhaJogador = opcao; 

  game.style.display = "none";
  gameResult.style.display = "block"; 
  frase.textContent = '3';
  frase.style.fontSize = '35px';
  frase.style.marginBottom = '10px'
  botao.style.display = 'none';

  rodadas++;
    localStorage.setItem('rodadas', rodadas);
    document.getElementById('content-number').textContent = rodadas;

  rodadasws++;
    localStorage.setItem('rodadasws', rodadas);
    document.getElementById('rodadas-score').textContent = rodadas;

  document.querySelector('#player-result .inner-circle2').classList.remove('effect-behind');
  document.querySelector('#pc-result .inner-circle2').classList.remove('effect-behind');


  let tempo = setInterval(() => {
    let conometro = parseInt(frase.textContent);
    conometro--;
    frase.textContent = conometro;

    if (conometro === 0) {
      clearInterval(tempo);
      clearInterval(efeito);
      jogador.src = imagens[opcao]; 

      
      const escolhaPc = Math.floor(Math.random() * 5);
      pc.src = imagens[escolhaPc];
      
      frase.textContent = verificarResultado(escolhaJogador, escolhaPc);
      botao.style.display = 'block';
     
      const innerPlayer = document.querySelector(".jogador-choice .inner-circle2");
      const innerPc = document.querySelector(".pc-choice .inner-circle2");

            innerPlayer.classList.remove(...cores);
            innerPc.classList.remove(...cores);

            innerPlayer.classList.add(cores[escolhaJogador]);
            innerPc.classList.add(cores[escolhaPc]);

    }
  }, 1000);
}

resetScores.addEventListener('click', () => {

  playerWins = 0;
  pcWins = 0;
  draws = 0;
  rodadasws = 0;
  rodadas = 0;

  localStorage.setItem('playerWins', playerWins);
  localStorage.setItem('pcWins', pcWins);
  localStorage.setItem('draws', draws);
  localStorage.setItem('rodadasws', rodadasws);
  localStorage.setItem('rodadas', rodadas);

  document.getElementById('player-score').textContent = playerWins;
  document.getElementById('pc-score').textContent = pcWins;
  document.getElementById('draw-score').textContent = draws;
  document.getElementById('rodadas-score').textContent = rodadasws;
  document.getElementById('content-number').textContent = rodadas;
});

function verificarResultado(player, pc) {
  if (player === pc){
     document.querySelector('#player-result .inner-circle2').classList.add('effect-behind');
     document.querySelector('#pc-result .inner-circle2').classList.add('effect-behind');

     draws++;
     localStorage.setItem('draws', draws);
     document.getElementById('draw-score').textContent = draws;

     return "Empate!"
  };

  const venceDe = {
    0: [1, 4], // tesoura vence papel e lagarto
    1: [2, 3], // papel vence spock e pedra
    2: [0, 3], // spock vence tesoura e pedra
    3: [0, 4], // pedra vence tesoura e lagarto
    4: [1, 2], // lagarto vence papel e spock
  };

  if (venceDe[player].includes(pc)) {
    document.querySelector('#player-result .inner-circle2').classList.add('effect-behind');

    playerWins++;
    localStorage.setItem('playerWins', playerWins);
    document.getElementById('player-score').textContent = playerWins;

    return "Você Venceu!";
  } else {
    document.querySelector('#pc-result .inner-circle2').classList.add('effect-behind');

    pcWins++;
    localStorage.setItem('pcWins', pcWins);
    document.getElementById('pc-score').textContent = pcWins;

    return "Você Perdeu!";
  }
}


botao.addEventListener("click", () => {
  window.location.reload();
});






