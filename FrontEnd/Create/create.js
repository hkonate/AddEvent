const button = document.querySelector("#submit-button");
const form = document.getElementById("container");
// const deconnectionBtn = document.querySelector(".deconnexionbtn");

// deconnectionBtn.addEventListener("click", () => {
//     localStorage.removeItem("monCookie")
//     window.location = "../mainomain/mainomain.html";
// })
button.addEventListener("click", (event) =>     {
    event.preventDefault()
    const title = document.getElementById("text").value;
    const place = document.querySelector(".place input").value;
    const date = document.getElementById("dt").value;
    const eventDescriptionBtn = document.querySelector(".description-of-event input").value;
    const inclusiveBtn = document.querySelector(".inclusive-ipt").value;
    const image = document.querySelector(".image-of-event input").files[0];
    let myCookie = JSON.parse(localStorage.getItem("monCookie"));
    myCookie = `Bearer ${myCookie}`;
    // console.log(myCookie);
    // console.log(typeof title.value, place.value, date.value, eventDescriptionBtn.value, inclusiveBtn.value);
    let formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', eventDescriptionBtn);
    formdata.append('schedule', date);
    formdata.append('address', place);
    formdata.append('files', image);
    formdata.append('inclusive[]', inclusiveBtn);
    console.log(JSON.parse(localStorage.getItem("monCookie")));
    const header = {
        "Authorization": myCookie,
        }

    for (const pair of formdata.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    
    try {
        
        fetch("https://social-gather-production.up.railway.app/event", {
    
            method: "POST",
            headers: header,
            
            body: formdata,
        })
        .then(response => response.json())
        .then(data => 
            console.log(data),
            alert("L'évènement n'a pas été crée")
        )
        
        // .then(response => {
        //     if (response.ok){
        //     return response.json();
        // }else{
        //     throw new Error("Echec de la requete");
        // }})
        // .then(response => response.json())
        // .then(json => console.log(json))
        // .then(title.value = "", eventDescriptionBtn.value = "", place.value = "", date.value = "", inclusiveBtn.value = "");
        
    } catch (error) {
        console.log(error.message);
        alert("L'évènement n'a pas été crée")
    }
    
});

if(localStorage.getItem("monCookie") === null){
    window.location = "../mainomain/mainomain.html";
};

