const leftAndRight = document.querySelectorAll(".container>div");
const deconnectionBtn = document.querySelector(".deconnexionbtn");


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