const connectionButton = document.querySelector(".connection-btn");
const lockLogo = document.getElementById("locklogo");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const gotomain = document.querySelector(".gotomain");

const seePassword = () => {
    const passwordCheck = document.getElementById("passwordInput");

    if (passwordCheck.type === "password"){
        passwordCheck.type = "text";
        lockLogo.name = "lock-open-outline";
    } else {
        passwordCheck.type = "password";
        lockLogo.name = "lock-closed-outline";
    }
};

gotomain.addEventListener("click", () => {
    window.location = "../main/index.html";
    console.log("tu vvas dans le main");
})

connectionButton.addEventListener('click', (event) => {
    event.preventDefault();

    try{
        fetch('https://social-gather-production.up.railway.app/auth/signin', {
            method: "POST",

            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response =>{
                if(!response.ok){
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                console.log(text);
                localStorage.setItem('monCookie', text);
            })
            .then(data => {
                window.location = "../main/index.html";
            })
    }catch (error) {
        console.log(error.message);
    }
});