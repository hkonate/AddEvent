const handleClick = (buttonList, inputList, json) => {
    for (let i = 0; i < buttonList.length; i++){

    buttonList[i].addEventListener("click", () =>{

    let {attend} = JSON.parse(localStorage.getItem(`user${i}`)) || false;
console.log(attend, JSON.parse(localStorage.getItem(`user${i}`)));
    if(buttonList[i].innerText === 'Je participe'){
        buttonList[i].style.backgroundColor = 'red'
        buttonList[i].innerText = 'Je ne participe pas'
        inputList[i].classList.add('hide')
        attend = true;

    }else if(buttonList[i].innerText === 'Je ne participe pas'){
        buttonList[i].style.backgroundColor = 'rgb(69, 177, 230)'
        buttonList[i].innerText = 'Je participe'
        inputList[i].classList.remove('hide')
        attend = false;
    } 
    localStorage.setItem(`user${i}`, JSON.stringify({
        attend
    }))
 
    try {
        
        fetch(`http://localhost:3000/event/attend/${json[i]._id}`,{
            method: 'POST',
            body:JSON.stringify({
                name: inputList[i].value,
                attend
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(json => console.log(json));

    } catch (error) {
       
    }
});

}
}


try {

    fetch("http://localhost:3000/events" )
    .then(response => response.json())
    .then(json => {
        console.log(json);
        // title.innerHTML += `<p>${json[0].title}</p>`;
        // place.innerHTML += `<p>${json[0].place}</p>`;
        // date.innerHTML += `<p>${str2}</p>`;
        // time.innerHTML += `<p>${str}</p>`;
let eventResponse;

        let inputList
        let buttonList

        const eventsContainer = document.querySelector(".event");
    for(i = 0; i < json.length; i++){
        eventResponse = JSON.parse(localStorage.getItem(`event${i}`))
            const tab = json[i].date.split("T");
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
                    <p>${json[i].place}</p>
                </div>
                <div class="event-box">
                    <h2>Date:</h2>
                    <p>${str2}</p>
                </div>
                <div class="event-box">
                    <h2>Heure:</h2>
                    <p>${str}</p>
                </div>
                <div class="my-ipt">
                    <input class="input" type="text">
                    <button class="the-btn">Je participe</button>
                </div>
            </div>
            `;
            eventsContainer.appendChild(eventElement);
            inputList = document.querySelectorAll(".my-ipt input");
            buttonList = document.querySelectorAll(".my-ipt button");
            
            if(eventResponse !== null && eventResponse.attend){
                console.log(eventResponse.attend);
                buttonList[i].style.backgroundColor = 'red';
                buttonList[i].innerText = 'Je ne participe pas';
                inputList[i].classList.add('hide');
        }
        }
        handleClick(buttonList, inputList,json);
       
    });

} catch (error) {
    
}






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

