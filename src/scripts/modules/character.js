import { fetchCharacter } from "./api-fetch.mjs";


class Character {
    constructor(id, name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender, homeWorld, films, filmAmount, vehicles, starships) {
        Object.assign(this, { id, name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender, homeWorld, films, filmAmount, vehicles, starships })
    }
    // Bör returna object med info om första filmen karaktären visades i
    async getFirstMovie() {
        const response = await fetch(this.films[0]);
        const data = await response.json();
        return data;
    }

    static async getMatchingMovies(char1, char2) {
        const movies1 = char1.films
        const movies2 = char2.films
        const matchingMovies = movies1.filter(movie => movies2.includes(movie));

        if (matchingMovies.length === 0) {
            return false
        }

        const promises = matchingMovies.map(movieURL => fetch(movieURL));
        const responses = await Promise.all(promises);

        const data = responses.map(data => data.json())
        const movieData = await Promise.all(data)

        const movieTitles = movieData.map(movie => movie.title);
        return movieTitles;

    }

    async setHomePlanet() {
        const res = await fetch(this.homeWorld)
        const homePlanetData = await res.json();
        this.homePlanet = homePlanetData;
    }

    compareHomePlanet(otherCharPlanet) {
        if (this.homePlanet.name === otherCharPlanet.name) {
            return true;
        }
        return false;
    }



    async mostExpensiveVessel() {
        // Hämta alla vehicles och all spaceships, populata en array med alla api
        const vesselData = [...this.vehicles, ...this.starships]
        console.log(vesselData, "All of the vessels")


        if (vesselData.length === 0) {
            console.log('This character has no vehicles or starships.');
            return 'This character has neither vehicles nor starships.'
        }



        const promises = vesselData.map(vessel => fetch(vessel));
        const responses = await Promise.all(promises);

        const data = responses.map(data => data.json())
        const allVessels = await Promise.all(data);

        const mostExpensive = allVessels.reduce((maxVessel, currentVessel) => {
            let currentVPrice = +currentVessel.cost_in_credits;
            let maxVPrice = +maxVessel.cost_in_credits;

            if (currentVessel.cost_in_credits === 'unknown') {
                return maxVessel;
            }

            if (maxVessel.cost_in_credits === 'unknown') {
                return currentVessel;
            }

            return currentVPrice > maxVPrice ? currentVessel : maxVessel;
        });


        const vesselInformation =
            "Their most expensive vehicle is the " + mostExpensive.name +
            (mostExpensive.cost_in_credits === 'unknown'
                ? ', but its cost is unknown'
                : " which cost is " + mostExpensive.cost_in_credits + " credits");

        console.log(vesselInformation)
        console.log(mostExpensive, "Is the most expensive vessel")

        console.log(allVessels[0].name)

        return vesselInformation

        //fetcha alla med promise all, så får jag alla vehicles+spaceships tillbaka
        //loopa igenom alla och kolla vilket objekt som har högst cost_in_credits
        //returna detta objekt och visa sedan name och cost




    }



}


