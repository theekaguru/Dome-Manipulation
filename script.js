document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector("#movie-list ul");
  const forms = document.forms;

  // Handle delete, edit, and save
  list.addEventListener("click", function (e) {
    const li = e.target.parentElement;

    // Delete movie
    if (e.target.className === "delete") {
      li.parentNode.removeChild(li);
    }

    // Edit movie
    else if (e.target.className === "edit") {
      const nameSpan = li.querySelector(".name");
      const input = document.createElement("input");
      input.type = "text";
      input.value = nameSpan.textContent;
      input.className = "edit-input";

      li.insertBefore(input, nameSpan);
      li.removeChild(nameSpan);

      e.target.textContent = "Save";
      e.target.className = "save";
    }

    // Save edited movie
    else if (e.target.className === "save") {
      const input = li.querySelector(".edit-input");
      const newName = document.createElement("span");
      newName.className = "name";
      newName.textContent = input.value;

      li.insertBefore(newName, input);
      li.removeChild(input);

      e.target.textContent = "Edit";
      e.target.className = "edit";
    }
  });

  // Add movie
  const addMovieForm = forms["add-movie"];
  addMovieForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const userInput = addMovieForm
      .querySelector('input[type="text"]')
      .value.trim();

    if (!userInput) {
      alert("Please enter a movie name!");
      return;
    }

    // Create elements
    const li = document.createElement("li");
    const movieName = document.createElement("span");
    const deleteBtn = document.createElement("span");
    const editBtn = document.createElement("span");

    // Set content
    movieName.textContent = userInput;
    deleteBtn.textContent = "Delete";
    editBtn.textContent = "Edit";

    // Set classes
    movieName.classList.add("name");
    deleteBtn.classList.add("delete");
    editBtn.classList.add("edit");

    // Append to list item
    li.appendChild(movieName);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    // Add to the DOM
    list.appendChild(li);

    // Reset the form
    addMovieForm.reset();
  });
})