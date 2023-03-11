import { fetchCharacter } from "./modules/api-fetch.mjs";


// fetchCharacter()






class Character {
    constructor(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender, homeWorld, films) {
        Object.assign(this, { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender, homeWorld, films })
    }
}


export async function createCharacter(id1, id2) {
    let person1 = await fetchCharacter(id1)
    let person2 = await fetchCharacter(id2)

    let character1 = new Character(
        person1.name,
        person1.height,
        person1.mass,
        person1.hair_color,
        person1.skin_color,
        person1.eye_color,
        person1.birth_year,
        person1.gender,
        "Planet",
        person1.films.length,
    );

    let character2 = new Character(
        person2.name,
        person2.height,
        person2.mass,
        person2.hair_color,
        person2.skin_color,
        person2.eye_color,
        person2.birth_year,
        person2.gender,
        "Planet",
        person2.films.length
    );

    console.log(character1)
    console.log(character2)
    // let characters = 
    return [character1, character2]
}


// let createCharacter = async (objekt) => {
//     try {
//         let aCharacter = await fetchCharacter(nmr);
//         console.log(aCharacter)
//         return aCharacter;
//     } catch (error) {
//         console.log("error: ", error)
//     }
// }





let logCharacter = async (nmr) => {
    try {
        let aCharacter = await fetchCharacter(nmr);
        console.log(aCharacter)
    } catch (error) {
        console.log("error: ", error)
    }
}

// create character
// char1 = createCharacter(1);

// console.log(char1)

// let someCharacter = new Character(char1)