export async function createCharacter(id1, id2) {
    try {
        let person1 = await fetchCharacter(id1)
        let person2 = await fetchCharacter(id2)

        let character1 = new Character(
            id1,
            person1.name,
            person1.height,
            person1.mass,
            person1.hair_color,
            person1.skin_color,
            person1.eye_color,
            person1.birth_year,
            person1.gender,
            person1.homeworld,
            person1.films,
            person1.films.length,
            person1.vehicles,
            person1.starships,
        );

        let character2 = new Character(
            id2,
            person2.name,
            person2.height,
            person2.mass,
            person2.hair_color,
            person2.skin_color,
            person2.eye_color,
            person2.birth_year,
            person2.gender,
            person2.homeworld,
            person2.films,
            person2.films.length,
            person2.vehicles,
            person2.starships,
        );

        compareCharacters(character1, character2)
        // let characters = 
        return [character1, character2]
    } catch (error) {
        console.log("Could not create characters", error)
    }

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

export function compareNumeric(prsn1, prsn1stat, prsn2, prsn2stat) {
    console.log(prsn1.name, +prsn1.height)
    console.log(prsn2.name, +prsn2.height)


    return (prsn1stat > prsn2stat) ? prsn1.name
        : (prsn2stat > prsn1stat) ? prsn2.name
            : "Same";
}

export function compareHeight(prsn1, prsn2) {
    if (+prsn1.height > +prsn2.height) {
        return prsn1.name + " is " + (+prsn1.height - +prsn2.height) + "cm taller than " + prsn2.name
    } else if (+prsn2.height > +prsn1.height) {
        return prsn2.name + " is " + (+prsn2.height - +prsn1.height) + "cm taller than " + prsn1.name
    } else {
        return "They are the same height"
    }
}

export function compareWeight(prsn1, prsn2) {
    const mass1 = +prsn1.mass
    const mass2 = +prsn2.mass;
    console.log(mass1, mass2, "Vikt Test")
    if (mass1 > mass2) {
        const weightDiff1 = (mass1 - mass2).toFixed(1)
        return prsn1.name + " weighs " + weightDiff1 + "kg more than " + prsn2.name
    } else if (mass2 > mass1) {
        const weightDiff2 = (mass2 - mass1).toFixed(1)
        return prsn2.name + " weighs " + weightDiff2 + "kg more than " + prsn1.name
    } else {
        return "They have the same mass"
    }
}

export function compareFilmAmount(prsn1, prsn2) {
    if (+prsn1.films > +prsn2.films) {
        return prsn1.name + " has appeared in " + (+prsn1.films - +prsn2.films) + " more movie(s) than " + prsn2.name
    } else if (+prsn2.films > +prsn1.films) {
        return prsn2.name + " has appeared in " + (+prsn2.films - +prsn1.films) + " more movie(s) than " + prsn1.name
    } else {
        return "They have appeared in the same amount of movies"
    }
}

export function compareString(prsn1stat, prsn2stat) {
    return (prsn1stat === prsn2stat) ? "the same" : "different";
}


function compareCharacters(character1, character2) {

    let heightStat = compareHeight(character1, character2)
    let weightStat = compareWeight(character1, character2)
    let filmStat = compareFilmAmount(character1, character2)

    let skinStat = compareString(character1.skinColor, character2.skinColor)
    let hairStat = compareString(character1.hairColor, character2.hairColor)
    let eyeStat = compareString(character1.eyeColor, character2.eyeColor)
    let genderStat = compareString(character1.gender, character2.gender)

    let statBox = document.getElementById("stats");
    statBox.innerText = ""
    statBox.style.visibility = "visible"

    statBox.innerHTML += `<p>${heightStat}</p>`
    statBox.innerHTML += `<p>${weightStat}</p>`
    statBox.innerHTML += `<p>${filmStat}</p>`


    statBox.innerHTML += `<p> Their skincolor is ${skinStat}</p>`
    statBox.innerHTML += `<p> Their haircolor is ${hairStat}</p>`
    statBox.innerHTML += `<p> Their eyecolor is ${eyeStat}</p>`
    statBox.innerHTML += `<p> Their gender is ${genderStat}</p>`

    // statBox.innerText += `Their skincolor is ${skinStat}`

    console.log(compareHeight(character1, character2))
    console.log(compareWeight(character1, character2))
    console.log(compareFilmAmount(character1, character2))

    let additionalInfo = document.createElement("button")
    additionalInfo.id = "more-text-btn";
    additionalInfo.innerText = "More Info"
    statBox.append(additionalInfo)


    //-----------------------Should the user want additional information--------------------


    additionalInfo.addEventListener("click", async () => {

        let addInfo1 = document.getElementById("additional-info1")
        addInfo1.innerHTML = ""
        addInfo1.style.display = "block"

        let addInfo2 = document.getElementById("additional-info2")
        addInfo2.innerHTML = ""
        addInfo2.style.display = "block"

        let firstMovie1 = await character1.getFirstMovie();
        let firstMovie2 = await character2.getFirstMovie();

        console.log(firstMovie1.title, firstMovie1.release_date, "First movie 1")

        addInfo1.innerHTML += `<p> The first appearance of ${character1.name} was in the movie '${firstMovie1.title} in ${firstMovie1.release_date.slice(0, 4)}.</p>`

        console.log(firstMovie2.title, firstMovie2.release_date, "First movie 2")

        addInfo2.innerHTML += `<p> The first appearance of ${character2.name} was in the movie '${firstMovie2.title} in ${firstMovie2.release_date.slice(0, 4)}.</p>`

        //Gjorde metoden getMatchingMovies() statisk då jag bara för sakens skull vill kunna kalla metoden genom att skriva Character istället för att använde en instans av klassen

        let coStars = await Character.getMatchingMovies(character1, character2)
        if (coStars) {
            console.log(" They have both starred in", coStars)
            statBox.innerHTML += `<p> They have both starred in ${coStars}</p>`
        }
        if (character1.homePlanet.name === character2.homePlanet.name) {
            console.log(" They Are both from the planet", character1.homePlanet.name)
            statBox.innerHTML += `<p> They Are both from the planet
             ${character1.homePlanet.name}</p>`
        }
        let char1mostExpensive = await character1.mostExpensiveVessel()
        let char2mostExpensive = await character2.mostExpensiveVessel()
        console.log(char1mostExpensive)
        console.log(char2mostExpensive);

        addInfo1.innerHTML += `<p> ${char1mostExpensive} </p>`
        addInfo2.innerHTML += `<p> ${char2mostExpensive} </p>`

    })
}



