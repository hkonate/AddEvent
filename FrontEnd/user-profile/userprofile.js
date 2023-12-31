const homeBtn = document.querySelector(".home-page-btn");
const validBtn = document.querySelector(".modifbtn");
const hideBtn = document.querySelectorAll(".hide");
let descriptionV = document.querySelector(".description-value");
const userProfilePic = document.querySelector(".userProfilePicture");
const userProfileInput = document.querySelector(".userProfileInput")
const pseudoV = document.querySelector(".pseudo-value");
const bioInput = document.querySelector(".presentation-of-user");
const pseudoInput = document.querySelector(".pseudoo");
const hobbiesInput = document.querySelector(".interest");
const interestV = document.querySelector(".interest-value");
const valuesToDisplay = document.querySelectorAll(".description-value, .pseudo-value, .interest-value, .userProfilePicture");
const descriptionValueee = document.querySelector(".description-value").value;
let changesApplied = false;
const deconnectionBtn = document.querySelector(".deconnexionbtn");
const myEventBtn = document.querySelector(".myEvent");
const theUserId = JSON.parse(localStorage.getItem("monId"));
const mytoken = JSON.parse(localStorage.getItem("monCookie"));
let selectedfile;
 
userProfileInput.addEventListener('change', (event) => {
    selectedfile = event.target.files[0];
})

deconnectionBtn.addEventListener("click", () => {
    
    localStorage.removeItem("monCookie");
    localStorage.removeItem("monId");
    setTimeout(function(){
        location.reload();
    }, 1000)
})

homeBtn.addEventListener('click', () => {
    window.location = "../Main/index.html";
});

validBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(document.getElementById("form"));
    formData.append("bio", bioInput.value);
    if(selectedfile){
        formData.append("file", selectedfile);
    }
    formData.append("hobbies", hobbiesInput.value);

    if (!changesApplied) {
        valuesToDisplay.forEach((value, index) => {
            value.textContent = hideBtn[index].value;
            value.classList.add('visibles');
        });
        hideBtn.forEach((element) => {
            element.classList.remove('hide');
        })
        validBtn.textContent = "Valider mes changements";
        changesApplied = true;
    } else {
        valuesToDisplay.forEach((value, index) => {
            value.textContent = hideBtn[index].value;
            value.classList.remove('visibles');
        });
        hideBtn.forEach((element) => {
            element.classList.add('hide');
        })
        validBtn.textContent = "Modifier mon profil";
        changesApplied = false;
        
        try {
        fetch(`https://social-gather-production.up.railway.app/profile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${mytoken}`,
            },
            body: formData
    })
    .then(response => response.json())
    .then(json => 
        console.log(json),
        setTimeout(function(){
            location.reload();
        }, 3000)
    )
    } catch (error) {
        console.log(error.message);
    }
    }    
});

try {
    fetch(`https://social-gather-production.up.railway.app/profile/${theUserId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${mytoken}`,
            "Content-type": "application/json; charset=UTF-8"
        },
    })
    .then(response => response.json())
    .then(json => {
        console.log("contenu de la reponse ", json);
        descriptionV.innerText = json.bio;
        interestV.innerText = json.hobbies;
        bioInput.value = json.bio;
        hobbiesInput.value = json.hobbies;
        userProfilePic.src = json.picture;
        if (json.picture) {
            userProfileInput.classList.add('hide');
            userProfilePic.src = json.picture;
        } else {
            userProfileInput.classList.remove('hide');
        }
    })
} catch (error) {
    console.log("il y'a une erreur");
    console.log(error.message);
}


if(localStorage.getItem("monCookie") === null){
    window.location = "../mainomain/mainomain.html";
};
