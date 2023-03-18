import { fetchCharacter } from "./modules/api-fetch.mjs";
// import { Character } from "./modules/character.js";
import { createCharacter } from "./modules/character.js";
// import { compareNumeric } from "./character.js";
//cment

let video = document.getElementById("loading-video");
const mobileSrc = './src/assets/videos/Loading-Screen-mobile.mp4';
const desktopSrc = './src/assets/videos/Loading-Screens.mp4';


let charwindows1 = document.getElementById("person1-info")
let charwindows2 = document.getElementById("person2-info")
let clickButton = document.getElementById("clickie")

clickButton.addEventListener("click", async function () {

    let loadingSc = document.getElementById("loadingScreen").checked
    if (loadingSc) {
        setVideoSrc()
        // document.getElementById("loading-video").style.visibility = "visible";
        video.style.visibility = "visible";
        video.muted = false;
    }

    let leftSelect = document.querySelector("select[name='select1']").value
    console.log(leftSelect, "👈")
    let rightSelect = document.querySelector("select[name='select2']").value
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
        console.log("Well that aint right 😫:", error)
    }


})



async function fetchAndPrint(obj1, obj2) {
    try {

        document.getElementById("card1").style.display = "block"
        document.getElementById("card2").style.display = "block"

        let pfp1 = document.getElementById("card-img1")
        let pfp2 = document.getElementById("card-img2")

        pfp1.style.backgroundImage = 'url("./src/assets/images/people/image' + obj1.id + '.jpg") , url("./src/assets/images/people/errorDroid.jpg") '

        pfp2.style.backgroundImage = 'url("./src/assets/images/people/image' + obj2.id + '.jpg"), url("./src/assets/images/people/error.jpg")'

        //--- Im dumb
        let addInfo1 = document.getElementById("additional-info1")
        addInfo1.innerHTML = ""
        addInfo1.style.display = "none"

        let addInfo2 = document.getElementById("additional-info2")
        addInfo2.innerHTML = ""
        addInfo2.style.display = "none"
        //--- 

        // charwindows1.innerHTML = ""
        // charwindows2.innerHTML = ""

        let firstMovie1 = await obj1.getFirstMovie()

        await obj1.setHomePlanet()
        console.log(obj1.name + "s homeplanet is ", obj1.homePlanet.name)
        await obj2.setHomePlanet()
        console.log(obj2.name + "s homeplanet is ", obj2.homePlanet.name)

        let samePlanet = obj1.compareHomePlanet(obj2.homePlanet)
        console.log("They come from the same planet?:", samePlanet)

        console.log(obj1.id, "testar id")
        // console.log(character1Img)
        console.log(obj2.id, "testar id")

        obj1.mostExpensiveVessel()


        //---------------------------filling the cards---------------------------


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




        //----------------------------_______---------------------------

        //---------------------------Old code ,key n values---------------------------


        // for (const property in obj1) {
        //     let pItem = document.createElement("p")
        //     pItem.innerText = `${property} :  ${obj1[property]}`
        //     charwindows1.appendChild(pItem);
        //     console.log(property, ":", obj1[property])

        // }
        // for (const property in obj2) {
        //     let pItem = document.createElement("p")
        //     pItem.innerText = `${property} :  ${obj2[property]}`
        //     charwindows2.append(pItem)
        //     console.log(property, ":", obj2[property])
        // }


        //----------------------------_______---------------------------



    } catch (error) { console.log("error:", error, "Kunde inte hitta") }

}



function setVideoSrc() {
    if (window.innerWidth < 768) {
        video.src = mobileSrc;
    } else {
        video.src = desktopSrc;
    }
}