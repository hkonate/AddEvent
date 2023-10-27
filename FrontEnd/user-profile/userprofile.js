const homeBtn = document.querySelector(".home-page-btn");
const validBtn = document.querySelector(".modifbtn");
const hideBtn = document.querySelectorAll(".hide");
const valuesToDisplay = document.querySelectorAll(".description-value, .lname-value, .fname-value, .age-value, .interest-value");
let changesApplied = false;
const deconnectionBtn = document.querySelector(".deconnexionbtn");

deconnectionBtn.addEventListener("click", () => {
    localStorage.removeItem("monCookie")
    window.location = "../mainomain/mainomain.html";
})

homeBtn.addEventListener('click', () => {
    window.location = "../Main/index.html";
});

validBtn.addEventListener('click', () => {
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
});

if(localStorage.getItem("monCookie") === null){
    window.location = "../mainomain/mainomain.html";
};