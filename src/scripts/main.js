import { fetchCharacter } from "./modules/api-fetch.mjs";

import { createCharacter } from "./character.js";




let charwindows1 = document.getElementById("person1")
let charwindows2 = document.getElementById("person2")
let clickButton = document.getElementById("clickie")

clickButton.addEventListener("click", async function () {

    let chars = await createCharacter(1, 2)

    let [obje1, obje2] = chars;

    console.log(obje1, "hej", obje2)

    await fetchAndPrint(obje1, obje2)

})




async function fetchAndPrint(obj1, obj2) {
    try {

        // let person = await fetchCharacter(number);
        charwindows1.innerText = ""
        charwindows1.innerText = ""

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

// fetchAndPrint(obje1, obje2)

// fetchAndPrint(2)
// console.log(createChar)