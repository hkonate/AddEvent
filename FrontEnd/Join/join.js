const deconnexionbtnn = document.querySelector(".deconnexionbtn");
let theCookie = JSON.parse(localStorage.getItem("monCookie"));
let theId = JSON.parse(localStorage.getItem("monId"));

const header = {
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("monCookie"))}`,
    "Content-type": "application/json; charset=UTF-8"
}

const handleClick = (buttonList, eventTab) => {
    for (let i = 0; i < buttonList.length; i++){
        if(theId === eventTab[i].creator.id){
            // console.log("creator");
            buttonList[i].classList.add('hideForReal');
        };
        let checkIfUserIsParticipating = eventTab[i].listOfAttendees.map(ligne => Object.values(ligne).toString()).includes(theId)
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
                        checkIfUserIsParticipating = json.listOfAttendees.map(attendees => Object.values(attendees).toString()).includes(theId)
                        console.log(checkIfUserIsParticipating);
                    })
                    // .then(window.location = "./join.html") 
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
                        checkIfUserIsParticipating = json.listOfAttendees.map(attendees => Object.values(attendees).toString()).includes(theId)
                        console.log(checkIfUserIsParticipating);
                    })
                    // .then(window.location = "./join.html")
                } catch (error) {
                    console.log(error.message);
                }
            }
        })
    } 
}

try {

    fetch("https://social-gather-production.up.railway.app/event",{
        method: "GET",
        headers: header
    })
    .then(response => response.json())
    .then(json => {
        // console.log(json);
        // title.innerHTML += `<p>${json[0].title}</p>`;
        // place.innerHTML += `<p>${json[0].place}</p>`;
        // date.innerHTML += `<p>${str2}</p>`;
        // time.innerHTML += `<p>${str}</p>`;
        let buttonList
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
                        <h2>Unclusivité:</h2>
                        <p>${json[i].inclusive}</p>
                    </div>
                    <div class="my-ipt">
                        <button class="the-btn">Je participe</button>
                    </div>
                </div>`;
            eventsContainer.appendChild(eventElement);
            buttonList = document.querySelectorAll(".my-ipt button");
            const checkIfUserIsParticipating = json[i].listOfAttendees.map(ligne => Object.values(ligne).toString()).includes(theId)
            console.log(checkIfUserIsParticipating);
            // console.log(checkIfUserIsParticipating);
            if(checkIfUserIsParticipating){
                // console.log(checkIfUserIsParticipating);
                buttonList[i].style.backgroundColor = 'red';
                buttonList[i].innerText = 'Je ne veux plus participer';
            } else {
                buttonList[i].style.backgroundColor = 'blue';
                buttonList[i].innerText = "Je participe";
            }
        }
        handleClick(buttonList, json);
    });
} catch (error) {
    console.log(error.message);
}



deconnexionbtnn.addEventListener('click', () => {
    console.log("you are in deconnexion button");
    window.location = "../mainomain/mainomain.html";
});



// const enter = (event) =>{
//     if(event.keyCode === 13){
//         button.click()
//     }
// }

// input.addEventListener("keypress", enter)


// try {
//     fetch("http://localhost:3000/events" )
//     .then(response => response.json())
//     .then(json => {
//         const events = json;

//         const eventsContainer = document.querySelector(".container");

//         events.forEach(event => {
//             const eventElement = document.createElement('div');
//             eventElement.innerHTML = `
//             titre: ${json[0].title}
//             Lieu: ${json[0].place}
//             Date: ${str2}
//             `;
//             eventsContainer.appendChild(eventElement);
//         })
//     })
// } catch (error) {
    
// }

