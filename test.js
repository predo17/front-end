// Inicialize o EmailJS com seu User ID
emailjs.init("fA8H•••••••••••••••••"); // Substitua pelo seu User ID do EmailJS

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Valida se todos os campos estão preenchidos
    if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Parâmetros para o EmailJS
    const templateParams = {
        name: name,
        email: email,
        message: message
    };

    // Envia o e-mail
    emailjs.send("fA8H•••••••••••••••••", "template_ftydbfi", templateParams)
        .then(function (response) {
            alert("Mensagem enviada com sucesso!");
            document.getElementById("contact-form").reset(); // Limpa o formulário
        }, function (error) {
            alert("Erro ao enviar a mensagem: " + JSON.stringify(error));
        });
});