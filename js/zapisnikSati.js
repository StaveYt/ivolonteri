//STVARAMO OBJEKTE KORISNIKA
let user0 = {
  username: "user0", //U METODU username STAVLJAMO KORISNIČKO IME
  password: "user0", //U METODU password STAVLJAMO PASSWORD KORISNIKA
  rank: "user", //U METODU rank STAVLJAMO RANK KORISNIKA (user ili admin)

  //U METODU zapisano STAVARMO NIZ SA OBJEKTIMA KOJE IMAJU INFORMACIJE O AKCIJAMA U KOJEM JE KORISNIK SUDJELOVAO
  zapisano: [
    zapis0 = {
      akcija: "Boranka",
      mjesto: "Split",
      biljeska: "Na Mosoru smo sadili (nadam se da nam ne oduzmete bodove za šalu)",
      sati: "10",
      link: "https://bit.ly/Ur3uM"
    }, zapis1 = {
      akcija: "EKO Zadar",
      mjesto: "Zadar",
      biljeska: "Bilo je vrlo zabavno",
      sati: "11",
      link: "https://bit.ly/Ur3uM"
    }, zapis2 = {
      akcija: "Crveni križ",
      mjesto: "Split",
      biljeska: "Pomagali smo beskućnicima",
      sati: "12",
      link: "https://bit.ly/Ur3uM"
    }, zapis3 = {
      akcija: "Bračke Šape",
      mjesto: "Brač",
      biljeska: "Išli smo na Brač pomagati životinjama",
      sati: "13",
      link: "https://bit.ly/Ur3uM"
    }
  ]
}; let admin0 = {
  username: "admin0",
  password: "admin0",
  rank: "admin"
}

let loggedIn = false; //BOOLEAN KOJI OZNAČAVA JE LI KORISNIK ULOGIRAN ILI NIJE
let users = [user0, admin0]; //NIZ U KOJEMU SU SVI KORISNICI
let trenutniUser = users[0]; //VARIJABLA U KOJOJ SE NALAZI TRENUTNI KORISNIK (kao placeholder je korisnik sa indexom 0)

//DOBIVANJE ELEMENATA IZ HTMLA
let usernameInp = document.getElementById('username-inp'); //DOBIVANJE INPUT ELEMENTA ZA USERNAME
let passwordInp = document.getElementById('password-inp'); //DOBIVANJE INPUT ELEMENTA ZA PASSWORD
let logInForm = document.getElementById('log-in'); //DOBIVANJE FORM ELEMENTA ZA LOGIN
let row1 = document.getElementById('row1'); //DOBIVANJE DIV ELEMENTA U KOJI ĆEMO POSLIJE STAVLJATI ELEMENTE

let zapisaniEl; //DEFINIRAMO VARIJABLU zapisaniEl U KOJU ĆEMO POSLIJE DODATI DIV ELEMENT


function LogIn(e) {
  e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE

  //PETLJA 
  for (let i = 0; i < users.length; i++) {
    //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I PASSWORD I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK
    if (usernameInp.value == users[i].username && passwordInp.value == users[i].password) {
      loggedIn = true; //MIJENJAMO BOOLEAN loggedIn U true
      trenutniUser = users[i]; //STAVLJAMO VARIJABLU trenutniUser KAO users[i] JER SE TAJ USER ULOGIRAO
      PrikaziZapisnik(); //ZOVEMO FUNKCIJU PrikaziZapisnik
    }
  }
  //AKO JE BOOLEAN loggedIn false ONDA ZNAMO DA SE KORISNIK NIJE USPIO ULOGIRATI I ALERTAMO GA SA PORUKOM 
  if (!loggedIn) {
    alert("You have entered a wrong password or username!");
  }
}

