let addToy = false

document.addEventListener("DOMContentLoaded", () => {
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

  // my code:

  function inputToys() {
    const inputElement = document.querySelector(".add-toy-form")

    inputElement.addEventListener("submit", function (e) {
      e.preventDefault();
      let toyName = document.querySelector("#input-name").value
      let toyImage = document.querySelector("#input-image").value

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: `${toyName}`,
          image: `${toyImage}`,
          likes: 0
        })
      }).then(resp => resp.json())
        .then(addCard)
    })
  }

  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(toys => {
        toys.forEach(toy => postToDom(toy))
      })
  }


  function addCard(toy) {
    return `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn">Like <3</button>
    </div>
    `
  }

  function postToDom(toy) {
    const toyCollection = document.querySelector("#toy-collection")
    toyCollection.innerHTML += addCard(toy)
  }

  fetchToys()
  inputToys()
})

