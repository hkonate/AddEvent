const button = document.querySelector("#submit-button");
const form = document.getElementById("container");
// const deconnectionBtn = document.querySelector(".deconnexionbtn");
const restaurantSelect = document.getElementById('restaurant');
const inclusiveInput = document.querySelector(".inclusive-iptt");
const mySelector = document.getElementById("listOfCategory");

// deconnectionBtn.addEventListener("click", () => {
//     localStorage.removeItem("monCookie")
//     window.location = "../mainomain/mainomain.html";
// })

mySelector.addEventListener('change', () => {
    if(mySelector.value === "RESTAURANT"){
        inclusiveInput.classList.remove('hide');
    }else{
        inclusiveInput.classList.add('hide');
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const addImageButton = document.getElementById("add-img-button");
    addImageButton.addEventListener("click", function (event) {
        event.preventDefault();  // Empêcher le rechargement de la page par défaut
        addImageInput();
        console.log(mySelector.value);
    });
});

// Fonction pour ajouter un nouveau champ d'entrée d'image
function addImageInput() {
    const imageContainer = document.querySelector(".image-of-event");

    // Création d'un nouvel élément input de type fichier
    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.accept = "image/*";
    newInput.className = "ipt-of-event-image";
    newInput.multiple = true;

    // Ajout du nouvel élément à la fin du conteneur des images
    imageContainer.appendChild(newInput);
}


button.addEventListener("click", async (event) =>     {
    event.preventDefault()
    const title = document.getElementById("text").value;
    const place = document.querySelector(".place input").value;
    const date = document.getElementById("dt").value;

    await new Promise(resolve => setTimeout(resolve, 100));

    const checkedBox =  document.querySelectorAll('input[type="checkbox"]:checked');
    const checkBoxChecked = Array.from(checkedBox).map(checkbox => {
        const labelOfCheckbox = document.querySelector(`label[for="${checkbox.id}"]`);
        return labelOfCheckbox.dataset.value;
    });
    console.log(checkBoxChecked);
    const eventDescriptionBtn = document.querySelector(".description-of-event input").value;
    const images = document.querySelectorAll(".ipt-of-event-image");

    const filesArray = [];

    images.forEach((input) => {
        const files = input.files;
        for(let i = 0; i < files.length; i++){
            filesArray.push(files[i]);
        }
    })

    let myCookie = JSON.parse(localStorage.getItem("monCookie"));
    myCookie = `Bearer ${myCookie}`;
    // console.log(myCookie);
    // console.log(typeof title.value, place.value, date.value, eventDescriptionBtn.value, inclusiveBtn.value);
    let formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', eventDescriptionBtn);
    formdata.append('schedule', date);
    formdata.append('address', place);
    formdata.append('category', mySelector.value);
    for(let i = 0; i < filesArray.length; i++){
        console.log(filesArray[i]);
        formdata.append(`files`, filesArray[i]);
    }
    const inclusiveFormDataKey = "inclusive[]";
    for(let i = 0; i < checkBoxChecked.length; i++){
        formdata.append(inclusiveFormDataKey, checkBoxChecked[i]);
    }
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
            alert("L'évènement a bien été crée")
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

