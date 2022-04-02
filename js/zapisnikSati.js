//STVARAMO OBJEKT KORISNIKA
let user0 = {
  username: "user0", 
  password: "user0", 
  email: "example@gmail.com", 
  rank: "user", //U METODU rank STAVLJAMO RANK KORISNIKA (user ili admin)

  //U METODU records STAVARMO NIZ SA OBJEKTIMA KOJE IMAJU INFORMACIJE O AKCIJAMA U KOJEM JE KORISNIK SUDJELOVAO
  records: [{
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
  password: "admin0",
  email: "adminexample@gmail.com",
  rank: "admin",
  records: [],
};

let loggedIn = false; //BOOLEAN KOJI OZNAČAVA JE LI KORISNIK loggedIn ILI NIJE
let users = [user0, admin0]; //NIZ U KOJEMU SU SVI KORISNICI
let currentUser = users[0]; //VARIJABLA U KOJOJ SE NALAZI TRENUTNI KORISNIK (kao placeholder je korisnik sa indexom 0)

let row0 = document.getElementById("row0"); //DOBIVANJE DIV ELEMENTA KOJI IMA ID row0
let row1 = document.getElementById("row1"); //DOBIVANJE DIV ELEMENTA KOJI IMA ID row1

let createAccBtn = document.getElementById("createAccBtn"); //DOHVAĆA BUTTON ELEMENT KOJI IMA ID createAccBtn

let recordKeeperEl; //DEFINIRAMO VARIJABLU recordKeeperEl U KOJU ĆEMO POSLIJE DODATI DIV ELEMENT

function CheckStorage() {
  if (sessionStorage.getItem("USERNAME") != undefined && sessionStorage.getItem("PASSWORD") != undefined){
    let username = sessionStorage.getItem("USERNAME");
    let password = sessionStorage.getItem("PASSWORD");

    for (let i = 0; i < users.length; i++) {
      //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I password I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK
      if (username == users[i].username && password == users[i].password) {
        loggedIn = true;
        currentUser = users[i]; 
        ShowRecordKeeper();
      }
    }
  }
}

function LogIn(){
  let username = document.getElementById("usernameInp").value;
  let password = document.getElementById("passwordInp").value;

  //PETLJA
  for (let i = 0; i < users.length; i++) {
    //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I password I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK

    if (username == users[i].username && password == users[i].password) {
      loggedIn = true; //MIJENJAMO BOOLEAN loggedIn U true
      currentUser = users[i]; //STAVLJAMO VARIJABLU currentUser KAO users[i] JER SE TAJ USER ULOGIRAO

      sessionStorage.setItem("USERNAME", users[i].username);
      sessionStorage.setItem("PASSWORD", users[i].password);
      sessionStorage.setItem("RANK", users[i].rank);

      ShowRecordKeeper(); //ZOVEMO FUNKCIJU ShowRecordKeeper
    }
  }
  //AKO JE BOOLEAN false ONDA ZNAMO DA SE KORISNIK NIJE USPIO ULOGIRATI I ALERTAMO GA SA PORUKOM
  if (!loggedIn){
    alert("Unijeli ste pogrešnu lozinku ili korisničko ime!");
  }
}

function ShowRecordKeeper(){
  //MIJENJAMO HTML UNUTAR ELEMENTA container
  container.innerHTML = `<div class="row text-center text-white" id="row0">
    <h2 class="username" id="username">${currentUser.username}</h2>
    </div>
    <div class="row" id="row1">
    <div class="col-md-4" >
      <form class="text-white" id="zapisivanje" onsubmit="return TakeRecord(event)">
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
          <label for="biranjeMjesta" class="form-label">Izaberite mjesto</label>
          <select id="biranjeMjesta" class="form-select">
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
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="col text-dark" id="recordKeeper">
      </div>
    </div>
  </div>`;

  row1 = document.getElementById("row1");
  zapisaniEl = document.getElementById("zapisani"); //DOBIVAMO ELEMENT SA ID-OM zapisani
  let zapisavanjeEl = document.getElementById("zapisivanje");

  if (currentUser.rank == "admin"){
    zapisavanjeEl.innerHTML += `<a class="btn btn-success uredite-akcije-btn" href="akcije.html">Uredite akcije</a>`;
    console.log("admin");
  }

  if (currentUser.records.length == 0){
    recordKeeperEl.innerHTML += ` <div class="col justify-content-md-center filler-text text-white">
      <h3>Kada dodate satove ovdje će biti prikazani</h3>
    </div>`;
  } else{
    for (let i = 0; i < currentUser.records.length; i++){
      let currentRecord = currentUser.records[i]; //STVARAMO VARIJABLU KOJA SADRZI TRENUTNI ZAPIS KOJI JE JEDNAK OBJEKTU SA INDEXOM i U NIZU records TRENUTNOG KORISNIKA
      AddCard(currentRecord);
    }
  }
}

function TakeRecord(e){
  e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE

  let activity = document.getElementById("activity").value; //DOBIVANJE VRIJEDNOSTI ZA IME AKCIJE
  let note = document.getElementById("note").value; //DOBIVANJE VRIJEDNOSTI ZA BILJESKU
  let place = document.getElementById("biranjeMjesta").value; //DOBIVANJE VRIJEDNOSTI ZA place
  let hours = document.getElementById("hours").value; //DOBIVANJE VRIJEDNOSTI ZA SATE
  let link = document.getElementById("link").value; //DOBIVANJE VRIJEDNOSTI ZA LINK

  //U NIZ records TRENUTNOG USERA DODAJEMO NOVI OBJEKT KOJI STVARAMO POMOCU KONSTRUKTORSKE FUNCKIJE AddRecord
  currentUser.records.push(new AddRecord(activity, note, place, hours, link));

  let currentRecord = currentUser.records[currentUser.records.length - 1]; //STAVLJA TRENUTNI ZAPIS NA OVAJ KOJI SMO NAPRAVILI U PROSLOJ LINIJI KODA
  AddCard(currentRecord);
}

function AddRecord(activity, note, place, hours, link) {
  this.activity = activity;
  this.note = note;
  this.place = place;
  this.hours = hours;
  this.link = link;
}

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

function CreateAcc(e){
  e.preventDefault();

  let username = document.getElementById("usernameInp").value;
  let email = document.getElementById("emailInp").value;
  let password = document.getElementById("passwordInp").value;
  let confirmPassword = document.getElementById("confirmPasswordInp").value;

  if (password.length < 8){ alert("Šifra mora sadržavati barem 8 znakova, slova ili brojeva!"); }
  else if (password != confirmPassword){ alert("Šifre se ne podudaraju!"); }
  else{
    users.push(new AddUser(username, password, email));
    currentUser = users[users.length - 1];
    ShowRecordKeeper();
  }

}

function AddUser(username, password, email) {
  this.username = username;
  this.password = password;
  this.email = email;
  this.rank = "user";
  this.records = [];
}

function AddCard(currentRecord){
  //U HTML ELEMENTA recordKeeper DODAJEMO KARTICU SA INFORMACIJAMA O recordsM SATU
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
}

function CardRemove(activityName){
  let activityCard = document.getElementById(activityName);
  recordKeeperEl.removeChild(activityCard);

  for(let i = 0; i < currentUser.records.length; i++){
    if (currentUser.records[i].activity == activityName){
      currentUser.records.splice(i, 1);
      console.log(currentUser.records);
    }
  }
}
