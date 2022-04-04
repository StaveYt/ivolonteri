let loggedIn = false; //STAVLJAMO DA USER NIJE ULOGIRAN

//STVARAMO OBJEKT KORISNIKA
let user0 = {
  username: "user0", 
  password: "user0123", 
  email: "userexample@gmail.com", 
  rank: "user", //U METODU rank STAVLJAMO RANK KORISNIKA (user ili admin)

  //U METODU records STAVARMO NIZ SA OBJEKTIMA KOJE IMAJU INFORMACIJE O AKCIJAMA U KOJEM JE KORISNIK SUDJELOVAO
  records: [
    {
      activity: "Boranka",
      place: "Split",
      note: "Na Mosoru smo sadili",
      hours: "10",
      link: "https://bit.ly/Ur3uM",
    },
    {
      activity: "EKO Zadar",
      place: "Zadar",
      note: "Bilo je vrlo zabavno",
      hours: "11",
      link: "https://bit.ly/Ur3uM",
    },
    {
      activity: "Crveni križ",
      place: "Split",
      note: "Pomagali smo beskućnicima",
      hours: "12",
      link: "https://bit.ly/Ur3uM",
    },
    {
      activity: "Bračke Šape",
      place: "Brač",
      note: "Išli smo na Brač pomagati životinjama",
      hours: "13",
      link: "https://bit.ly/Ur3uM",
    }
  ]
};
//STVARAMO OBJEKT ADMINA
let admin0 = {
  username: "admin0",
  password: "admin0123",
  email: "adminexample@gmail.com",
  rank: "admin",
  records: [],
};

//NIZ U KOJIMA STOJE SVI KORISNICI I PROVJERAVA SE JE LI VEC SPREMLJENA, AKO JE ONDA SE POSTAVLJA NA TAJ POHRANJENI NIZ
let users;
// localStorage.setItem('USERS',null);
if (JSON.parse(localStorage.getItem('USERS')) != null){ users = JSON.parse(localStorage.getItem('USERS')); }
else{ users = [user0, admin0]; }

//PROVJERAVA IMA LI SPREMLJENOG KORISNIKA U sessionStorage, AKO IMA ONDA STAVLJA currentUser NA NJEGA
let currentUser;
if(JSON.parse(sessionStorage.getItem('USER')) != null){ currentUser = JSON.parse(sessionStorage.getItem('USER')); loggedIn = true; }

//DOBIVANJE HTML ELEMENATA
let row0 = document.getElementById("row0"); 
let row1 = document.getElementById("row1");
let recordKeeperEl;

//KOMENTIRANO
function CheckStorage(){
  currentUser = JSON.parse(sessionStorage.getItem("USER")); //STAVLJA TRENUTNOG KORINSIKA KAO SPREMLJENI KORISNIK

  //PROVJERAVA JE LI TRENUTNI KORISNIK NULL, AKO NIJE ONDA PRIKAZUJE ZAPISNIK I STAVLJA loggedIn NA TRUE
  if (currentUser != null){
      loggedIn = true;
      ShowRecordKeeper();
  }
}

//KOMENTIRANO
function LogIn(){
  let username = document.getElementById("usernameInp").value;
  let password = document.getElementById("passwordInp").value;

  for (let i = 0; i < users.length; i++) {
    //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I IME I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK

    if (username == users[i].username && password == users[i].password) {
      loggedIn = true;
      currentUser = users[i];

      let savedRecords = JSON.parse(localStorage.getItem(`${currentUser.username}RECORDS`)); //U VARIJABLU savedRecords STAVLJAMO SPREMLJENE ZAPISE
      if(savedRecords != null){ currentUser.records = savedRecords; }
      sessionStorage.setItem("USER",JSON.stringify(currentUser)); //SPREMA OBJEKT USER U sessionStorage KOJI GA DRZI DOK SE TAB NE UGASI

      ShowRecordKeeper();
      location.reload();
    }
  }
  //AKO JE BOOLEAN false ONDA ZNAMO DA SE KORISNIK NIJE USPIO ULOGIRATI I ALERTAMO GA SA PORUKOM
  if (!loggedIn){
    alert("Unijeli ste pogrešnu lozinku ili korisničko ime!");
  }
}

