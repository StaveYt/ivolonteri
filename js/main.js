
//DEKLARIRANJE OBJEKATA AKCIJA
let akcija0 = {
    ime: "Bračke Šape", //IME AKCIJE
    mjesto: "Brač", //MJESTO AKCIJE
    slika: "brackeSape.jpg", alt: "Pas", //MJESTO SLIKE I STRING KOJI ĆE BITI U ALT TEXTU SLIKE
    //KRATAK OPIS AKCIJE
    opis: "Skupina volontera i ljubitelja životinja koji će na našem otoku pokušati pomoći životinjama koje pomoć trebaju.",
    link: "https://hr-hr.facebook.com/BrackeSape/" //LINK NA STRANICU AKCIJE
}; let akcija1 = {
    ime: "Splitske šape",
    mjesto: "Split",
    slika: "splitskeSape.jpg", alt: "Pas",
    opis: "Oglašavanje izgubljenih ljubimaca za područje grada Splita. Pomoć kod traženja smještaja, liječenja ili financiranja liječenja i hrane.",
    link: "https://hr-hr.facebook.com/SplitskeSape/"
}; let akcija2 = {
    ime: "Crveni križ",
    mjesto: "Split",
    slika: "crveniKriz.jpg", alt: "Ekipa Crvenog Križa",
    opis: "Splitski ogranak humanitarne organizacije Crveni križ.",
    link: "https://www.hck.hr/adresar/splitsko-dalmatinska/65"
}; let akcija3 = {
    ime: "Pokret Otoka",
    mjesto: "Šolta",
    slika: "pokretOtoka.png", alt: "Logo od Pokreta Otoka",
    opis: "Pokret otoka okuplja brojne otočane i stručnjake koji žele doprinijeti održivom razvoju hrvatskih otoka. Brojimo desetke volontera iz cijele Hrvatske, različitih vještina i iskustava koji redovito doprinose radu udruge kroz virtualan rad od kuće. Svim volonterima omogućavamo mentorstvo, informiranje i umrežavanje sa zanimljivim i proaktivnim pojedincima.",
    link: "https://www.otoci.eu/volontiraj/"
}; let akcija4 = {
    ime: "EKO Zadar",
    mjesto: "Zadar",
    slika: "ekoZadar.jpg", alt: "Ekipa iz EKO Zadara",
    opis: "Udruga Eko-Zadar korisnica je institucionalne podrške Nacionalne zaklade za razvoj civilnoga društva za stabilizaciju i razvoj udruge.",
    link: "https://ekozadar.hr/"
}; let akcija5 = {
    ime: "Burza Dobrote",
    mjesto: "Dubrovnik",
    slika: "burzaDobrote.png", alt: "Logo za Burzu Dobrote",
    opis: "Burza Dobrote je projekt Udruge za razvoj civilnog društva Bonsai koji promovira volonterstvo kao način aktivnog sudjelovanja u društvu, te doprinosi unapređenju postojeće volonterske infrastrukture. Projektom se želi podići svijest o prednostima dobrovoljnog sudjelovanja u izgradnji bolje i sretnije zajednice, te dugoročno osigurati kvalitetno i svrhovito volontiranje na području grada Dubrovnika.",
    link: "https://www.burzadobrote.com/"
};

//STAVLJANJE SVIH AKCIJA U JEDAN NIZ
let akcije = [akcija0, akcija1, akcija2, akcija3, akcija4, akcija5];

let searchInp = document.getElementById('search');
let container = document.getElementById('container');

function Pretraži(e){
    e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE
    
    // console.log(searchInp.value);

    //ZOVE FUNKCIJU PrikazivanjeAkcija SA ARGUMENTOM searchInp.value ŠTO JE JEDNAKO ONOME ŠTO JE KORISNIK UPISAO U SEARCH BAR
    PrikazivanjeAkcija(searchInp.value);
}

function PrikazivanjeAkcija(pretrazenoMjesto){
    container.innerHTML = ""; //STAVLJA HTML KOD UNUTAR DIVA CONTAINER NA PRAZNO KAKO BI U NJEGA MOGLI DODAVATI SAMO KARTICE KOJE SU NAM POTREBNE

    if(pretrazenoMjesto == ""){
        for(let i = 0; i < akcije.length; i++){
            trenutnaAkcija = akcije[i]; //STAVALJAMO TRENUTNU AKCIJU KOJA STOJI U NIZU akcije I IMA INDEX i
    
            //DODAVANJE KARTICA SA INFORMACIJAMA TRENUTNIH AKCIJA
            container.innerHTML += `<div class="card" style="width: 18rem; margin: 5px; display: inline-block;"> <!--OD OVOG-->
            <img src="../assets/img/${trenutnaAkcija.slika}" class="card-img-top" alt="${trenutnaAkcija.alt}">
            <div class="card-body">
                <h5 class="card-title">${trenutnaAkcija.ime}, ${trenutnaAkcija.mjesto}</h5>
                <p class="card-text">${trenutnaAkcija.opis}</p>
                <a href="${trenutnaAkcija.link}" class="btn btn-primary">Posjetite stranicu akciju</a>
            </div>
            </div>`;
        }
    }
    else{
        for(let i = 0; i < akcije.length; i++){
            trenutnaAkcija = akcije[i]; //STAVALJAMO TRENUTNU AKCIJU KOJA STOJI U NIZU akcije I IMA INDEX i
    
            //PREGLEDAVAMO JE LI MJESTO KOJE SMO PRETRAZILI JEDANKO TRENUTNOJ AKCIJI I AKO JE DODAVAMO KARTICU SA INFORMACIJAMA
            if(pretrazenoMjesto == trenutnaAkcija.mjesto){
                container.innerHTML += `<div class="card" style="width: 18rem; margin: 5px; display: inline-block;"> <!--OD OVOG-->
                <img src="../assets/img/${trenutnaAkcija.slika}" class="card-img-top" alt="${trenutnaAkcija.alt}">
                <div class="card-body">
                  <h5 class="card-title">${trenutnaAkcija.ime}, ${trenutnaAkcija.mjesto}</h5>
                  <p class="card-text">${trenutnaAkcija.opis}</p>
                  <a href="${trenutnaAkcija.link}" class="btn btn-primary">Posjetite stranicu akciju</a>
                </div>
                </div>`;
            }
        }
    }
    
}
