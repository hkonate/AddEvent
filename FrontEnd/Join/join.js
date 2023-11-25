const deconnexionbtnn = document.querySelector(".deconnexionbtn");
let theCookie = JSON.parse(localStorage.getItem("monCookie"));
let userId = JSON.parse(localStorage.getItem("monId"));

const header = {
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("monCookie"))}`,
    "Content-type": "application/json; charset=UTF-8"
}

const handleClick = (buttonList, eventTab, eventModifyBtn, eventSuppBtn) => {
    for (let i = 0; i < buttonList.length; i++){
        if(userId === eventTab[i].creator.id){
            // console.log("creator");
            buttonList[i].classList.add('hideForReal');
        };
        let checkIfUserIsParticipating = eventTab[i].listOfAttendees.map(ligne => Object.values(ligne).toString()).includes(userId)
        buttonList[i].addEventListener('click', () => {
            if (checkIfUserIsParticipating){
                try {
                    fetch(`https://social-gather-production.up.railway.app/event/${eventTab[i].id}/false`,{
                        method: "PUT",
                        headers: header
                    })
                    .then(response => response.json())
                    .then(
                        buttonList[i].innerText = "je participe",
                        buttonList[i].style.backgroundColor = "blue",
                        console.log("tu es dans la requete de suppression"))
                    .then(json => {
                        console.log(json);
                        checkIfUserIsParticipating = json.listOfAttendees.map(attendees => Object.values(attendees).toString()).includes(userId)
                        console.log(checkIfUserIsParticipating);
                    })
                } catch (error) {
                    console.log(error.message);
                }
            } else {
                try {
                    fetch(`https://social-gather-production.up.railway.app/event/${eventTab[i].id}/true`,{
                        method: "PUT",
                        headers: header
                    })
                    .then(response => response.json())
                    .then(
                        buttonList[i].innerText = "je ne veux plus participer",
                        buttonList[i].style.backgroundColor = "red",
                        console.log("tu es dans la requete de participation"))
                    .then(json => {
                        console.log(json);
                        checkIfUserIsParticipating = json.listOfAttendees.map(attendees => Object.values(attendees).toString()).includes(userId)
                        console.log(checkIfUserIsParticipating);
                    })
                } catch (error) {
                    console.log(error.message);
                }
            }
        })
    } 
for (let j = 0; j < eventSuppBtn.length; j++){
    if(userId != eventTab[j].creator.id){
        eventSuppBtn[j].classList.add('hideForReal');
    }
    eventSuppBtn[j].addEventListener('click', () => {
        console.log("tu es dans le listener");
            console.log(eventTab[j].creator.id);
            try {
            fetch(`https://social-gather-production.up.railway.app/event/${eventTab[j].id}`, {
                method: "DELETE",
                headers: header
            })
            .then(response => response.json())
            .then(json => {
                console.log("suppression d'évènement réussie"),
                console.log(json)
            })
            } catch (error) {
                console.log(error.message);
                console.log("suppression d'évènement non réussie");
            }
        
    })
}
for(let k = 0; k < eventModifyBtn.length; k++){
    if(userId != eventTab[k].creator.id){
        eventModifyBtn[k].classList.add('hideForReal');
    }
}
    eventModifyBtn[k].addEventListener('click', () => {
        
    })
}

try {

    fetch("https://social-gather-production.up.railway.app/event",{
        method: "GET",
        headers: header
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        // title.innerHTML += `<p>${json[0].title}</p>`;
        // place.innerHTML += `<p>${json[0].place}</p>`;
        // date.innerHTML += `<p>${str2}</p>`;
        // time.innerHTML += `<p>${str}</p>`;
        let buttonList
        let eventModify
        let eventSuppr
        const eventsContainer = document.querySelector(".event");
            for(let i = 0; i < json.length; i++){
                const tab = json[i].schedule.split("T");
                const tab3 = tab[0].split("-").reverse();
                const str2 = tab3.join("/");
                const tab2 = tab[1].split(":");
                const str = tab2[0] + "h" + tab2[1];
                const eventElement = document.createElement('div');
                eventElement.innerHTML = `
                <div class="container">
                    <div class="event-box">
                        <h2>Titre:</h2>
                        <p>${json[i].title}</p>
                    </div>
                    <div class="event-box">
                        <h2>Lieu:</h2>
                        <p>${json[i].address}</p>
                    </div>
                    <div class="event-box">
                        <h2>Date:</h2>
                        <p>${str2}</p>
                    </div>
                    <div class="event-box">
                        <h2>Heure:</h2>
                        <p>${str}</p>
                    </div>
                    <div class="event-box">
                        <h2>Description:</h2>
                        <p>${json[i].description}</p>
                    </div>
                    <div class="event-box">
                        <h2>Inclusivité:</h2>
                        <p>${json[i].inclusive}</p>
                    </div>
                    <div class="eventSuppr">
                        <button class="the-btn">supprimer l'évènement</button>
                    </div>
                    <div class="eventmodify">
                        <button class="the-btn">modifier l'évènement</button>
                    </div>
                    <div class="my-ipt">
                        <button class="the-btn">Je participe</button>
                    </div>
                </div>`;
            eventsContainer.appendChild(eventElement);
            buttonList = document.querySelectorAll(".my-ipt button");
            eventModify = document.querySelectorAll(".eventmodify");
            eventSuppr = document.querySelectorAll(".eventSuppr");
            const checkIfUserIsParticipating = json[i].listOfAttendees.map(ligne => Object.values(ligne).toString()).includes(userId)
            if(checkIfUserIsParticipating){
                buttonList[i].style.backgroundColor = 'red';
                buttonList[i].innerText = 'Je ne veux plus participer';
            } else {
                buttonList[i].style.backgroundColor = 'blue';
                buttonList[i].innerText = "Je participe";
            }
        }
        handleClick(buttonList, json, eventModify, eventSuppr);
    });
} catch (error) {
    console.log(error.message);
}



deconnexionbtnn.addEventListener('click', () => {
    localStorage.removeItem("monId");
    localStorage.removeItem("monCookie");
    console.log("you are in deconnexion button");
    window.location = "../mainomain/mainomain.html";
});