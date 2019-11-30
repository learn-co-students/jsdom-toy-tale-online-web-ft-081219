let addToy = false;

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
  });

  getToys();
  createToyForm();
})

function getToys() {
  fetch("http://localhost:3000/toys")
  .then (function(response) {
    return response.json();
  })
  .then (function(object) {
    for (const toy of object) {
      makeCard(toy);
    }
  })
}

function makeCard(toy) {
  
  const toyList = document.getElementById('toy-collection');
  const newCard = document.createElement('div');
  newCard.id = `toy${toy.id}`;
  
  const header = document.createElement('h2');
  header.innerText = toy.name;
  newCard.appendChild(header);

  const image = document.createElement('img');
  image.src = toy.image;
  image.alt = `Image of ${toy.name}`;
  image.style.maxHeight = '400px';
  image.class = 'toy-avatar';
  newCard.appendChild(image);

  const likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`
  newCard.appendChild(likes);

  const button = document.createElement('button')
  button.class = 'like-btn';
  button.innerText = 'Like <3';
  makeButtonWork(button);
  newCard.appendChild(button);

  toyList.appendChild(newCard);
}

function createToyForm() {
  const form = document.querySelector('form.add-toy-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const newToyName = form.querySelector('input[name="name"]').value;
    const newToyImg = form.querySelector('input[name="image"]').value;

    // test errors - name in use
    try {
      if (nameIsTaken(newToyName)) throw "This name is already taken!";
    } catch(error) {
      alert(error);
      form.reset();
      return
    };

    fetch("http://localhost:3000/toys", makeConfigObj(newToyName, newToyImg))
      .then(response => response.json())
      .then(obj => {
        makeCard(obj);
        form.reset();
      });
  })
}

function nameIsTaken(name) {
  const list = document.querySelectorAll('#toy-collection h2');
  const reg = RegExp(`${name}`, 'i');

  for (const header of list) {
    if (reg.test(header.innerText)) {
      return true;
    }
  }
}

function makeConfigObj(name, image, likes) {
  return {
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": likes
    })
  }
}

function makeButtonWork(button) {
  button.addEventListener('click', () => {
    const toyId = button.parentElement.id.match(/\d+/)[0];
    const newLikes = parseInt(button.parentElement.querySelector('p').innerText.match(/\d+/)[0]) + 1;

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(resp => resp.json())
    .then(obj => {
      button.parentElement.querySelector('p').innerText = `${newLikes} likes`;
    })
  });
} 