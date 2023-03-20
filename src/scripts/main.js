import { fetchCharacter } from "./modules/api-fetch.mjs";
// import { Character } from "./modules/character.js";
import { createCharacter } from "./modules/character.js";
// import { compareNumeric } from "./character.js";
//cment

let video = document.getElementById("loading-video");
const mobileSrc = './src/assets/videos/Loading-Screen-mobile.mp4';
const desktopSrc = './src/assets/videos/Loading-Screens.mp4';

let clickButton = document.getElementById("clickie")

setVideoSrc()
clickButton.addEventListener("click", async function () {
    setVideoSrc()
    let loadingSc = document.getElementById("loadingScreen").checked
    if (loadingSc) {
        // setVideoSrc()
        video.style.visibility = "visible";
        video.muted = false;
    }

    let leftSelect = document.querySelector("#charSearchField1").dataset.id;
    console.log(leftSelect, "👈")
    let rightSelect = document.querySelector("#charSearchField2").dataset.id;
    console.log("👉", rightSelect)

    try {
        let chars = await createCharacter(leftSelect, rightSelect)
        let [obje1, obje2] = chars;
        await fetchAndPrint(obje1, obje2)
        setTimeout(() => {
            document.getElementById("loading-video").style.visibility = "hidden";
            video.muted = true;
        }, 4000)

    } catch (error) {
        alert("Well that aint right 😫")
        console.log("Well that aint right 😫:", error)
    }


})



async function fetchAndPrint(obj1, obj2) {
    try {

        document.getElementById("card1").style.display = "block"
        document.getElementById("card2").style.display = "block"

        let pfp1 = document.getElementById("card-img1")
        let pfp2 = document.getElementById("card-img2")

        // --------Setting images for the cards---------

        pfp1.style.backgroundImage = 'url("./src/assets/images/people/image' + obj1.id + '.jpg") , url("./src/assets/images/people/errorDroid.jpg") '

        pfp2.style.backgroundImage = 'url("./src/assets/images/people/image' + obj2.id + '.jpg"), url("./src/assets/images/people/error.jpg")'
        //___________________________________________________

        //--- Hiding The additional info box below each card -------
        let addInfo1 = document.getElementById("additional-info1")
        addInfo1.innerHTML = ""
        addInfo1.style.display = "none"

        let addInfo2 = document.getElementById("additional-info2")
        addInfo2.innerHTML = ""
        addInfo2.style.display = "none"
        //________________________________

        //--- 
        console.table(obj1, obj2)

        await obj1.setHomePlanet()
        await obj2.setHomePlanet()

        let samePlanet = obj1.compareHomePlanet(obj2.homePlanet)

        //---------------------------filling the cards---------------------------
        //-----
        document.getElementById("card-id1").textContent = obj1.id;
        document.getElementById("card-name1").textContent = obj1.name;

        document.getElementById("gender-value1").textContent = obj1.gender;
        document.getElementById("height-value1").textContent = obj1.height + "cm";
        document.getElementById("weight-value1").textContent = obj1.mass + "kg";
        document.getElementById("home-planet-value1").textContent = obj1.homePlanet.name;
        document.getElementById("eye-color-value1").textContent = obj1.eyeColor;
        document.getElementById("hair-color-value1").textContent = obj1.hairColor;
        document.getElementById("skin-color-value1").textContent = obj1.skinColor;
        document.getElementById("movie-amount-value1").textContent = obj1.filmAmount;
        //_______

        //--------
        document.getElementById("card-id2").textContent = obj2.id;
        document.getElementById("card-name2").textContent = obj2.name;

        document.getElementById("gender-value2").textContent = obj2.gender;
        document.getElementById("height-value2").textContent = obj2.height + "cm";
        document.getElementById("weight-value2").textContent = obj2.mass + "kg";
        document.getElementById("home-planet-value2").textContent = obj2.homePlanet.name;
        document.getElementById("eye-color-value2").textContent = obj2.eyeColor;
        document.getElementById("hair-color-value2").textContent = obj2.hairColor;
        document.getElementById("skin-color-value2").textContent = obj2.skinColor;
        document.getElementById("movie-amount-value2").textContent = obj2.filmAmount;
        //_________

    } catch (error) { console.log("error:", error, "Kunde inte hitta") }

}


function setVideoSrc() {
    if (window.innerWidth < 768) {
        video.src = mobileSrc;
        document.getElementById("background-video").src = "./"
    } else {
        video.src = desktopSrc;
        document.getElementById("background-video").src = "./src/assets/videos/Star Wars - H264-compressed.mp4"
    }
}

function fillCards(obj1, obj2) {

}

//---- Working on search feature

import characters from "./modules/characterList.js"


const myDropdown1 = document.getElementById("selectable-options1");
const charSearch1 = document.getElementById("charSearchField1")

const myDropdown2 = document.getElementById("selectable-options2");
const charSearch2 = document.getElementById("charSearchField2")

searchFunction(myDropdown1, charSearch1)
searchFunction(myDropdown2, charSearch2)

function searchFunction(myDropdown, charSearch) {

    myDropdown.hidden = true

    characters.forEach(character => {
        const option = document.createElement("div");
        option.classList.add("select-option");
        option.innerText = character.name
        option.dataset.name = character.name;
        option.dataset.id = character.id;
        myDropdown.append(option)

        option.addEventListener("click", () => {
            charSearch.value = option.dataset.name;
            charSearch.dataset.id = option.dataset.id;
            console.log(charSearch.dataset.id)
        })
    })

    charSearch.addEventListener("focus", () => {
        myDropdown.hidden = false
    })

    charSearch.addEventListener("blur", () => {
        setTimeout(() => {
            myDropdown.hidden = true
        }, 100)
    })

    charSearch.addEventListener("input", (e) => {
        myDropdown.hidden = false
        const searchValue = e.target.value.toLowerCase();

        for (const option of myDropdown.children) {
            const charName = option.dataset.name.toLowerCase();
            option.hidden = !charName.includes(searchValue)
        }
        console.log(searchValue)
    })

}

const myDropdown = document.getElementById("selectable-options");
const charSearch = document.getElementById("charSearchField1")
myDropdown.hidden = true







console.log("test")