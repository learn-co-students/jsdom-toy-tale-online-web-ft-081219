let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function getToy() {
  // 2
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    // 3
    .then(toys => {
      // iterate through toys
      toys.forEach(toy => displayToy(toy));
    });
}

// html template card
// 5
function toyCard(toy) {
  return `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} </p>
    <button class="like-btn">Like <3</button>
  </div>
  `;
}

// attach to DOM
// 4
const displayToy = toy => {
  const toyCollection = document.querySelector("#toy-collection");
  // debugger
  toyCollection.innerHTML += toyCard(toy);
};

function addToyCard() {
  const newToyForm = document.querySelector(".add-toy-form");
  newToyForm.addEventListener("submit",function(e){
    e.preventDefault();
    let nameInput = this.querySelector("#toy-name").value;
    let imgInput = this.querySelector("#toy-image").value;

    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nameInput,
        imgInput,
        "likes" : 0
      }),
    }).then(resp => resp.json())
    .then(displayToy)
  });
}

// 1
getToy();
addToyCard();