function PrikaziZapisnik() {
  //MIJENJAMO HTML UNUTAR ELEMENTA container
  container.innerHTML = `<div class="row text-center text-white" id="row1">
    <h2 class="username" id="username">${trenutniUser.username}</h2>
    </div>
    <div class="row" id="row2">
    <div class="col-md-4" id="zapisivanje">
      <form class="text-white zapisivanje" onsubmit="return Zapisi(event)">
        <legend>Zapišite sate</legend>
        <div class="mb-3">
          <label for="imeAkcije" class="form-label">Upišite ime akcije</label>
          <input type="text" id="imeAkcije" class="form-control" placeholder="Crveni Križ">
        </div>
        <div class="mb-3">
          <label for="biljeska" class="form-label">Bilješka</label>
          <textarea class="form-control" id="biljeska" rows="3"></textarea>
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
          <label for="sati" class="form-label">Upišite broj sati</label>
          <input type="text" id="sati" class="form-control" placeholder="69">
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

  zapisaniEl = document.getElementById('zapisani'); //DOBIVAMO ELEMENT SA IDom zapisani

  for (let i = 0; i < trenutniUser.zapisano.length; i++) {
    let trenutniZapis = trenutniUser.zapisano[i]; //STVARAMO VARIJABLU KOJA SADRZI TRENUTNI ZAPIS KOJI JE JEDNAK OBJEKTU SA INDEXOM i U NIZU zapisano TRENUTNOG KORISNIKA
    
    //U HTML ELEMENTA zapisani DODAJEMO KARTICU SA INFORMACIJAMA O ZAPISANOM SATU
    zapisaniEl.innerHTML += `<div class="card zapisnik-card">
      <div class="card-body">
        <h5 class="card-title">${trenutniZapis.akcija}, ${trenutniZapis.mjesto}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Bilješka</h6>
        <p class="card-text">${trenutniZapis.biljeska}</p>
        <h6 class="card-subtitle mb-2 text-muted">${trenutniZapis.sati} sati</h6>
        <a href="${trenutniZapis.link}" target="_blank" class="btn btn-dark">Posjetite grupu</a>
      </div>
    </div>`
  }

}

function Zapisi(e) {
  e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE

  let imeAkcijeInp = document.getElementById('imeAkcije'); //DOBIVANJE INPUT ELEMENTA ZA IME AKCIJE
  let biljeskaInp = document.getElementById('biljeska'); //DOBIVANJE INPUT ELEMENTA ZA BILJESKU
  let mjestoInp = document.getElementById('biranjeMjesta'); //DOBIVANJE INPUT ELEMENTA ZA MJESTO
  let satiInp = document.getElementById('sati'); //DOBIVANJE INPUT ELEMENTA ZA SATE
  let linkInp = document.getElementById('link'); //DOBIVANJE INPUT ELEMENTA ZA LINK

  //U NIZ ZAPISANO TRENUTNOG USERA DODAJEMO NOVI OBJEKT KOJI STVARAMO POMOCU KONSTRUKTORSKE FUNCKIJE NapraviZapis
  trenutniUser.zapisano.push(new NapraviZapis(imeAkcijeInp.value, biljeskaInp.value, mjestoInp.value, satiInp.value, linkInp.value));
  let trenutniZapis = trenutniUser.zapisano[trenutniUser.zapisano.length - 1]; //STAVLJA TRENUTNI ZAPIS NA OVAJ KOJI SMO NAPRAVILI U PROSLOJ LINIJI KODA

  //DODAJEMO NJEGOVE INFORMACIJE KAKO KARTICU
  zapisaniEl.innerHTML += `<div class="card zapisnik-card">
    <div class="card-body">
      <h5 class="card-title">${trenutniZapis.akcija}, ${trenutniZapis.mjesto}</h5>
      <h6 class="card-subtitle mb-2 text-muted">BiljeŠka</h6>
      <p class="card-text">${trenutniZapis.biljeska}</p>
      <h6 class="card-subtitle mb-2 text-muted">${trenutniZapis.sati} sati</h6>
      <a href="${trenutniZapis.link}" target="_blank" class="btn btn-dark">Posjetite grupu</a>
    </div>
  </div>`
}

function NapraviZapis(imeAkcije, biljeska, mjesto, sati, link) {
  this.akcija = imeAkcije;
  this.biljeska = biljeska;
  this.mjesto = mjesto;
  this.sati = sati;
  this.link = link;
}