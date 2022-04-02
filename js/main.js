//DEKLARIRANJE OBJEKATA AKCIJA
let activity0 = {
  name: "Bračke Šape",
  place: "Brač",
  picture: "brackeSape.jpeg", alt: "Pas", //MJESTO SLIKE I STRING KOJI ĆE BITI U ALT TEXTU SLIKE
  discription: "Skupina volontera i ljubitelja životinja koji će na Braču pokušati pomoći životinjama koje pomoć trebaju. Bavi se Oglašavanjem i traženjem izgubljenih ljubimaca, pronalaženju smještaja, financiranjem liječenja i hranjenja te bilo kojom drugom vrstom pomoći životinja koju je moguće pružiti.",
  link: "https://hr-hr.facebook.com/BrackeSape/", 
  type: "zivotinje"
}; let activity1 = {
  name: "Splitske šape",
  place: "Split",
  picture: "splitskeSape.jpeg",
  alt: "Pas",
  discription: 'Oglašavanje izgubljenih ljubimaca za područje grada Splita. Pomoć kod traženja smještaja, financiranja liječenja i hrane. Ideja Splitskih šapa razvila se neposredno nakon prvog "Buvljaka za šape" kojeg su organizirali volonteri, nebitno da li su tada bili pripadnicineke udruge ili neke druge organizacije.',
  link: "https://hr-hr.facebook.com/SplitskeSape/",
  type: "zivotinje"
}; let activity2 = {
  name: "Crveni križ",
  place: "Split",
  picture: "crveniKriz.jpg",
  alt: "Ekipa Crvenog Križa",
  discription: "Gradsko društvo Crvenog križa Split je udruga za promicanje humanitarnih ciljeva i akcija od opće koristi koja djeluje na osnovi načela međunarodnog pokreta Crvenog križa i Crvenog polumjeseca. Udruga djeluje na području grada Splita i općina Šolta i Podstrana. Gradsko društvo Crvenog križa Split je neprofitna pravna osoba. Uživa posebnu zaštitu i skrb Republike Hrvatske.",
  link: "http://www.crvenikriz-split.com/",
  type: "doniranje beskucnici stariji"
}; let activity3 = {
  name: "Društvo Naša Djeca Omiš",
  place: "Omiš",
  picture: "dndOmis.jpg",
  alt: "Djeca iz Društva Naša Djeca Omiš",
  discription: "Mi smo humanitarna udruga civilnog društva, u kojoj ljudi dobre volje promiču i vode akcije te aktivnosti, namijenjene dobrobiti djece. Cjelokupna programska aktivnost Društva Naša djeca, zasniva se na pravima, željama i interesima djece.",
  link: "https://vczd.org/",
  type: "djeca"
}; let activity4 = {
  name: "EKO Zadar",
  place: "Zadar",
  picture: "ekoZadar.jpg",
  alt: "Ekipa iz EKO Zadara",
  discription: `Udruga Eko Zadar je posvećena donošeju pozitivne promjene koje se tiču održivog razvoja kroz aktivističko djelovanje i promicanje ekološke svijesti. Osnovana je 21.travnja 1999 dan prije Dana planeta Zemlje. Okuplja 131 članova. Dosad su se bavili čiščenjem šuma, kompostiranjem, recikliranjem, računanjem ugljičnog otiska ljudi i mnogim drugim akcijama.`,
  link: "https://ekozadar.hr/",
  type: "ekologija"
}; let activity5 = {
  name: "Burza Dobrote",
  place: "Dubrovnik",
  picture: "burzaDobrote.png",
  alt: "Logo za Burzu Dobrote",
  discription: "Burza Dobrote je projekt Udruge za razvoj civilnog društva Bonsai koji promovira volonterstvo kao način aktivnog sudjelovanja u društvu, te doprinosi unapređenju postojeće volonterske infrastrukture. Projektom se želi podići svijest o prednostima dobrovoljnog sudjelovanja u izgradnji bolje i sretnije zajednice, te dugoročno osigurati kvalitetno i svrhovito volontiranje na području grada Dubrovnika.",
  link: "https://www.burzadobrote.com/",
  type: "razvojDrustva"
}; let activity6 = {
  name: "Volonterski Centar Zadar",
  place: "Zadar",
  picture: "volonterskiCentarZadar.png",
  alt: "Logo Volonterskog Centra Zadar",
  discription: "Volonterski centar Zadar je neprofitna organizacija osnovana 8. travnja 2013. kao program Udruge socijalnih radnika Zadar. Volonterski centar je organizacija kojoj je svrha promicanja volonterskog rada u lokalnoj zajednici, okupljanje zainteresiranih za volontiranje i organizacija kojima su volonteri potrebni na jednom mjestu, te poboljšanje kvalitete života korisnika uslugama volonterskog rada.",
  link: "https://vczd.org/",
  type: "razvojDrustva"
}; let activity7 = {
  name: "Pokret Otoka",
  place: "Šolta, Brač",
  picture: "pokretOtoka.png",
  alt: "Logo od Pokreta Otoka",
  discription: "Pokret otoka okuplja brojne otočane i stručnjake koji žele doprinijeti održivom razvoju hrvatskih otoka. Brojimo desetke volontera iz cijele Hrvatske, različitih vještina i iskustava koji redovito doprinose radu udruge kroz virtualan rad od kuće. Svim volonterima omogućavamo mentorstvo, informiranje i umrežavanje sa zanimljivim i proaktivnim pojedincima.",
  link: "https://www.otoci.eu/volontiraj/",
  type: "razvojDrustva"
}; let activity8 = {
  name: "Trokut Malih Kaštela",
  place: "Kaštela",
  picture: "tmk.jpg",
  alt: "Logo Trokuta Malih Kaštela",
  discription: "Udruga Trokut mladih Kaštela je apolitična neprofitna organizacija osnovana 2009. godine u svrhu poboljšanja kvalitete života mladih u Kaštelima.",
  link: "https://www.tmk.hr/",
  type: "mladi"
}; let activity9 = {
  name: "Moje dijete",
  place: "Solin",
  picture: "mojeDijeteSolin.jpg",
  alt: "Logo Trokuta Malih Kaštela",
  discription: `Neprofitna organizacija. U članstvu je 210 obitelji koje dolaze iz cijele Splitsko-dalmatinske županije Cilj osnivanja Udruge je unapređenje kvalitete života te medicinske, socijalne, pravne i druge zaštite djece s teškoćama u razvoju, osoba s invaliditetom i njihovih obitelji.`,
  link: "https://www.tmk.hr/",
  type: "djeca"
}; let activity10 = {
  name: "Lanterna",
  place: "Makarska",
  picture: "lanterna.png",
  alt: "Logo Lanterna",
  discription: `Lokalna organizacija s ciljevima unaprijeđenje mentalnog i fizičkog zdravlja, zaštite prava dijece i mladih, razvojem civilnog društva, kulturno umjetničkog amaterizma i promicanjem volonterstva općenito.`,
  link: "https://volontiranje-lanterna.com/",
  type: "djeca mladi"
}; let activity11 = {
  name: "Lokalni volonterski centar",
  place: "Sinj",
  picture: "sinj.png",
  alt: "Logo Lanterna",
  discription: `Cilj rada LVC Sinj je razvoj volonterstva u lokalnoj zajednici kroz provedbu programa "Cjeloživotno volontiranje".LVC Sinj je nositelj certifikata standarda kvalitete za lokalni volonterski centar.`,
  link: "https://lvc-sinj.hr/o-nama/",
  type: "drustvo edukacija"
}; let activity12 = {
  name: "Volonterski centar Imotski",
  place: "Imotski",
  picture: "centarImotski.png",
  alt: "priroda",
  discription: `U Imotskom je u okviru projekta “Volontiram, činim svoj svijet boljim” pokrenut Lokalni volonterski centar kao mjesto susreta potencijalnih volontera i organizatora volontiranja, mjesto razvijanja ideja, traženja i dobivanja potpore. Različitim edukacijama i volonterskim akcijama potičemo građane na uključivanje i (su)djelovanje, te tako pridonosimo kvaliteti života u lokalnoj zajednici.`,
  link: "https://volonteri-im.eu/",
  type: "ekologija"
}; let activity13 = {
  name: "Volonterski centar Stari grad",
  place: "Stari grad",
  picture: "centarStariGrad.png",
  alt: "priroda",
  discription: `U Starom gradu pokrenut Lokalni volonterski centar kao mjesto susreta potencijalnih volontera i organizatora volontiranja, mjesto razvijanja ideja, traženja i dobivanja potpore. Različitim edukacijama i volonterskim akcijama potičemo građane na uključivanje i (su)djelovanje, te tako pridonosimo kvaliteti života u lokalnoj zajednici.`,
  link: "https://volonteri-im.eu/",
  type: "ekologija"
}; let activity14 = {
  name: "Boranka",
  place: "Split, Dubrovnik, Zadar, Mostar",
  picture: "boranka.png",
  alt: "priroda",
  discription: `Savez izviđača Hrvatske, Hrvatske šume i Hrvatska gorska služba spašavanja pokrenuli su kampanju Boranka, projekt pošumljavanja opožarenih područja Dalmacije. Boranka je najveće volontersko pošumljavanje opožarenih područja ikad organizirano u Hrvatskoj, ali i čitavoj Europi. Kampanja Boranka osmišljena je u suradnji s kreativnom agencijom Imago Ogilvy i najnagrađivanija je neprofitna kampanja u povijesti Hrvatske.`,
  link: "https://volonteri-im.eu/",
  type: "ekologija"
};

