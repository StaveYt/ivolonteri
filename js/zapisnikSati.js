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
        biljeska: "Na Mosoru smo sadili ",
        sati: "10",
        link: ""
    }, zapis1 = {
        akcija: "akcija",
        mjesto: "mjesto",
        biljeska: "Neka kratka biljeska o tome sta ste radili",
        sati: "11",
        link: ""
    }, zapis2 = {
        akcija: "akcija",
        mjesto: "mjesto",
        biljeska: "Neka kratka biljeska o tome sta ste radili",
        sati: "12",
        link: ""
    }, zapis3 = {
        akcija: "akcija",
        mjesto: "mjesto",
        biljeska: "Neka kratka biljeska o tome sta ste radili",
        sati: "13",
        link: "https://bit.ly/Ur3uM"
    }
    ]
}; let admin0 = {
    username: "admin0",
    password: "admin0",
    rank: "admin"
}

let users = [user0, admin0]; //NIZ U KOJEMU SU SVI KORISNICI

let usernameInp = document.getElementById('username-inp');
let passwordInp = document.getElementById('password-inp');
let logInForm = document.getElementById('log-in');
let row1 = document.getElementById('row1');

//DEFINIRAMO VARIJABLE U KOJE ĆEMO POSLI STAVLJAT INFORMACIJE
let zapisani;

let zapisivanjeFormvanje;
let imeAkcijeInpije;
let biljeskaInpka;
let mjestoInp;
let satiInp;
let linkInp;

//VARIJABLA U KOJOJ SE NALAZI TRENUTNI KORISNIK (kao placeholder je korisnik sa indexom 0)
let trenutniUser = users[0]; 

function LogIn(e){
    e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE
    
    for(let i = 0; i < users.length; i++){

        //PREGLEDAVAMO JE LI 
        if(usernameInp.value == users[i].username && passwordInp.value == users[i].password){
            alert("YOU HAVE LOGGED IN");
            row1.removeChild(logInForm);
            PrikažiZapisnik(i);
        }

    }

    console.log('test');
}

function PrikažiZapisnik(id){
    trenutniUser = users[id];

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
            <option value="Šibenik">Šibenik</option>
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
        <button type="submit" class="btn btn-secondary">Submit</button>
      </form>
    </div>
    <div class="zapisani col" id="zapisani">
      </div>
    </div>
    </div>`;

    zapisaniEl = document.getElementById('zapisani');

    for(let i = 0; i < trenutniUser.zapisano.length; i++){
        let trenutniZapis = trenutniUser.zapisano[i];
        zapisaniEl.innerHTML += `<div class="card" style="width: 18rem; margin: 2px; display: inline-block;">
        <div class="card-body">
          <h5 class="card-title">${trenutniZapis.akcija}, ${trenutniZapis.mjesto}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Biljeska</h6>
          <p class="card-text">${trenutniZapis.biljeska}</p>
          <h6 class="card-subtitle mb-2 text-muted">${trenutniZapis.sati} sati</h6>
          <a href="${trenutniZapis.link}" class="card-link link-dark">Posjetite grupu</a>
        </div>
      </div>`
    }

    zapisivanjeForm = document.getElementById('zapisivanje');
    imeAkcijeInp = document.getElementById('imeAkcije');
    biljeskaInp = document.getElementById('biljeska');
    mjestoInp = document.getElementById('biranjeMjesta');
    satiInp = document.getElementById('sati');
    linkInp = document.getElementById('link');
}

function Zapisi(e){
  e.preventDefault();

    trenutniUser.zapisano.push(new NapraviZapis(imeAkcijeInp.value, biljeskaInp.value, mjestoInp.value, satiInp.value, linkInp.value));
    let trenutniZapis = trenutniUser.zapisano[trenutniUser.zapisano.length - 1];

    zapisaniEl.innerHTML += `<div class="card" style="width: 18rem; margin: 2px; display: inline-block;">
    <div class="card-body">
      <h5 class="card-title">${trenutniZapis.akcija}, ${trenutniZapis.mjesto}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Biljeska</h6>
      <p class="card-text">${trenutniZapis.biljeska}</p>
      <h6 class="card-subtitle mb-2 text-muted">${trenutniZapis.sati} sati</h6>
      <a href="${trenutniZapis.link}" class="card-link link-dark">Posjetite grupu</a>
    </div>
    </div>`
}

function NapraviZapis(imeAkcije, biljeska, mjesto, sati, link){
    this.akcija = imeAkcije;
    this.biljeska = biljeska;
    this.mjesto = mjesto;
    this.sati = sati;
    this.link = link;
}