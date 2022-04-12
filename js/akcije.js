let hiddenBottom = true;
let activatedFilters = [];

let uploadedImage;

//DOBIVANJE ELEMENATA SA STRANICE
let bottomButtonEl = document.getElementById("bottomButton");
let bottomBoxEl = document.getElementById("bottomBox");

//STVARA FUNKICIJU U VARIJABLI toBase64 SA ARGUMENTON file KOJA POSTAJE PROMISE
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader(); //VARIJABLU reader PRETVARA U FILEREADER
  reader.readAsDataURL(file); //DOBIVA NAM PATH DO SLIKE
  reader.onload = () => resolve(reader.result); //DAJE NAM RESULTAT KAO PATH DO SLIKE
  reader.onerror = error => reject(error); //AKO BUDE ERROR DAJE NAM GA DA GA MOZEMO ISPISATI
});

function PageLoad(){
  AddAllActivities();
}

//ZOVE SE KADA SE KLIKNE CRVENI BOTUN NA akcije.html
function ShowDiv(){

  //AKTIVIRAMO ILI DEAKTIVIRAMO KLASE OVISNO JE LI KORISNIK HTIO SAKRITI ILI PRIKAZATI DIV
  bottomButtonEl.classList.toggle('hidden-bottom-button');
  bottomBoxEl.classList.toggle('hidden-bottom-items');

  //OVISNO JE LI DIV PRIKAZAN ILI NE MIJENJA TEKST BOTUNA NA - ILI +
  if (hiddenBottom){
    bottomButtonEl.innerText = '-';
    hiddenBottom = false;
  } else{
    bottomButtonEl.innerText = '+';
    hiddenBottom = true;
  }
  
  //AKO IMA ULOGIRANOG KORISNIKA PROVJERAVAMO KOJI JE RANK
  if (JSON.parse(sessionStorage.getItem('USER')) != null){ CheckUser(); }
}

function CheckUser(){
  currentUser = JSON.parse(sessionStorage.getItem('USER')); //DOBIVA TRENUTNOG KORISNIKA IZ PODATAKA SPREMLJENIH U sessionStorage 

  //PROVJERAVAMO JE LI TRENTUTNI KORISNIK ADMIN I AKO JE ONDA GA ULOGIRAMO DA MOZE DODAVAT AKCIJE
  if (currentUser.rank == 'admin'){
    loggedIn = true;
    ShowActivityEdit();
  }
}

//ZOVE SE NA SUBMITU FORMA ZA PRIJAVU NA akcije.html
function AdminLogIn(e){
  e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE
  //DOBIVAMO INFORMACIJE KOJE JE KORISNIK UNIO
  let username = document.getElementById('usernameInp').value;
  let password = document.getElementById('passwordInp').value;

  for (let i = 0; i < users.length; i++){
    //PREGLEDAVAMO JE LI KORISNIK UNIO TOCNO KORISNICKO IME I SIFRU I AKO JE ADMIN ONDA MU POKAZEMO FORM ZA DODAVAT AKCIJE
    if (username == users[i].username && password == users[i].password){
      if (users[i].rank == 'admin') {
        loggedIn = true;
        currentUser = users[i]; 
        
        sessionStorage.setItem('USER',JSON.stringify(currentUser)); //U sessionStorage SPREMA SE ULOGIRANI KORISNIK
        bottomBoxEl.innerHTML = `
          <div class="row text-center text-white">
            <h2 class="username" id="username">${currentUser.username}</h2>
          </div>
          <div class="row">
            <div>
              <form class="text-white" onsubmit="AddActivity(event)">
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
                <div class="mb-3">
                  <label for="tagInp" class="form-label">Odaberite tagove akcije</label>
                  <select class="form-select" id="tagInp" aria-label="Default select example">
                    <option selected disabled>Izaberite tag</option>
                    <option value="zivotinje">Životinje</option>
                    <option value="stariji">Stariji</option>
                    <option value="beskucnici">Beskućnici</option>
                    <option value="doniranje">Doniranje</option>
                    <option value="djeca">Djeca</option>
                    <option value="edukacija">Edukacija</option>
                    <option value="ekologija">Ekologija</option>
                    <option value="razvojDrustva">Razoj Društva</option>
                    <option value="mladi">Mladi</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        `;
      }
    }
  }

  //AKO JE BOOLEAN loggedIn false ONDA ZNAMO DA SE KORISNIK NIJE USPIO ULOGIRATI I ALERTAMO GA SA PORUKOM
  if (!loggedIn){
    alert("You have entered a wrong password or username or a non-admin account!");
  }
}