//STAVLJANJE SVIH AKCIJA U JEDAN NIZ
let activities = [
  activity0,
  activity1,
  activity2,
  activity3,
  activity4,
  activity5,
  activity6,
  activity7,
  activity8,
  activity9,
  activity10,
  activity11,
  activity12,
  activity13,
  activity14,
];

let searchInp = document.getElementById("search");
let container = document.getElementById("container");

function PretrazivanjeAkcija(searchedPlace, e){
  e.preventDefault(); //ZAUSTAVLJA REFRESH
    
  container.innerHTML = ""; //STAVLJA HTML KOD UNUTAR DIVA CONTAINER NA PRAZNO KAKO BI U NJEGA MOGLI DODAVATI SAMO KARTICE KOJE SU NAM POTREBNE

  //AKO JE KORISNIK PRAZNO PRETRAZIO ONDA DODAVAMO SVE KARTICE ALI AKO JE UNIO NESTO ONDA FILTRIRAMO AKCIJE PREMA TOME
  if (searchedPlace == ""){
    for (let i = 0; i < activities.length; i++){ DodavanjeKartica(activities[i]); }
  } else{
    for (let i = 0; i < activities.length; i++){
      let added = false;
      let currentPlace = activities[i].place.split(', ');
          
      for(let j = 0; j < currentPlace.length; j++){
        //PREGLEDAVAMO JE LI MJESTO KOJE SMO PRETRAZILI JEDANKO TRENUTNOJ AKCIJI I JE LI VEC DODANO, AKO NIJE VEC DODANO I JEDNAKO JE DODAVAMO KARTICU SA INFORMACIJAMA
        if ((currentPlace[j].includes(searchedPlace) || currentPlace[j].toLowerCase().includes(searchedPlace)) && !added){ 
          AddActivityCard(activities[i]); added = true;
        }
      }

    }
  }

}

function AddActivityCard(trenutnaAkcija){
  container.innerHTML += `<div class="card akcija-card" id="${trenutnaAkcija.name}"> 
    <img src="../assets/img/${trenutnaAkcija.picture}" class="card-img-top" alt="${trenutnaAkcija.alt}">
      <div class="card-body">
        <h5 class="card-title">${trenutnaAkcija.name}, ${trenutnaAkcija.place}</h5>
        <p class="card-text">${trenutnaAkcija.discription}</p>
        <a href="${trenutnaAkcija.link}" class="btn btn-success akcije-card-btn">Posjetite stranicu akcije</a>
      </div>
  </div>`;  
}