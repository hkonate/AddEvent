const deconnexionbtnn = document.querySelector(".deconnexionbtn");
let theCookie = JSON.parse(localStorage.getItem("monCookie"));
let userId = JSON.parse(localStorage.getItem("monId"));
const myModifyBtn = document.querySelector(".modify-btn");
let changes = false;
let buttonListe;
let eventModify;
let eventSuppr;
let container;
let placeInfo;
let dateInfo;
let timeInfo;
let descriptionInfo;
let picInfo;
let inclusiveInfo;
let categoryInfo;
let btnForImageNotHide;
let imageOfEveryEvent;

// let checkBoxChecked;

const header = {
  Authorization: `Bearer ${JSON.parse(localStorage.getItem("monCookie"))}`,
  "Content-type": "application/json; charset=UTF-8",
};

const handleClick = (
  buttonList,
  eventTab,
  eventModifyBtn,
  eventSuppBtn,
  titleOfEvent,
  btnForImage
) => {
  for (let i = 0; i < buttonList.length; i++) {
    if (userId === eventTab[i].creator.id) {
      // console.log("creator");
      buttonList[i].classList.add("hideForReal");
    }
    let checkIfUserIsParticipating = eventTab[i].listOfAttendees
      .map((ligne) => Object.values(ligne).toString())
      .includes(userId);
    buttonList[i].addEventListener("click", (event) => {
      event.preventDefault();
      if (checkIfUserIsParticipating) {
        try {
          fetch(
            `https://social-gather-production.up.railway.app/event/${eventTab[i].id}/false`,
            {
              method: "PUT",
              headers: header,
            }
          )
            .then((response) => response.json())
            .then(
              (buttonList[i].innerText = "je participe"),
              (buttonList[i].style.backgroundColor = "blue"),
              console.log("tu es dans la requete de suppression")
            )
            .then((json) => {
              console.log(json);
              checkIfUserIsParticipating = json.listOfAttendees
                .map((attendees) => Object.values(attendees).toString())
                .includes(userId);
              console.log(checkIfUserIsParticipating);
            });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          fetch(
            `https://social-gather-production.up.railway.app/event/${eventTab[i].id}/true`,
            {
              method: "PUT",
              headers: header,
            }
          )
            .then((response) => response.json())
            .then(
              (buttonList[i].innerText = "je ne veux plus participer"),
              (buttonList[i].style.backgroundColor = "red"),
              console.log("tu es dans la requete de participation")
            )
            .then((json) => {
              console.log(json);
              checkIfUserIsParticipating = json.listOfAttendees
                .map((attendees) => Object.values(attendees).toString())
                .includes(userId);
              console.log(checkIfUserIsParticipating);
            });
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  }
  for (let j = 0; j < eventSuppBtn.length; j++) {
    if (userId != eventTab[j].creator.id) {
      eventSuppBtn[j].classList.add("hideForReal");
    }
    eventSuppBtn[j].addEventListener("click", (event) => {
      console.log("hello");
      event.preventDefault();
      try {
        fetch(
          `https://social-gather-production.up.railway.app/event/${eventTab[j].id}`,
          {
            method: "DELETE",
            headers: header,
          }
        )
          .then((response) => response.json())
          .then((json) => {
            console.log("suppression d'évènement réussie"), console.log(json);
          });
      } catch (error) {
        console.log(error.message);
        console.log("suppression d'évènement non réussie");
      }
    });
  }

  for (let k = 0; k < eventModifyBtn.length; k++) {
    if (userId != eventTab[k].creator.id) {
      eventModifyBtn[k].classList.add("hideForReal");
    }
    eventModifyBtn[k].addEventListener("click", (event) => {
      event.preventDefault();

      const formData = new FormData(document.getElementById("myForm"));
      const myEvent = eventModifyBtn[k].parentNode;
      const myEventChildren = myEvent.children;
      // const p = myEventChildren.querySelector()
      if (!changes) {
        for (let i = 0; i < myEventChildren.length; i++) {
          const child = myEventChildren[i];
          // Vérifie si l'enfant est un <p>, si oui, remplace-le par un <input>
          if (child.children[2] && child.children[2].tagName === "P") {
            child.children[1].classList.remove("hide");
            child.children[1].value = child.children[2].textContent;
            eventModifyBtn[k].textContent = "Valider mes modifications";
            changes = true;
          }
        }
      } else {
        let myTab = [];
        for (let i = 0; i < myEventChildren.length; i++) {
          const child = myEventChildren[i];
          if (child.children[1] && child.children[1].tagName === "INPUT") {
            console.log("test 1", child.children[1]);
            myTab.push(child.children[1].value);
            // console.log("enfant", allMyChild);

            // const checkedBox =  document.querySelectorAll('input[type="checkbox"]:checked');
            // checkBoxChecked = Array.from(checkedBox).map(checkbox => {
            //     const labelOfCheckbox = document.querySelector(`label[for="${checkbox.id}"]`);
            //     return labelOfCheckbox.dataset.value;
            // });

            child.children[1].classList.add("hide");
            eventModifyBtn[k].textContent = "Modifier mon évènement";
            changes = false;
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
      if (eventModifyBtn[k].textContent === "Modifier mon évènement") {
        try {
          fetch(
            `https://social-gather-production.up.railway.app/event/${eventTab[k].id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("monCookie")
                )}`,
              },
              body: formData,
            }
          )
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              // setTimeout(function(){
              //     location.reload();
              // }, 3000)
            });
        } catch (error) {
          console.log(error.message);
          console.log("l'évènement n'a pas pu être modifié");
        }
      }
    });
  }
  for (let i = 0; i < titleOfEvent.length; i++) {
    titleOfEvent[i].addEventListener("click", (event) => {
      event.preventDefault();

      const isExpanded = container[i].style.height === "100%";
      const width = container[i].style.width === "700%";

      for (let j = 0; j < container.length; j++) {
        container[j].style.height = "4rem";
        container[j].style.width === "15rem";
        placeInfo[j].classList.remove("fadeIn");
        dateInfo[j].classList.remove("fadeIn");
        timeInfo[j].classList.remove("fadeIn");
        descriptionInfo[j].classList.remove("fadeIn");
        picInfo[j].classList.remove("fadeIn");
        inclusiveInfo[j].classList.remove("fadeIn");
        categoryInfo[j].classList.remove("fadeIn");
        eventModifyBtn[j].classList.remove("fadeIn");
        eventSuppBtn[j].classList.remove("fadeIn");
        buttonList[j].classList.remove("fadeIn");
      }

      if (userId != eventTab[i].creator.id) {
        console.log(eventTab[i].creator.id);
        eventModifyBtn[i].classList.add("hide");
      }
      if (userId === eventTab[i].creator.id) {
        buttonList[i].classList.add("hide");
      }
      container[i].style.height = isExpanded ? "4rem" : "100%";
      container[i].style.width = width ? "15rem" : "700%";
      if (!isExpanded) {
        placeInfo[i].classList.add("fadeIn");
        dateInfo[i].classList.add("fadeIn");
        timeInfo[i].classList.add("fadeIn");
        descriptionInfo[i].classList.add("fadeIn");
        picInfo[i].classList.add("fadeIn");
        if(eventTab[i].inclusive.length === 0){
          inclusiveInfo[i].classList.add('hide')
        }else{
          inclusiveInfo[i].classList.add("fadeIn");
        }
        categoryInfo[i].classList.add("fadeIn");
        eventModifyBtn[i].classList.add("fadeIn");
        eventSuppBtn[i].classList.add("fadeIn");
        buttonList[i].classList.add("fadeIn");
      }
    });
  }
  for (let i = 0; i < btnForImage.length; i++) {
    btnForImage[i].addEventListener("click", (event) => {
      event.preventDefault();
      console.log("in addevent");
      imageOfEveryEvent[i].classList.remove("hideForReal");
    });
  }
};

try {
  fetch("https://social-gather-production.up.railway.app/event", {
    method: "GET",
    headers: header,
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let eventTitle;
      const eventsContainer = document.querySelector(".event");
      for (let i = 0; i < json.length; i++) {
        const tab = json[i].schedule.split("T");
        const tab3 = tab[0].split("-").reverse();
        const str2 = tab3.join("/");
        const tab2 = tab[1].split(":");
        const str = tab2[0] + "h" + tab2[1];
        const eventElement = document.createElement("div");
        eventElement.classList.add("container");
        eventElement.innerHTML = `
                    <form id="myForm" enctype="multipart/form-data">
                        <div class="event-title">
                                <h2>Titre:</h2>
                                <input class="titleValueInput hide" id="titleValueInput" type="text"><p name="titleValue" class="titleValue">${
                                  json[i].title
                                }</p>
                        </div>
                        <div class="place">
                                <h2>Lieu:</h2>
                                <input class="locValueInput hide" type="text"><p class="locValue">${
                                  json[i].address
                                }</p>
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
                                <input class="descriptionValueInput hide" type="text"><p class="descriptionValue">${
                                  json[i].description
                                }</p>
                        </div>
                        <div class="pic">
                                <h2>Image:</h2>
                                ${json[i].images
                                  .map(
                                    (
                                      image
                                    ) => `<img class="imageOfEvent hideForReal" src="${image}" alt="image de l'event"><input class="btn-for-image" type="button" value="afficher les images"></img>
                                <input class="imageInput hide" type="file">`
                                  )
                                  .join("")}
                        </div>
                        <div class="inclusivee">
                                <h2>Inclusivité:</h2>
                                <p class="inclusivityValue">${
                                  json[i].inclusive
                                }</p>
                        </div>
                        <div class="category">
                            <h2>Catégorie:</h2>
                                <p class="categorieValue">${
                                  json[i].category
                                }</p>
                        </div>
                        <div class="eventSuppr">
                            <button class="the-btn">supprimer l'évènement</button>
                        </div>
                        <div class="eventCreator">
                          <p>Crée par : ${json[i].creator.pseudo}</p>
                        </div>
                        <div class="event-modify-btn">
                            <button class="modify-btn">Modifier mon évènement</button>
                        </div>
                        <div class="my-ipt">
                            <button class="the-btn">Je participe</button>
                        </div>
                    </form>`;
        eventsContainer.appendChild(eventElement);
        buttonListe = document.querySelectorAll(".my-ipt button");
        eventModify = document.querySelectorAll(".modify-btn");
        eventSuppr = document.querySelectorAll(".eventSuppr");
        eventTitle = document.querySelectorAll(".event-title");
        container = document.querySelectorAll(".container");
        placeInfo = document.querySelectorAll(".place");
        dateInfo = document.querySelectorAll(".date");
        timeInfo = document.querySelectorAll(".time");
        descriptionInfo = document.querySelectorAll(".descriptionnn");
        picInfo = document.querySelectorAll(".pic");
        inclusiveInfo = document.querySelectorAll(".inclusivee");
        categoryInfo = document.querySelectorAll(".category");
        btnForImageNotHide = document.querySelectorAll(".btn-for-image");
        imageOfEveryEvent = document.querySelectorAll(".imageOfEvent");
        const checkIfUserIsParticipating = json[i].listOfAttendees
          .map((ligne) => Object.values(ligne).toString())
          .includes(userId);
        if (checkIfUserIsParticipating) {
          buttonListe[i].style.backgroundColor = "red";
          buttonListe[i].innerText = "Je ne veux plus participer";
        } else {
          buttonListe[i].style.backgroundColor = "blue";
          buttonListe[i].innerText = "Je participe";
        }
      }
      handleClick(
        buttonListe,
        json,
        eventModify,
        eventSuppr,
        eventTitle,
        btnForImageNotHide
      );
    });
} catch (error) {
  console.log(error.message);
}

deconnexionbtnn.addEventListener("click", () => {
  localStorage.removeItem("monId");
  localStorage.removeItem("monCookie");
  console.log("you are in deconnexion button");
  window.location = "../mainomain/mainomain.html";
});
