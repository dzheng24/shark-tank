//comment fetch bizIdea
fetch("/bizIdeas")
  .then((response) => response.json())
  .then((ideas) => createCard(ideas));

function createCard(data) {
  // looping through the ideas array
  for (let i = 0; i < data.length; i++) {
    // make new card
    let newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    newCard.style.width = "18rem";

    // make image on top
    let newImage = document.createElement("img");
    newImage.setAttribute("class", "card-img-top");
    newImage.setAttribute("src", `${data[i].image_url}`);
    newCard.appendChild(newImage);

    // make card body
    let newCardBody = document.createElement("div");
    newCardBody.setAttribute("class", "card-body");
    newCard.appendChild(newCardBody);

    // adding title
    let newTitle = document.createElement("h5");
    newTitle.setAttribute("class", "card-title");
    newTitle.innerHTML = `${data[i].title}`;
    newCardBody.appendChild(newTitle);

    // adding description
    let newDescription = document.createElement("p");
    newDescription.setAttribute("class", "card-text");
    newDescription.innerHTML = `${data[i].description}`;
    // let shortendDescription = newDescription.slice(0, 250);
    // newDescription.innerHTML = `${shortendDescription}...`;
    newCardBody.appendChild(newDescription);

    // adding a button
    let newButton = document.createElement("a");
    newButton.setAttribute("class", "btn btn-primary");
    newButton.setAttribute("href", "#");
    newButton.innerHTML = "Edit for Later";
    newCardBody.appendChild(newButton);

    // adding a delete button
    let deleteButton = document.createElement("a");
    deleteButton.setAttribute("class", "btn btn-danger");
    deleteButton.setAttribute("href", "#");
    deleteButton.innerHTML = "Edit for Later";
    deleteButton.addEventListener("click", () =>
      console.log("clicking on delete button")
    );
    newCardBody.appendChild(deleteButton);

    // append card to display area
    document.getElementById("display-area").appendChild(newCard);
  }
}

function createCard2(title, description, url) {
  // make new card
  let newCard = document.createElement("div");
  newCard.setAttribute("class", "card");
  newCard.style.width = "18rem";

  // make image on top
  let newImage = document.createElement("img");
  newImage.setAttribute("class", "card-img-top");
  newImage.setAttribute("src", `${url}`);
  newCard.appendChild(newImage);

  // make card body
  let newCardBody = document.createElement("div");
  newCardBody.setAttribute("class", "card-body");
  newCard.appendChild(newCardBody);

  // adding title
  let newTitle = document.createElement("h5");
  newTitle.setAttribute("class", "card-title");
  let shortenedTitle = title.slice(0, 30);
  newTitle.innerHTML = `${shortenedTitle}...`;
  newCardBody.appendChild(newTitle);

  // adding description
  let newDescription = document.createElement("p");
  newDescription.setAttribute("class", "card-text");
  let shortendDescription = description.slice(0, 250);
  newDescription.innerHTML = `${shortendDescription}...`;
  newCardBody.appendChild(newDescription);

  // adding a button
  let newButton = document.createElement("a");
  newButton.setAttribute("class", "btn btn-primary");
  newButton.setAttribute("href", "#");
  newButton.innerHTML = "Publish this card";
  newCardBody.appendChild(newButton);

  // adding an edit button
  // let editButton = document.createElement("a");
  // editButton.setAttribute("class", "btn btn-warning");
  // editButton.setAttribute("href", "#");
  // editButton.innerHTML = "Edit";
  // editButton.addEventListener("click", editCard);
  // newCardBody.appendChild(editButton);

  // adding a delete button
  let deleteButton = document.createElement("a");
  deleteButton.setAttribute("class", "btn btn-danger");
  deleteButton.setAttribute("href", "#");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", deleteCard);
  newCardBody.appendChild(deleteButton);

  // append card to display area
  document.getElementById("display-area").appendChild(newCard);
}
