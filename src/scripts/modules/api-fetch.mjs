const baseURL = "https://swapi.dev/api/"


export async function fetchCharacter(character) {
    const res = await fetch(baseURL + 'people/' + character)
    let person = await res.json();
    return person;
}

async function createCharacter(charData) {


}

// let logCharacter = async (nmr) => {
//     try {
//         let aCharacter = await fetchCharacter(nmr);
//         console.log(aCharacter)
//     } catch (error) {
//         console.log("error: ", error)
//     }
// }
// logCharacter(1)






