const form = document.getElementById("form");
const email = document.getElementById("email");

form.addEventListener("submit", (event) =>{
    event.preventDefault();

    checkForm();

})

email.addEventListener("blur", () =>{
    checkInputEmail();
})

function checkInputEmail(){
    const emailValue = email.value;

    if(emailValue === ""){
        erroInput(email, "O email é obrigatório.")
    }else{
        const formItem = email.parentElement;
        formItem.className = "form-group"
    }
}

function checkForm(){
    checkInputEmail();

    const formItem = form.querySelectorAll(".form-group");
    const isValid = [...formItem].every((item) =>{
        return item.className === ".form-group"
    });

    if(isValid){
        alert("ENVIADO COM SUCESSO!")
    }
};

function erroInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "form-group-error"
}