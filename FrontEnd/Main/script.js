const leftAndRight = document.querySelectorAll(".container>div");


for (const div of leftAndRight){
    div.addEventListener("click", (event)=>{
        if (div.classList[1] === "left"){
             window.location = "../Join/join.html"
        } else if (div.classList[1] === "right"){
            window.location = "../Create/create.html"
        }
       
    })
}