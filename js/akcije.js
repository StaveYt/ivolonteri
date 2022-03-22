let bottomButtonEl = document.getElementById("bottomButton");
let bottomBoxEl = document.getElementById("bottomBox");

let hiddenBottom = true;

let upaljeniFilteri = [];

function PrikaziDiv() {
  console.log("test");

  bottomButtonEl.classList.toggle("hidden-bottom-button");
  if (hiddenBottom) {
    bottomButtonEl.innerText = "-";
    hiddenBottom = false;
  } else {
    bottomButtonEl.innerText = "+";
    hiddenBottom = true;
  }

  bottomBoxEl.classList.toggle("hidden-bottom-items");
}

function AdminLogIn(e) {
  e.preventDefault();

  for (let i = 0; i < users.length; i++) {
    //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I PASSWORD I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK
    if (
      usernameInp.value == users[i].username &&
      passwordInp.value == users[i].password
    ) {
      if (users[i].rank == "admin") {
        loggedIn = true; //MIJENJAMO BOOLEAN loggedIn U true
        trenutniUser = users[i]; //STAVLJAMO VARIJABLU trenutniUser KAO users[i] JER SE TAJ USER ULOGIRAO
        PrikaziDodavanjeAkcija(); //ZOVEMO FUNKCIJU PrikaziZapisnik
      }
    }
  }
  //AKO JE BOOLEAN loggedIn false ONDA ZNAMO DA SE KORISNIK NIJE USPIO ULOGIRATI I ALERTAMO GA SA PORUKOM
  if (!loggedIn) {
    alert(
      "You have entered a wrong password or username or a non-admin account!"
    );
  }
}

function PrikaziDodavanjeAkcija() {
  bottomBoxEl.innerHTML = `<div class="row text-center text-white" id="row1">
  <h2 class="username" id="username">${trenutniUser.username}</h2>
  </div>
  <div class="row" id="row2">
  <div class="" id="zapisivanje">
    <form class="text-white zapisivanje" onsubmit="return DodajAkciju(event)">
      <legend>Dodaj Akciju</legend>
      <div class="mb-3">
        <label for="imeAkcije" class="form-label">Upišite ime akcije</label>
        <input type="text" id="imeAkcije" class="form-control" placeholder="Crveni Križ">
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Dodajte Sliku</label>
        <input class="form-control" type="file" id="slikaFile">
      </div>
      <div class="mb-3">
        <label for="opis" class="form-label">Opis</label>
        <textarea class="form-control" id="opis" rows="3"></textarea>
      </div>
      <div class="mb-3">
        <label for="biranjeMjesta" class="form-label">Izaberite mjesto</label>
        <select id="biranjeMjesta" class="form-select">
          <option disabled>Izaberite mjesto</option>
          <option value="Split">Split</option>
          <option value="Dubrovnik">Dubrovnik</option>
          <option value="Zadar">Zadar</option>
          <option value="Šolta">Šolta</option>
          <option value="Brač">Brač</option>
          <option value="Omiš">Omiš</option>
          <option value="Kaštela">Kaštela</option>
          <option value="Trogir">Trogir</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="link" class="form-label">Upišite link</label>
        <input type="text" id="link" class="form-control" placeholder="https://bit.ly/Ur3um">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  <div class="zapisani col text-dark" id="zapisani">
    </div>
  </div>
  </div>`;
}

function DodajAkciju(e) {
  e.preventDefault();

  let imeAkcijeInp = document.getElementById("imeAkcije"); //DOBIVANJE INPUT ELEMENTA ZA IME AKCIJE
  let opisInp = document.getElementById("opis"); //DOBIVANJE INPUT ELEMENTA ZA BILJESKU
  let mjestoInp = document.getElementById("biranjeMjesta"); //DOBIVANJE INPUT ELEMENTA ZA MJESTO
  let slikaFile = document.getElementById("slikaFile");
  let linkInp = document.getElementById("link"); //DOBIVANJE INPUT ELEMENTA ZA LINK

  akcije.push(
    new NapraviAkciju(
      imeAkcijeInp.value,
      opisInp.value,
      mjestoInp.value,
      linkInp.value
    )
  );
  DodavanjeKartica(akcije[akcije.length - 1]);
}

function NapraviAkciju(ime, opis, mjesto, link) {
  this.ime = ime;
  this.opis = opis;
  this.mjesto = mjesto;
  this.link = link;
  this.alt = "";
  this.slika = "";
}

function PageLoad() {
  for (let i = 0; i < akcije.length; i++) {
    DodavanjeKartica(akcije[i]);
  }
}

function Filter(izabraniType) {
  let izabraniCheck = document.getElementById(`${izabraniType}Check`);

  if (izabraniCheck.value != "") {

    console.log("it's turned off");
    izabraniCheck.value = "";
    //OVDJE ĆEMO STAVITI ŠTO SE DESI KADA SE FILTER UGASI
    upaljeniFilteri.splice(upaljeniFilteri.indexOf(izabraniType), 1);
    if(upaljeniFilteri.length == 0){container.innerHTML = ""; PageLoad();}

  } else {
    console.log("it's turned on");
    izabraniCheck.value = "on";
    container.innerHTML = "";
    upaljeniFilteri.push(izabraniType)
    //OVDJE STAVI FILTER KOD
    for (let i = 0; i < akcije.length; i++) {
      let dodan = false;
      let trenutniType = akcije[i].type.split(" ");
      
      for (let j = 0; j < trenutniType.length; j++) {
        if(izabraniType == trenutniType[j] && !dodan){
          DodavanjeKartica(akcije[i]);
          dodan = true;
        }
      }
    }
  }
}