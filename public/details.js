fetch("/bizIdeas")
  .then((response) => response.json())
  .then((ideas) => createDetails(ideas));

function createDetails(data) {
  // find the id in the address bar
  let address = window.location.href;
  let id = address.split("details-page:")[1];

  // loop over the array of data, when the id matches, display the information
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === id) {
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
      newCardBody.appendChild(newDescription);

      // add button container
      let newButtonContainer = document.createElement("div");
      newButtonContainer.setAttribute("class", "button-container");
      newCardBody.appendChild(newButtonContainer);

      // adding "Edit" button
      let editButton = document.createElement("a");
      editButton.setAttribute(
        "class",
        "btn btn-outline-secondary my-2 my-sm-0 btn-warning"
      );
      editButton.setAttribute("href", `/details-page:${data[i]._id}`);
      editButton.innerHTML = "Edit";
      newButtonContainer.appendChild(editButton);

      // adding "DELETE" button
      let deleteButton = document.createElement("a");
      deleteButton.setAttribute(
        "class",
        "btn btn-outline-secondary my-2 my-sm-0 btn-danger"
      );
      deleteButton.setAttribute("href", `/details-page:${data[i]._id}`);
      deleteButton.innerHTML = "Delete";
      newButtonContainer.appendChild(deleteButton);

      // append card to display area
      document.getElementById("display-area").prepend(newCard);
    }
  }
}
