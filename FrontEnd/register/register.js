const lname = document.querySelector(".nomm");
const fname = document.querySelector(".prenomm");
const pseudo = document.querySelector(".pseudoo");
const phone = document.querySelector(".phonee");
const email = document.querySelector(".emaill");
const password = document.querySelector(".mdpp");
const passwordConfirm = document.querySelector(".mdpconfirmm");
const validationBtn = document.querySelector(".validation-btn");
const nomErrorMessage = document.getElementById("nom-error-message");

let thePassword = password.value;
let passwordConfirmation = passwordConfirm.value;

const validPassword = () => {
    let thePassword = password.value;
    let passwordConfirmation = passwordConfirm.value;

    if (thePassword.legnth < 8){
        console.log("c'est trop petit");
        return false;
    }
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    if (!uppercaseRegex.test(thePassword) || !lowercaseRegex.test(thePassword) || !digitRegex.test(thePassword) || !specialCharRegex.test(thePassword)){
        console.log("toute les conditions ne sont pas remplis");
        return false;
    }
    if (thePassword !== passwordConfirmation){
        console.log("votre mot de passe de correspond pas");
        return false;
    }
    console.log("tout est ok bien joué !");
    return true;

    
}


const verifyForm = (str, errorMessageElement) =>{
    console.log("tu es bien ici");
    let newStr = str.trim();
    if (newStr == null || newStr === ""){
        errorMessageElement.textContent = "Ce champ est requis";
        console.log("tu es dans le if");
        return false;
    }
    // errorMessageElement.textContent = "";
    return true;
};

validationBtn.addEventListener('click',(event) => {
    event.preventDefault();
    console.log(lname.value, fname.value, pseudo.value, phone.value, email.value, password.value, passwordConfirm.value);

    const isPasswordValid = validPassword();
    const isLnameValid = verifyForm(lname.value, nomErrorMessage);
    const isFnameValie = verifyForm(fname.value);
    const isPseudoValid = verifyForm(pseudo.value);
    const isPhoneValid = verifyForm(phone.value);
    const isEmailValid = verifyForm(email.value);

    if (isPasswordValid && isLnameValid && isFnameValie && isPseudoValid && isPhoneValid && isEmailValid){
        try{
        fetch("https://social-gather-production.up.railway.app/auth/signup", {
            method: "POST",

            body: JSON.stringify({
                firstname: fname.value,
                lastname: lname.value,
                pseudo: pseudo.value,
                phone: phone.value,
                email: email.value,
                password: password.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if(!response.ok){
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            console.log(text);
        })
    } catch (error) {
        console.log(error.message);
    }
    }
})