//KOMENTIRANO
function ShowCreateAcc(){
  let topText = document.getElementById("topText");
  topText.innerText = "Napravite račun!";

  row1.innerHTML = `<form class="log-in text-light" id="log-in" onsubmit="CreateAcc(event);" style="margin-top: 5px;">
    <div class="form-floating mb-3 text-muted">
      <input type="text" class="form-control" id="usernameInp" placeholder="Korisničko Ime">
      <label for="username" class="form-label">Korisničko ime</label>
    </div>
    <div class="form-floating mb-3 text-muted">
      <input type="email" class="form-control" id="emailInp" placeholder="Email">
      <label for="email" class="form-label">Email</label>
    </div>
    <div class="form-floating mb-3 text-muted">
      <input type="password" class="form-control" id="passwordInp" placeholder="Lozinka">
      <label for="password" class="form-label">password</label>
    </div>
    <div class="form-floating mb-3 text-muted">
      <input type="password" class="form-control" id="confirmPasswordInp" placeholder="Potvrdite Lozinku">
      <label for="password" class="form-label">Potvrdite Lozinku</label>
    </div>
    <button type="submit" class="btn btn-primary">Potvrdi</button>
  </form>`;
}

//KOMENTIRANO
function CreateAcc(e){
  e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE

  //DOBIVANJE INFORMACIJA KOJE JE KORISNIK UNIO
  let username = document.getElementById("usernameInp").value;
  let email = document.getElementById("emailInp").value;
  let password = document.getElementById("passwordInp").value;
  let confirmPassword = document.getElementById("confirmPasswordInp").value;

  //PROVJERAVAMO JE LI KORISNIK UNIO SVE TOCNO I AKO NIJE OBAVJESTIMO GA
  if (password.length < 8){ alert("Šifra mora sadržavati barem 8 znakova, slova ili brojeva!"); }
  else if (password != confirmPassword){ alert("Šifre se ne podudaraju!"); }
  else{
    //U NIZ users NAPRA
    users.push(new CreateUser(username, password, email));
    localStorage.setItem('USERS',JSON.stringify(users));
    currentUser = users[users.length - 1];
    ShowRecordKeeper();
  }

}

//KOMENTIRANO
function ShowRecordKeeper(){
  container.innerHTML = `<div class="row text-center text-white" id="row0">
    <h2 class="username" id="username">${currentUser.username}</h2>
    </div>
    <div class="row" id="row1">
    <div class="col-md-4">
      <form class="text-white" onsubmit="TakeRecord(event)" id="form">
        <legend>Zapišite sate</legend>
        <div class="mb-3">
          <label for="activity" class="form-label">Upišite ime akcije</label>
          <input type="text" id="activity" class="form-control" placeholder="Crveni Križ">
        </div>
        <div class="mb-3">
          <label for="note" class="form-label">Bilješka</label>
          <textarea class="form-control" id="note" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <label for="choosePlace" class="form-label">Izaberite mjesto</label>
          <select id="choosePlace" class="form-select">
            <option disabled>Izaberite place</option>
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
          <label for="hours" class="form-label">Upišite broj sati</label>
          <input type="text" id="hours" class="form-control" placeholder="69">
        </div>
        <div class="mb-3">
          <label for="link" class="form-label">Upišite link</label>
          <input type="text" id="link" class="form-control" placeholder="https://bit.ly/Ur3um">
        </div>
        <button type="submit" class="btn btn-primary" style="display: inline-block">Dodaj</button>
      </form>
    </div>
    <div class="col text-dark" id="recordKeeper">
      </div>
    </div>
  </div>`;

  //DOBIVANJE HTML ELEMENATA
  row1 = document.getElementById('row1');
  recordKeeperEl = document.getElementById('recordKeeper');
  let formEl = document.getElementById('form');

  //AKO SE ULOGIRAO ADMIN DODAJEMO U HTML FORMA BOTUN ZA ICI NA ADMIN PANEL
  if (currentUser.rank == 'admin'){ formEl.innerHTML += `<a class="btn btn-success edit-activities-btn" href="adminPanel.html">Admin Panel</a>`; }

  //PREGLEDAVAMO JE LI BROJ ZAPISA KOJI KORISNIK IMA JEDNAK NULI, AKO JE DODAJEMO TEKST
  if (currentUser.records.length == 0){
    recordKeeperEl.innerHTML += `<div class="col justify-content-md-center filler-text text-white">
      <h3>Kada dodate satove ovdje će biti prikazani</h3>
    </div>`;
  } else{
    for (let i = 0; i < currentUser.records.length; i++){
      let currentRecord = currentUser.records[i]; //STVARAMO VARIJABLU KOJA SADRZI TRENUTNI ZAPIS KOJI JE JEDNAK OBJEKTU SA INDEXOM i U NIZU records TRENUTNOG KORISNIKA
      AddCard(currentRecord);
    }
  }
}

