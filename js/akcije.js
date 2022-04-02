let bottomButtonEl = document.getElementById("bottomButton");
let bottomBoxEl = document.getElementById("bottomBox");

let hiddenBottom = true;
let activatedFilters = [];

window.addEventListener("load", PageLoad);

function PrikaziDiv(){

  bottomButtonEl.classList.toggle("hidden-bottom-button");
  if (hiddenBottom){
    bottomButtonEl.innerText = "-";
    hiddenBottom = false;
  } else{
    bottomButtonEl.innerText = "+";
    hiddenBottom = true;
  }

  bottomBoxEl.classList.toggle("hidden-bottom-items");
  return;
}

function AdminLogIn(e){
  e.preventDefault();
  
  let username = getElementById('usernameInp').value;
  let password = getElementById('passwordInp').value;

  for (let i = 0; i < users.length; i++){
    //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I PASSWORD I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK I STAVLJAMO GA KAO TRENUTNI USER
    if (username == users[i].username && password == users[i].password){
      if (users[i].rank == "admin") {
        loggedIn = true;
        currentUser = users[i]; 
        ShowAcitivtyEdit();
      }
    }
  }
  //AKO JE BOOLEAN loggedIn false ONDA ZNAMO DA SE KORISNIK NIJE USPIO ULOGIRATI I ALERTAMO GA SA PORUKOM
  if (!loggedIn){
    alert("You have entered a wrong password or username or a non-admin account!");
  }
}

function ShowAcitivtyEdit(){
  bottomBoxEl.innerHTML = `<div class="row text-center text-white" id="row1">
    <h2 class="username" id="username">${currentUser.username}</h2>
    </div>
    <div class="row" id="row2">
    <div>
      <form class="text-white" onsubmit="return AddActivity(event)">
        <legend>Dodaj Akciju</legend>
        <div class="mb-3">
          <label for="name" class="form-label">Upišite ime akcije</label>
          <input type="text" id="name" class="form-control" placeholder="Crveni Križ">
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">Dodajte Sliku</label>
          <input class="form-control" type="file" id="imageFile">
        </div>
        <div class="mb-3">
          <label for="discription" class="form-label">Opis</label>
          <textarea class="form-control" id="opis" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <label for="biranjeMjesta" class="form-label">Izaberite place</label>
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
    <div class="zapisani col text-dark" id="zapisani"></div>
    </div>
  </div>`;
}

function AddActivity(e) {
  e.preventDefault();

  let name = document.getElementById("name").value; 
  let discription = document.getElementById("discription").value;
  let place = document.getElementById("biranjeMjesta").value;
  let imageFile = document.getElementById("imageFile");
  let link = document.getElementById("link").value;

  activities.push(new CreateActivity(name, discription, place, link));
  AddActivityCard(activities[activities.length - 1]);
}

function CreateActivity(ime, discription, place, link){
  this.ime = ime;
  this.discription = discription;
  this.place = place;
  this.link = link;
  this.alt = "";
  this.image = "";
}

function PageLoad(){
  if (sessionStorage.getItem('RANK') == "admin"){
    let username = sessionStorage.getItem('USERNAME');
    let password = sessionStorage.getItem('USERNAME');

    PrikaziDiv();
    
    for (let i = 0; i < users.length; i++){
      //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I PASSWORD I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK
      if (username = users[i].username && password == users[i].password){
        loggedIn = true;
        currentUser = users[i];
        ShowAcitivtyEdit();
      }
    }
  }

  ShowAll();
}

function Filter(izabraniType){
  let izabraniCheck = document.getElementById(`${izabraniType}Check`);

  if (izabraniCheck.value != "") {
    izabraniCheck.value = "";

    activatedFilters.splice(activatedFilters.indexOf(izabraniType), 1);

    if (activatedFilters.length == 0){
      container.innerHTML = "";
      ShowAll();
    } else{ DeleteExcess(izabraniType); }

  } else{
    izabraniCheck.value = "on";

    if (activatedFilters.length == 0){ container.innerHTML = ""; }
    activatedFilters.push(izabraniType);

    for (let i = 0; i < activities.length; i++) {
      let dodan = false;
      let trenutniType = activities[i].type.split(" ");

      for (let j = 0; j < trenutniType.length; j++) {
        if (izabraniType == trenutniType[j] && !dodan) {
          AddActivityCard(activities[i]);
          dodan = true;
        }
      }
    }

  }
}

function DeleteExcess(izabraniType){
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].type.includes(izabraniType)) {
      let activityCard = document.getElementById(activities[i].ime);
      container.removeChild(activityCard);
    }
  }
}

function ShowAll(){
  for (let i = 0; i < activities.length; i++){
    AddActivityCard(activities[i]);
  }
}