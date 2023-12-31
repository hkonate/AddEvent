const deconnexionbtnn = document.querySelector(".deconnexionbtn");
let theCookie = JSON.parse(localStorage.getItem("monCookie"));
let userId = JSON.parse(localStorage.getItem("monId"));
const myModifyBtn = document.querySelector(".modify-btn");
let changes = false;
let container
    
// let checkBoxChecked;

const header = {
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("monCookie"))}`,
    "Content-type": "application/json; charset=UTF-8"
}

const handleClick = (buttonList, eventTab, eventModifyBtn, eventSuppBtn, titleOfEvent) => {
    for (let i = 0; i < buttonList.length; i++){
        if(userId === eventTab[i].creator.id){
            // console.log("creator");
            buttonList[i].classList.add('hideForReal');
        };
        let checkIfUserIsParticipating = eventTab[i].listOfAttendees.map(ligne => Object.values(ligne).toString()).includes(userId)
        buttonList[i].addEventListener('click', (event) => {
            event.preventDefault();
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
    eventSuppBtn[j].addEventListener('click', (event) => {
        console.log("hello");
        event.preventDefault();
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
    eventModifyBtn[k].addEventListener('click', (event) => {
        event.preventDefault();

        const formData = new FormData(document.getElementById("myForm"));
        const myEvent = eventModifyBtn[k].parentNode;
        const myEventChildren = myEvent.children;
        // const p = myEventChildren.querySelector()
        if(!changes){
            for (let i = 0; i < myEventChildren.length; i++) {
                const child = myEventChildren[i];
                // Vérifie si l'enfant est un <p>, si oui, remplace-le par un <input>
                if (child.children[2] && child.children[2].tagName === 'P') {
                    child.children[1].classList.remove('hide');
                    child.children[1].value = child.children[2].textContent;
                    eventModifyBtn[k].textContent = "Valider mes modifications";
                    changes = true;
                }
            }

        } else {
            let myTab = [];
            for (let i = 0; i < myEventChildren.length; i++) {
                const child = myEventChildren[i];
                if (child.children[1] && child.children[1].tagName === 'INPUT'){
                    console.log("test 1",child.children[1]);
                    myTab.push(child.children[1].value);
                    // console.log("enfant", allMyChild);
                    
                    // const checkedBox =  document.querySelectorAll('input[type="checkbox"]:checked');
                    // checkBoxChecked = Array.from(checkedBox).map(checkbox => {
                    //     const labelOfCheckbox = document.querySelector(`label[for="${checkbox.id}"]`);
                    //     return labelOfCheckbox.dataset.value;
                    // });

                    child.children[1].classList.add('hide');
                    eventModifyBtn[k].textContent = "Modifier mon évènement";
                    changes = false
                }
                // Vérifie si l'enfant est un <input>, si oui, remplace-le par un <p>
            } 
                    formData.append("title", myTab[0]);
                    formData.append("address", myTab[1]);
                    formData.append("description", myTab[2]);
                    // for(let i = 0; i < checkBoxChecked.length; i++){
                    //     console.log(checkBoxChecked[i]);
                    //     formData.append("inclusive[]", checkBoxChecked[i]);
                    // }
        }
        if(eventModifyBtn[k].textContent === "Modifier mon évènement"){
            try {
                fetch(`https://social-gather-production.up.railway.app/event/${eventTab[k].id}`, {
                    method: "PUT",
                    headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("monCookie"))}`},
                    body: formData
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    // setTimeout(function(){
                    //     location.reload();
                    // }, 3000)
                })
            } catch (error) {
                console.log(error.message);
                console.log("l'évènement n'a pas pu être modifié");
            }
        }
    })
}
for (let i = 0; i < titleOfEvent.length; i++) {
    titleOfEvent[i].addEventListener('click', (event) => {
        event.preventDefault();
        console.log(container[i]);
        container[i].style.height = '1100px';
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
        let buttonList
        let eventModify
        let eventSuppr
        let eventTitle
        const eventsContainer = document.querySelector(".event");
            for(let i = 0; i < json.length; i++){
                const tab = json[i].schedule.split("T");
                const tab3 = tab[0].split("-").reverse();
                const str2 = tab3.join("/");
                const tab2 = tab[1].split(":");
                const str = tab2[0] + "h" + tab2[1];
                const eventElement = document.createElement('div');
                eventElement.classList.add('container')
                eventElement.innerHTML = `
                    <form id="myForm" enctype="multipart/form-data">
                        <div class="event-title">
                            
                                <h2>Titre:</h2>
                                <input class="titleValueInput hide" id="titleValueInput" type="text"><p name="titleValue" class="titleValue">${json[i].title}</p>
                            
                        </div>
                        <div class="place">
                            
                                <h2>Lieu:</h2>
                                <input class="locValueInput hide" type="text"><p class="locValue">${json[i].address}</p>
                            
                        </div>
                        <div class="date">
                            
                                <h2>Date:</h2>
                                <p class="dateValue">${str2}</p>
                            
                        </div>
                        <div class="time">
                            
                                <h2>Heure:</h2>
                                <p class="timeValue">${str}</p>
                            
                        </div>
                        <div class="descriptionnn">
                            
                                <h2>Description:</h2>
                                <input class="descriptionValueInput hide" type="text"><p class="descriptionValue">${json[i].description}</p>
                            
                        </div>
                        <div class="pic">
                            
                                <h2>Image:</h2>
                                ${json[i].images.map(image => `<img class="imageOfEvent" src="${image}" alt="image de l'event"></img>
                                <input class="imageInput hide" type="file">`).join("")}
                            
                        </div>
                        <div class="inclusivee">
                            
                                <h2>Inclusivité:</h2>
                                <p class="inclusivityValue">${json[i].inclusive}</p>
                            
                        </div>
                        <div class="category">
                            
                                <h2>Catégorie:</h2>
                                <p class="categorieValue">${json[i].category}</p>
                            
                        </div>
                        <div class="eventSuppr">
                            <button class="the-btn">supprimer l'évènement</button>
                        </div>
                            <button class="modify-btn">Modifier mon évènement</button>
                        <div class="my-ipt">
                            <button class="the-btn">Je participe</button>
                        </div>
                    </form>`;
            eventsContainer.appendChild(eventElement);
            buttonList = document.querySelectorAll(".my-ipt button");
            eventModify = document.querySelectorAll(".modify-btn");
            eventSuppr = document.querySelectorAll(".eventSuppr");
            eventTitle = document.querySelectorAll(".event-title");
            container = document.querySelectorAll(".container");
            const checkIfUserIsParticipating = json[i].listOfAttendees.map(ligne => Object.values(ligne).toString()).includes(userId)
            if(checkIfUserIsParticipating){
                buttonList[i].style.backgroundColor = 'red';
                buttonList[i].innerText = 'Je ne veux plus participer';
            } else {
                buttonList[i].style.backgroundColor = 'blue';
                buttonList[i].innerText = "Je participe";
            }
        }
        handleClick(buttonList, json, eventModify, eventSuppr, eventTitle);
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