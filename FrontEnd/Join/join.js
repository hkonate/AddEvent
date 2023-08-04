const button = document.querySelector("button");
const input = document.querySelector(".input");
const title = document.querySelector(".title");
const place = document.querySelector(".place")
const date = document.querySelector(".date")
const time = document.querySelector(".time")

try {

    fetch("http://localhost:3000/events" )
    .then(response => response.json())
    .then(json => {
        const tab = json[0].date.split("T");
        const tab3 = tab[0].split("-").reverse();
        const str3 = tab3[0] + "/" + tab3[1] + "/" + tab3[2]; 
        const tab2 = tab[1].split(":");
        const str2 = tab2[0] + "h" + tab2[1];
        title.innerHTML += `<p>${json[0].title}</p>`;
        place.innerHTML += `<p>${json[0].place}</p>`;
        date.innerHTML += `<p>${str3}</p>`;
        time.innerHTML += `<p>${str2}</p>`;
    });

} catch (error) {
    
}

button.addEventListener("click", () =>{
    if(button.innerText === 'Je participe'){
        button.style.backgroundColor = 'red'
        button.innerText = 'Je ne participe pas'
        input.classList.add('hide')
    }else if(button.innerText === 'Je ne participe pas'){
        button.style.backgroundColor = 'rgb(69, 177, 230)'
        button.innerText = 'Je participe'
        input.classList.remove('hide')
    }
});

const enter = (event) =>{
    if(event.keyCode === 13){
        button.click()
    }
}

input.addEventListener("keypress", enter)