//KOMENTIRANO
function TakeRecord(e){
  e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE

  //DOBIVANJE INFORMACIJA KOJE JE KORISNIK UNIO
  let activity = document.getElementById("activity").value; 
  let note = document.getElementById("note").value; 
  let place = document.getElementById("choosePlace").value; 
  let hours = document.getElementById("hours").value; 
  let link = document.getElementById("link").value;

  //U records TRENUTNOG USERA DODAJEMO NOVI OBJEKT KOJI STVARAMO IONDA SPREMAMO USERA U sessionStorage
  currentUser.records.push(new CreateRecord(activity, note, place, hours, link));
  sessionStorage.setItem("USER",JSON.stringify(currentUser));
  let currentRecord = currentUser.records[currentUser.records.length - 1];
  
  AddCard(currentRecord);
}

//KOMENTIRANO
function CardRemove(activityName){
  //BRISE KARTICU SA STRANICE
  let activityCard = document.getElementById(activityName);
  recordKeeperEl.removeChild(activityCard);

  //BRISE ZAPIS IZ NIZA I SPREMA PROMJENE
  for(let i = 0; i < currentUser.records.length; i++){
    if (currentUser.records[i].activity == activityName){
      currentUser.records.splice(i, 1);
      sessionStorage.setItem("USER",JSON.stringify(currentUser));
    }
  }
}
//KOMENTIRANO
function AddCard(currentRecord){
  recordKeeperEl.innerHTML += `<div class="card zapisnik-card" id="${currentRecord.activity}">
    <div class="card-body">
      <div class="card-title">
        <h5 style="display: inline-block;">${currentRecord.activity}, ${currentRecord.place}</h5>
        <button type="button" class="btn btn-outline-danger card-remove" onclick="CardRemove('${currentRecord.activity}')">X</button>
      </div>
        <h6 class="card-subtitle mb-2 text-muted">Bilješka</h6>
        <p class="card-text">${currentRecord.note}</p>
        <h6 class="card-subtitle mb-2 text-muted">${currentRecord.hours} sati</h6>
      <a href="${currentRecord.link}" target="_blank" class="btn btn-dark card-link">Posjetite grupu</a>
    </div>
  </div>`;
  return;
}

//KONSTRUKTORSKE FUNKCIJE
function CreateUser(username, password, email) {
  this.username = username;
  this.password = password;
  this.email = email;
  this.rank = "user";
  this.records = [];
}

function CreateRecord(activity, note, place, hours, link) {
  this.activity = activity;
  this.note = note;
  this.place = place;
  this.hours = hours;
  this.link = link;
}