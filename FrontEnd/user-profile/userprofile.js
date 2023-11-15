const homeBtn = document.querySelector(".home-page-btn");
const validBtn = document.querySelector(".modifbtn");
const hideBtn = document.querySelectorAll(".hide");
const descriptionV = document.querySelector(".description-value");
const pseudoV = document.querySelector(".pseudo-value");
const interestV = document.querySelector(".interest-value");
const valuesToDisplay = document.querySelectorAll(".description-value, .pseudo-value, .interest-value");
let changesApplied = false;
const deconnectionBtn = document.querySelector(".deconnexionbtn");

deconnectionBtn.addEventListener("click", () => {
    
    localStorage.removeItem("monCookie")
    window.location = "../mainomain/mainomain.html";
})

homeBtn.addEventListener('click', () => {
    window.location = "../Main/index.html";
});

validBtn.addEventListener('click', (event) => {
    console.log("bonjour");
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
    }
    console.log("bonjour2");

    event.preventDefault();

        if(localStorage.getItem("monCookie")){
            const mytoken = JSON.parse(localStorage.getItem("monCookie"))
            console.log(mytoken);
            try {
            fetch('https://social-gather-production.up.railway.app/profile', {
                method: "POST",

                body: JSON.stringify({
                    bio: descriptionV,
                    pseudo: pseudoV,
                    hobbies: interestV
            }),
            headers: {
                "Authorization": `Bearer ${mytoken}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if(!response.ok){
                console.log("toto");
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
        })
        } catch (error) {
            console.log(error.message);
        }
    }
});

// if(localStorage.getItem("monCookie") === null){
//     window.location = "../mainomain/mainomain.html";
// };

console.log(localStorage.getItem("monCookie"));
