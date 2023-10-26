const title = document.getElementById("text");
const place = document.querySelector(".place>input");
const date = document.querySelector(".date-time>input")
const button = document.querySelector(".my-ipt");

button.addEventListener("click",(event) => {
    
    event.preventDefault()
    console.log(title.value, place.value, date.value);
    
    try {
        
        fetch("https://social-gather-production.up.railway.app/event/create", {
    
            method: "POST",
            
            body: JSON.stringify({
                title: title.value,
                place: place.value,
                date: date.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
 
        .then(json => console.log(json));
        
    } catch (error) {
        console.log(error.message);
    }
})

if(localStorage.getItem("monCookie") === null){
    window.location = "../mainomain/mainomain.html";
};