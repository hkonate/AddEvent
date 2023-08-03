const button = document.querySelector("button");
const input = document.querySelector(".input");

button.addEventListener("click", () =>{
    if(button.innerText === 'Je participe'){
        button.style.backgroundColor = 'red'
        button.innerText = 'Je ne participe pas'
    }else if(button.innerText === 'Je ne participe pas'){
        button.style.backgroundColor = 'rgb(69, 177, 230)'
        button.innerText = 'Je participe'
    }
});

const enter = (event) =>{
    if(event.keyCode === 13){
        button.click()
    }
}

input.addEventListener("keypress", enter)