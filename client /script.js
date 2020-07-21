document.getElementById("idea_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let userInputTitle = document.getElementById("idea_title").value;
  let userInputDescription = document.getElementById("idea_description").value;
  let userInputURL = document.getElementById("idea_image_url").value;
  createCard(userInputTitle, userInputDescription, userInputURL);
});

// creating a card based on user input
function createCard(title, description, url) {
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
  newTitle.innerHTML = title;
  newCardBody.appendChild(newTitle);

  // adding description
  let newDescription = document.createElement("p");
  newDescription.setAttribute("class", "card-text");
  newDescription.innerHTML = description;
  newCardBody.appendChild(newDescription);

  // adding a button
  let newButton = document.createElement("a");
  newButton.setAttribute("class", "btn btn-primary");
  newButton.setAttribute("href", "#");
  newButton.innerHTML = "Edit for Later";
  newCardBody.appendChild(newButton);

  // append card to display area
  document.getElementById("display-area").appendChild(newCard);
}
