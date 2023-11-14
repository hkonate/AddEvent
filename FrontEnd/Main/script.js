const leftAndRight = document.querySelectorAll(".container>div");
const deconnectionBtn = document.querySelector(".deconnexionbtn");
const userProfileDirection = document.querySelector(".profil-direction");


for (const div of leftAndRight){
    div.addEventListener("click", (event)=>{
        if (div.classList[1] === "left"){
            window.location = "../Join/join.html"
        } else if (div.classList[1] === "right"){
            window.location = "../Create/create.html"
        }
       
    })
};

deconnectionBtn.addEventListener("click", () => {
    localStorage.removeItem("monCookie")
    window.location = "../mainomain/mainomain.html";
})

if(localStorage.getItem("monCookie") === null){
    window.location = "../mainomain/mainomain.html";
}

console.log(localStorage.getItem("monCookie"));

userProfileDirection;addEventListener('click', () => {
    window.location = "../user-profile/userprofile.html";
})