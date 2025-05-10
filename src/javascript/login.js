const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const sucesso = document.getElementById("sucesso");
const mensagem = document.getElementById("mensagem");
const toggleMsg = document.getElementById("toggle-msg");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const copiarSenha = document.getElementById("copiar-senha");

let isLoginMode = true; // Modo atual: Login ou Cadastro

form.addEventListener("submit", (event) => {
  event.preventDefault();
  isLoginMode ? processLogin() : processCadastro();
});

toggleLink.addEventListener("click", () => {
  isLoginMode = !isLoginMode;

  // Alterna o modo
  formTitle.textContent = isLoginMode ? "Login" : "Cadastro";
  submitBtn.textContent = isLoginMode ? "Entrar" : "Cadastrar";
  toggleMsg.innerHTML = isLoginMode
    ? `Não tem conta? <a href="#" id="toggle-link">Cadastre-se</a>`
    : `Já tem conta? <a href="#" id="toggle-link">Entrar</a>`;


  // Atualiza o listener novamente (porque o link foi recriado)
  document.getElementById("toggle-link").addEventListener("click", (e) => {
    e.preventDefault();
    toggleLink.click();
  });

  mensagem.textContent = "";

});

function processCadastro() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === "" || passwordValue === "") {
    mensagem.textContent = "Preencha todos os campos para cadastrar.";
    return;
  }

  if (passwordValue.length < 6) {
    mensagem.textContent = "A senha deve ter no mínimo 6 caracteres.";
    return;
  }

  localStorage.setItem("usuarioEmail", emailValue);
  localStorage.setItem("usuarioSenha", passwordValue);

  mensagem.style.color = "#00ff88";
  mensagem.textContent = "Cadastro realizado com sucesso! Agora faça login.";

  password.value = '';

  // Muda automaticamente para o modo login
  setTimeout(() => {
    toggleLink.click();
  }, 1500);
}

function processLogin() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  const savedEmail = localStorage.getItem("usuarioEmail");
  const savedPassword = localStorage.getItem("usuarioSenha");

  if (emailValue === savedEmail && passwordValue === savedPassword) {
    form.style.display = "none";
    sucesso.classList.remove("oculto");
    sucesso.classList.add("visivel");
  } else {
    mensagem.style.color = "red";
    mensagem.textContent = "Email ou senha incorretos.";
  }
}
// Gerar senha forte
document.getElementById("gerar-senha").addEventListener("click", () => {
  const novaSenha = gerarSenhaForte(12);
  password.value = novaSenha;
  avaliarForcaSenha(novaSenha);
});

function gerarSenhaForte(tamanho) {
  const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const simbolos = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const tudo = letrasMaiusculas + letrasMinusculas + numeros + simbolos;
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const randomIndex = Math.floor(Math.random() * tudo.length);
    senha += tudo[randomIndex];
  }
  return senha;
}

// Copiar senha
copiarSenha.addEventListener("click", () => {
  const senha = document.getElementById("password").value;

  if (senha === "") return; // evita copiar vazio

  navigator.clipboard.writeText(senha).then(() => {
    copiarSenha.textContent = "Senha copiada";
    copiarSenha.style.opacity ="0.5"

    // Volta para "Copiar" depois de 2 segundos
    setTimeout(() => {
      copiarSenha.textContent = "Copiar";
       copiarSenha.style.opacity ="1"
    }, 2000);
  });
});
// Mostrar/ocultar senha
document.getElementById("toggle-visibilidade").addEventListener("click", () => {
  const tipo = password.getAttribute("type");
  password.setAttribute("type", tipo === "password" ? "text" : "password");
});

// Força da senha (em tempo real)
password.addEventListener("input", () => {
  avaliarForcaSenha(password.value);
});

/*function avaliarForcaSenha(senha) {
  const forcaBar = document.getElementById("forca-senha");
  let forca = 0;

  if (senha.length >= 6) forca++;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[a-z]/.test(senha)) forca++;
  if (/[0-9]/.test(senha)) forca++;
  if (/[\W_]/.test(senha)) forca++;

  let cor = "", texto = "";
  switch (forca) {
    case 0:
    case 1:
      cor = "red";
      texto = "Fraca";
      break;
    case 2:
    case 3:
      cor = "orange";
      texto = "Média";
      break;
    case 4:
    case 5:
      cor = "green";
      texto = "Forte";
      break;
  }

  forcaBar.textContent = `Força: ${texto}`;
  forcaBar.style.color = cor;
  forcaBar.style.marginTop = "50px"
} */
