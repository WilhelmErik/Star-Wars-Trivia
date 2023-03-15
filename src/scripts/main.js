import { fetchCharacter } from "./modules/api-fetch.mjs";
import { createCharacter } from "./character.js";
import { compareNumeric } from "./character.js";



let video = document.getElementById("loading-video");
const mobileSrc = './assets/videos/Loading-Screen-mobile.mp4';
const desktopSrc = './assets/videos/Loading-Screens.mp4';


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
    console.log(rightSelect, "👉")

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
        let character1Img = document.getElementById("person1-img")
        let character2Img = document.getElementById("person2-img")

        document.getElementById("card1").style.display = "block"
        document.getElementById("card2").style.display = "block"

        let pfp1 = document.getElementById("pfp1")
        let pfp2 = document.getElementById("pfp2")
        pfp1.style.backgroundImage = 'url("./assets/images/people/image' + obj1.id + '.jpg") , url("./assets/images/people/errorDroid.jpg") '

        pfp2.style.backgroundImage = 'url("./assets/images/people/image' + obj2.id + '.jpg"), url("./assets/images/people/error.jpg")'

        charwindows1.innerHTML = ""
        charwindows2.innerHTML = ""

        let firstMovie1 = await obj1.getFirstMovie()
        console.log(firstMovie1.title, firstMovie1.release_date, "First movie")


        await obj1.setHomePlanet()
        console.log(obj1.name + "s homeplanet is ", obj1.homePlanet.name)
        await obj2.setHomePlanet()
        console.log(obj2.name + "s homeplanet is ", obj2.homePlanet.name)

        let samePlanet = obj1.compareHomePlanet(obj2.homePlanet)
        console.log("They come from the same planet?:", samePlanet)

        console.log(obj1.id, "testar id")
        console.log(character1Img)
        console.log(obj2.id, "testar id")

        obj1.mostExpensiveVessel()

        for (const property in obj1) {
            let pItem = document.createElement("p")
            pItem.innerText = `${property} :  ${obj1[property]}`
            charwindows1.appendChild(pItem);
            console.log(property, ":", obj1[property])

        }
        for (const property in obj2) {
            let pItem = document.createElement("p")
            pItem.innerText = `${property} :  ${obj2[property]}`
            charwindows2.append(pItem)
            console.log(property, ":", obj2[property])
        }

    } catch (error) { console.log("error:", error, "Kunde inte hitta") }

}

function setVideoSrc() {
    if (window.innerWidth < 768) {
        video.src = mobileSrc;
    } else {
        video.src = desktopSrc;
    }
}