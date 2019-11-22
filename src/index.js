let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})

function getToy() {
  // 2
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  // 3
  .then(toys => {
    // iterate through toys 
    toys.forEach(toy => displayToy(toy))
  })
}

// html template card
// 5
function toyCard(toy){
  return `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} </p>
    <button class="like-btn">Like <3</button>
  </div>
  `
}

// attach to DOM 
// 4
const displayToy = toy => {
  const toyCollection = document.querySelector("#toy-collection");
  // debugger
  toyCollection.innerHTML += toyCard(toy)
}

// 1
getToy()
