let usersContainerEl = document.getElementById('usersContainer');

function PageLoadAdminP(){
    ShowActivities();
    ShowUsers();
}

function ShowActivities(){
    for(let i = 0; i < activities.length; i++){
        currentActivity = activities[i];
        container.innerHTML += `<div class="card activity-card" id="${currentActivity.name}">
            <img src="${currentActivity.image}" class="card-img-top" alt="${currentActivity.alt}">
            <div class="card-body">
                <h5 class="card-title" style="display: inline-block;">${currentActivity.name}, ${currentActivity.place}</h5>
                <button type="button" class="btn btn-outline-danger card-remove" onclick="RemoveActivityCard('${currentActivity.name}')">X</button>
                <p class="card-text">${currentActivity.discription}</p>
                <a href="${currentActivity.link}" class="btn btn-success activity-card-btn">Posjetite stranicu akcije</a>
            </div>
        </div>`
    }
}

function ShowUsers(){
    for(let i = 0; i < users.length; i++){
        if(users[i].username != currentUser.username){
            console.log(users[i]);
            console.log(currentUser);

            if (users[i].rank == 'admin'){
                usersContainerEl.innerHTML += `<div class="user-manager" id="${users[i].username}">
                    <h4>${users[i].username}</h4>
                    <button class="btn btn-primary" onclick="ChangeRank('${users[i].username}')" id="changeRank">Make User</button>
                    <button type="button" class="btn btn-outline-danger" onclick="DeleteAcc('${users[i].username}')">X</button>
                </div>`
            } else{
                usersContainerEl.innerHTML += `<div class="user-manager" id="${users[i].username}">
                    <h4>${users[i].username}</h4>
                    <button class="btn btn-primary" onclick="ChangeRank('${users[i].username}')" id="changeRank">Make Admin</button>
                    <button type="button" class="btn btn-outline-danger" onclick="DeleteAcc('${users[i].username}')">X</button>
                </div>`
            }
        }
    }
}

function DeleteAcc(user){
    let userCard = document.getElementById(user);
    usersContainerEl.removeChild(userCard);
    for (let i = 0; i < users.length; i++){
        if (users[i].username == user){users.splice(i, 1);}
    }

    localStorage.setItem('USERS',JSON.stringify(users));
}

function ChangeRank(user){
    let temporaryUser;
    for (let i = 0; i < users.length; i++){
        if(users[i].username == user){
            if(users[i].rank == 'admin'){
                users[i].rank = 'user';
            }
            else if(users[i].rank == 'user'){
                users[i].rank = 'admin';
            }
            localStorage.setItem('USERS',JSON.stringify(users));
            location.reload();
        }
    }
}

function RemoveActivityCard(activity){
    container.removeChild(document.getElementById(activity));
    for(let i = 0; i < activities.length; i++){
        if(activities[i].name == activity){ 
            activities.splice(i, 1); 
            localStorage.setItem('ACTIVITIES',JSON.stringify(activities));
        }
    }
}