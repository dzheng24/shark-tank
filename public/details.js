fetch("/bizIdeas")
  .then((response) => response.json())
  .then((ideas) => createDetails(ideas));

function createDetails(data) {
  // find the id in the address bar
  let address = window.location.href;
  console.log(address);
  let id = address.split("details-page/")[1];
  console.log(id);

  // loop over the array of data, when the id matches, display the information
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === id) {
      // make new card
      let newCard = document.createElement("div");
      newCard.setAttribute("class", "card");

      // make image on top
      let newImage = document.createElement("img");
      newImage.setAttribute("class", "card-img-top");
      newImage.setAttribute("src", `${data[i].image_url}`);
      newImage.style.height = "30vh";
      newImage.style.width = "25vw";
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

      // add username
      let newUserName = document.createElement("h6");
      newUserName.setAttribute("class", "card-subtitle mb-2 text-muted");
      newUserName.innerHTML = `Idea by ${data[i].owner.username}`;
      newCardBody.appendChild(newUserName);

      // creating "owner email" hyperlink
      let newEmailLink = document.createElement("a");
      newEmailLink.setAttribute("href", `mailto: ${data[i].owner.email}`);
      newEmailLink.innerHTML = `Email: ${data[i].owner.email}`;
      newCardBody.appendChild(newEmailLink);

      // add button container
      let newButtonContainer = document.createElement("div");
      newButtonContainer.setAttribute("class", "button-container");
      newCardBody.appendChild(newButtonContainer);

      // adding "Edit" button
      let editButton = document.createElement("a");
      editButton.setAttribute(
        "class",
        "btn btn-outline-secondary my-2 my-sm-0 my-buttons"
      );
      editButton.setAttribute("href", `/${id}/edit`);

      editButton.innerHTML = "Edit";
      newButtonContainer.appendChild(editButton);

      let delete_form = document.createElement("form");
      delete_form.setAttribute("class", "delete-form");
      delete_form.setAttribute("action", `/details-page/delete/${id}`);
      delete_form.setAttribute("method", "POST");
      newButtonContainer.appendChild(delete_form);

      // adding "DELETE" button
      let deleteButton = document.createElement("button");
      deleteButton.setAttribute(
        "class",
        "btn btn-outline-secondary my-2 my-sm-0 my-buttons"
      );
      // deleteButton.setAttribute("href", "/display-page");
      deleteButton.innerHTML = "Delete";
      delete_form.appendChild(deleteButton);

      /*
      //addeventListner to delete button, then fetch to delete route.
      deleteButton.addEventListener("click", () => {
        fetch(`/details-page/delete/${id}`, {
          method: "delete",
        }).then((res) => {
          window.location.pathname = "/display-page";
        });
      });
      */

      // append card to display area
      document.getElementById("display-area").appendChild(newCard);
    }
  }
}
