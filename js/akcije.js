let bottomButtonEl = document.getElementById("bottomButton");
let bottomBoxEl = document.getElementById("bottomBox");

sessionStorage.setItem('ADMINLOGGEDIN','false');

let hiddenBottom = true;
let activatedFilters = [];

let uploadedImage;

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

function PageLoad(){
  if(sessionStorage.getItem('OPENEDIT') == 'true'){ ShowDiv(); }
  ShowAll();
}

function ChechUser(){
  currentUser = JSON.parse(sessionStorage.getItem('USER'));
  sessionStorage.setItem('OPENEDIT','false');

  if (currentUser.rank == 'admin'){
    let username = currentUser.username;
    let password = currentUser.password;

      //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I PASSWORD I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK
    if (username = currentUser.username && password == currentUser.password){
      loggedIn = true;
      ShowActivityEdit();
    }
  }
}

//PODIŽE DIV ZA DODAVANJE AKCIJA I MIJENJA TEKST BOUTUNA IS PLUSA U MINUS
function ShowDiv(){

  bottomButtonEl.classList.toggle('hidden-bottom-button');
  if (hiddenBottom){
    bottomButtonEl.innerText = '-';
    hiddenBottom = false;
  } else{
    bottomButtonEl.innerText = '+';
    hiddenBottom = true;
  }
  bottomBoxEl.classList.toggle('hidden-bottom-items');
  if (JSON.parse(sessionStorage.getItem('USER')) != null){ ChechUser(); }
}

function AdminLogIn(){
  let username = document.getElementById('usernameInp').value;
  let password = document.getElementById('passwordInp').value;

  for (let i = 0; i < users.length; i++){
    //PREGLEDAVAMO JE LI KORISNIK UNIO TOČNU SIFRU I PASSWORD I AKO JE ONDA MU PRIKAZUJEMO NJEGOV ZAPISNIK I STAVLJAMO GA KAO TRENUTNI USER
    if (username == users[i].username && password == users[i].password){
      if (users[i].rank == "admin") {
        loggedIn = true;
        currentUser = users[i]; 
        
        sessionStorage.setItem("USER",JSON.stringify(currentUser)); //NIZ NOVO DODANIH ZIVOTINJA SE PRETVARA U STRING I SPREMA U sessionSTORAGE
        sessionStorage.setItem('OPENEDIT','true');    
        ShowActivityEdit();
      }
    }
  }

  //AKO JE BOOLEAN loggedIn false ONDA ZNAMO DA SE KORISNIK NIJE USPIO ULOGIRATI I ALERTAMO GA SA PORUKOM
  if (!loggedIn){
    alert("You have entered a wrong password or username or a non-admin account!");
  }
}

function ShowActivityEdit(){
  bottomBoxEl.innerHTML = `<div class="row text-center text-white">
    <h2 class="username" id="username">${currentUser.username}</h2>
    </div>
    <div class="row">
    <div>
      <form class="text-white" onsubmit="return AddActivity(event)">
        <legend>Dodaj Akciju</legend>
        <div class="mb-3">
          <label for="nameInp" class="form-label">Upišite ime akcije</label>
          <input type="text" id="nameInp" class="form-control" placeholder="Crveni Križ">
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">Dodajte Sliku</label>
          <input class="form-control" type="file" id="imageFile" onchange="FileUpload()">
        </div>
        <div class="mb-3">
          <label for="discriptionInp" class="form-label">Opis</label>
          <textarea class="form-control" id="discriptionInp" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <label for="placeInp" class="form-label">Upišite grad (ako je više odvajate ih zarezom)</label>
          <input type="text" id="placeInp" class="form-control" placeholder="Split, Šolta">
        </div>
        <div class="mb-3">
          <label for="linkInp" class="form-label">Upišite link</label>
          <input type="text" id="linkInp" class="form-control" placeholder="https://bit.ly/Ur3um">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>`;
}

function AddActivity(e) {
  e.preventDefault();

  let name = document.getElementById('nameInp').value; 
  let discription = document.getElementById('discriptionInp').value;
  let place = document.getElementById('placeInp').value;
  let imageFile = uploadedImage;
  let link = document.getElementById('linkInp').value;

  activities.push(new CreateActivity(name, discription, place, link, imageFile));
  localStorage.setItem('ACTIVITIES',JSON.stringify(activities));
  AddActivityCard(activities[activities.length - 1]);
}

function Filter(chosenType){
  let chosenChecks = document.getElementById(`${chosenType}Check`);

  if (chosenChecks.value != "") {
    chosenChecks.value = "";

    activatedFilters.splice(activatedFilters.indexOf(chosenType), 1);

    if (activatedFilters.length == 0){
      container.innerHTML = "";
      ShowAll();
    } else{ DeleteExcess(chosenType); }

  } else{
    chosenChecks.value = "on";

    if (activatedFilters.length == 0){ container.innerHTML = ""; }
    activatedFilters.push(chosenType);

    for (let i = 0; i < activities.length; i++) {
      let dodan = false;
      let trenutniType = activities[i].type.split(" ");

      for (let j = 0; j < trenutniType.length; j++) {
        if (chosenType == trenutniType[j] && !dodan) {
          AddActivityCard(activities[i]);
          dodan = true;
        }
      }
    }

  }
}

function DeleteExcess(chosenType){
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].type.includes(chosenType)) {
      let activityCard = document.getElementById(activities[i].name);
      container.removeChild(activityCard);
    }
  }
}

function FileUpload() {
  let uploadedFile = document.getElementById('imageFile').files[0];
  console.log("on file upload");

  if(uploadedFile.size<=3000000){
      toBase64(uploadedFile)
      .then(res => {
          uploadedImage = res;
      })
      .catch(err => {
          console.log(err);
      })
  }
  else{
      alert("Slika pre velika, mora biti manja od 3mb");
  }
} 

function CreateActivity(name, discription, place, link, image){
  this.name = name;
  this.discription = discription;
  this.place = place;
  this.link = link;
  this.alt = "";
  this.image = image;
}
