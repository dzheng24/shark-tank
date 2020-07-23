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

    // make image on top
    let newImage = document.createElement("img");
    newImage.setAttribute("class", "card-img-top");
    if (`${data[i].image_url}`.length < 10) {
      newImage.setAttribute("src", "/resources/strong_shark.jpg");
    } else {
      newImage.setAttribute("src", `${data[i].image_url}`);
    }

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

    // add button container
    let newButtonContainer = document.createElement("div");
    newButtonContainer.setAttribute("class", "button-container");
    newCardBody.appendChild(newButtonContainer);

    // adding "view for more details" button
    let newButton = document.createElement("a");
    newButton.setAttribute(
      "class",
      "btn btn-outline-secondary my-2 my-sm-0 my-blue-btn"
    );
    newButton.setAttribute("href", `/details-page:${data[i]._id}`);
    newButton.innerHTML = "More Details";
    newButtonContainer.appendChild(newButton);

    // append card to display area
    document.getElementById("display-area").prepend(newCard);
  }
}
