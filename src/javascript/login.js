const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");


form.addEventListener("submit", (event) =>{
    event.preventDefault();

    checkForm();
})

email.addEventListener("blur", () =>{
    checkInputEmail()
})
password.addEventListener("blur", () =>{
    checkInputpassword()
})
function checkInputEmail(){
    const emailValue = email.value;

    if(emailValue === ""){
        erroInput(email, "O eamil é obrigatório.")
    }else{
        const formItem = email.parentElement;
        formItem.className = "input-box"
    }
}
function checkInputpassword(){
    const passwordValue = password.value;

    if(passwordValue === ""){
        erroInput(password, "A senha é obrigatória")
    }else if(passwordValue.lenght < 6){
        erroInput(password, "No mínimo 6 caracteres.")
    }else{
        const formItem = password.parentElement;
        formItem.className = "input-box"
    }
}

function checkForm(){
    checkInputEmail();
    checkInputpassword();

    const formItem = form.querySelectorAll(".input-box")
    const isValid = [...formItem].every((item) =>{
        return item.className === "input-box"
    });

    if(isValid){
        alert("CADASTRADO COM SUCESSO!")
    }

    console.log(isValid)
}

function erroInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "input-box error"
}