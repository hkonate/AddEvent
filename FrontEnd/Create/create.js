const title = document.getElementById("text");
const place = document.querySelector(".place>input");
const date = document.querySelector(".date-time>input")
const button = document.querySelector(".my-ipt");
const deconnectionBtn = document.querySelector(".deconnexionbtn");
const eventDescriptionBtn = document.querySelector(".ipt-of-event-description");
const inclusiveBtn = document.querySelector(".inclusive-ipt");

deconnectionBtn.addEventListener("click", () => {
    localStorage.removeItem("monCookie")
    window.location = "../mainomain/mainomain.html";
})

button.addEventListener("click",(event) => {
    
    event.preventDefault()
    let myCookie = JSON.parse(localStorage.getItem("monCookie"));
    myCookie = `Bearer ${myCookie}`;
    console.log(myCookie);
    console.log(title.value, place.value, date.value, eventDescriptionBtn.value, inclusiveBtn.value);
    console.log(JSON.parse(localStorage.getItem("monCookie")));
    const header = {
        "Authorization": `${myCookie}`,
        "Content-type": "application/json; charset=UTF-8"
        }
    
    try {
        
        fetch("https://social-gather-production.up.railway.app/event", {
    
            method: "POST",
            headers: header,
            
            body: JSON.stringify({
                title: title.value,
                description: eventDescriptionBtn.value,
                address: place.value,
                schedule: date.value,
                inclusive: [inclusiveBtn.value]
            }),
        }).then(response => {
            if (response.ok){
            alert("L'évènement a bien été crée");
        }})
        .then(response => response.json())
        .then(json => console.log(json))
        .then(title.value = "", eventDescriptionBtn.value = "", place.value = "", date.value = "", inclusiveBtn.value = "");
        
    } catch (error) {
        console.log(error.message);
        alert("L'évènement n'a pas été crée")
    }
});

if(localStorage.getItem("monCookie") === null){
    window.location = "../mainomain/mainomain.html";
};

