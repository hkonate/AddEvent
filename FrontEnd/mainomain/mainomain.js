const connectionButton = document.querySelector(".connection-btn");
const lockLogo = document.getElementById("locklogo");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const gotomain = document.querySelector(".gotomain");

if(localStorage.getItem('monCookie') && localStorage.getItem('monId')){
    console.log('redirection');
    window.location = '../main/index.html';
}

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
                return response.json();
            })
            .then(json => {
                localStorage.setItem('monCookie', JSON.stringify(json.authTokens[json.authTokens.length -1]));
                localStorage.setItem('monId', JSON.stringify(json.id));
                console.log(JSON.parse(localStorage.getItem("monCookie")));
                console.log(JSON.parse(localStorage.getItem("monId")));
            })
            .then(data => {
                window.location = "../profilecreation/profilecreation.html";
            })
            .catch(error => {
                console.error(error.message);
            });
    }catch (error) {
        console.log(error.message);
    }
});