function FileUpload() {
  let uploadedFile = document.getElementById('imageFile').files[0]; //DOBIVAMO PRENESENU SLIKU

  //PROVJERAVAMO JE LI PRENESENA SLIKA MANJA OD LIMITA IONDA  I STAVLJAMO GA U VARIJABLU uploadedImage
  if(uploadedFile.size < 3000001){
      toBase64(uploadedFile) //VRTIMO FUNKCIJU toBase64() IZ KOJE DOBIVAMO LINK DO PRENESENE SLIKE
      .then(res => { 
          uploadedImage = res; //STAVLJAMO uploadedImage KAO PATH DO SLIKE
      })
      .catch(err => {
          console.log(err); //AKO IMA GRESKA ISPISUJEMO JU U KONZOLU
      })
  } else{
      alert("Slika pre velika, mora biti manja od 3mb"); //AKO JE SLIKA PREVELIKA ONDA ALERTAMO KORISNIKA
  }
} 

//ZOVE SE NA SUBMITU FORMA ZA DODAT AKCIJU 
function AddActivity(e) {
  e.preventDefault(); //ZAUSTAVLJA REFRESH STRANICE

  //DOBIVANJE UNESENIH INFORMACIJA
  let name = document.getElementById('nameInp').value; 
  let discription = document.getElementById('discriptionInp').value;
  let place = document.getElementById('placeInp').value;
  let imageFile = uploadedImage;
  let tag = document.getElementById('tagInp').value;
  let link = document.getElementById('linkInp').value;

  //DODAVANJE NOVODODANE AKCIJE U NIZ activities IONDA SPREMAMO PROMJENE U NIZU U localStorage I ZATI
  activities.push(new CreateActivity(name, discription, place, link, imageFile, tag));
  localStorage.setItem('ACTIVITIES',JSON.stringify(activities));
  AddActivityCard(activities[activities.length - 1]);
}

//ZOVE SE KADA KORISNIK AKTIVIRA/DEAKTIVIRA FILTER
function Filter(chosenTag){
  let chosenChecks = document.getElementById(`${chosenTag}Check`); //DOBIVAMO ELEMENT FILTERA KOJEG JE KORISNIK UKLJUCIO

  //PROVJERAVAMO JE LI KORISNIK UPALIO ILI UGASIO FILTER
  if (chosenChecks.value != '') { //FILTER KORISNIK JE UGASIO FILTER
    chosenChecks.value = '';

    activatedFilters.splice(activatedFilters.indexOf(chosenTag), 1);//BRISEMO FILTER IZ NIZA activatedFilters

    //AKO JE OVO BIO ZADNJI UPALJENI FILTER ONDA SE DODAJU NAZAD SVE KARTICE, AKO NIJE ONDA SAMO BRISEMO KARTICE SA TIM TIPOM
    if (activatedFilters.length == 0){
      container.innerHTML = '';
      AddAllActivities();
    } 
    else{ DeleteExcess(chosenTag); }

  } else{ //KORISNIK JE UPALIO FILTER
    chosenChecks.value = 'on';

    if (activatedFilters.length == 0){ container.innerHTML = ''; } //AKO JE OVO PRVI UPALJENI FILTER ONDA CISTIMO CONTAINER
    activatedFilters.push(chosenTag);

    for (let i = 0; i < activities.length; i++) {
      let dodan = false;
      let currentTag = activities[i].tag;

      //AKO TAGOVI AKCIJE SADRZE TAG FILTERA ONDA DODAJEMO KARTICU TE AKCIJE
      if(currentTag.includes(chosenTag) && !dodan){
        AddActivityCard(activities[i]);
        dodan = true;
      }
    }
  }
}

function DeleteExcess(chosenTag){
  //PREGLEDAVAMO KROZ NIZ activities DOK NE NADEMO AKCIJU KOJA SADRZI chosenTag IONDA MOZEMO MAKNITI NJEZINU KARTICU
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].tag.includes(chosenTag)) {
      let activityCard = document.getElementById(activities[i].name);
      container.removeChild(activityCard);
    }
  }
}

//KONSTRUKTORSKA FUNKCIJA
function CreateActivity(name, discription, place, link, image, tag){
  this.name = name;
  this.discription = discription;
  this.place = place;
  this.link = link;
  this.alt = name;
  this.image = image;
  this.tag = tag;
}
