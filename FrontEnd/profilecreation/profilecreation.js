const formButton = document.getElementById("formButton");
const theUserId = JSON.parse(localStorage.getItem("monId"));
const mytoken = JSON.parse(localStorage.getItem("monCookie"));

formButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const bioOfUser = document.getElementById("bioOfUser").value;
    const imageOfUser = document.getElementById("userProfileImage").files[0];
    const hobbieOfUser = document.getElementById("hobbiesOfUser").value;
    let myCookie = JSON.parse(localStorage.getItem("monCookie"));
    console.log(myCookie);


    const formData = new FormData();

    formData.append('bio', bioOfUser);
    formData.append('file', imageOfUser);
    formData.append('hobbies', hobbieOfUser);


    for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    
    try {
        fetch(`https://social-gather-production.up.railway.app/profile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("monCookie"))}`,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(json => {
            console.log(json, "requete bien effectué");
            window.location = "../user-profile/userprofile.html"
        })
    } catch (error) {
        console.log(error.message);
        console.log("requete non effecuté");
    }
});