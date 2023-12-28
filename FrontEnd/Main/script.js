const leftAndRight = document.querySelectorAll(".container>div");
const profilButton = document.querySelector(".profil-direction");
const deconnexionButton = document.querySelector(".deconnexionbtn");
const navBarContainer = document.querySelector('.navbar-container');
const navBarLogo = document.getElementById("navbarlogo");


for (const div of leftAndRight){
    div.addEventListener("click", (event)=>{
        if (div.classList[1] === "left"){
            window.location = "../Join/join.html"
        } else if (div.classList[1] === "right"){
            window.location = "../Create/create.html"
        }
       
    })
};

profilButton.addEventListener('click', () => {
    console.log("you are in profile button");
    window.location = "../user-profile/userprofile.html";
});

deconnexionButton.addEventListener('click', () => {
    console.log("you are in deconnexion button");
    window.location = "../mainomain/mainomain.html";
});

document.addEventListener('DOMContentLoaded', function () {
        navBarLogo.addEventListener('click', function () {
        console.log("you are in navbarlogo");
        navBarContainer.classList.toggle('visible');
        profilButton.classList.toggle('initial-hidden');
        deconnexionButton.classList.toggle('initial-hidden');
    });
});



if(localStorage.getItem("monCookie") === null || localStorage.getItem('monId') === null){
    window.location = "../mainomain/mainomain.html";
}