skapa en class med egenskaper

skapa i html två stycke nselects, lägg senare till en search funktion


hämta data från selecten, olika karakteären har olika nummer värden, 

gör en fetch med dessa nummer som parameter,

spara de hämtade objekten i variabler,

använden värden från dessa variabler som argument för att skapa nya prototyper/classes

funktion som tar dessa två classes och sedan skriver ut dessa


funktion för att jämföra kommer
    compare funktion kan ta två argument, de två valda objekten
        antingen skapa en funktion för varje value som måste jämföras
        alternativt, en funktion för att jämföra vilket value som är högst,
        och en annan som jämför om det har samma value, dvs för hårfärg osv


        funktion för homeworld
        homeworld kommer att vara en api url
        en funktion bör skapas för att sätta homeplanet till homeworld responsens objekt.name

        homeworld = api adress
        set res = async fetch(homeworld)
        homeplanet = res.json
        homeplanet.name