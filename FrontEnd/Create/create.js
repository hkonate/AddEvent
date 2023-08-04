const title = document.getElementById("text");
const button = document.querySelector(".my-ipt");

button.addEventListener("click",() => {
    fetch("http://localhost:3000/event/create", {

        method: "POST",
        
        body: JSON.stringify({
            title,
        })
    })
})