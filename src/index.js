
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
  getToys()
})

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(obj => addToyCard(obj))
}

function addToyCard(obj) {
  const collection = document.getElementById('toy-collection')
  obj.forEach(function(toy) {
    const div = document.createElement('div')
    div.className = 'card'

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`

    const btn =  document.createElement('button')
    btn.className = 'like-btn'
    btn.innerText = 'Like <3'
    btn.id = toy.id
    btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
    })

    div.append(h2, img, p, btn)
    collection.appendChild(div)
  })

  function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}
}
