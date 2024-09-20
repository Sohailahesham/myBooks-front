const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const ratingInput = document.getElementById("rating");
const dataDisplay = document.getElementById("dataDisplay");

let allBooks = [];

function printBooks(books) {
  dataDisplay.innerHTML = "";

  books.forEach((book, index) => {
    const row = document.createElement("tr");

    const id = document.createElement("td");
    id.innerHTML = index + 1;
    row.appendChild(id);

    const title = document.createElement("td");
    title.contentEditable = "true";
    title.innerHTML = book.title;
    row.appendChild(title);

    const author = document.createElement("td");
    author.contentEditable = "true";
    author.innerHTML = book.author;
    row.appendChild(author);

    const pages = document.createElement("td");
    pages.contentEditable = "true";
    pages.innerHTML = book.pages;
    row.appendChild(pages);

    const rating = document.createElement("td");
    rating.contentEditable = "true";
    rating.innerHTML = book.rating;
    row.appendChild(rating);

    const action = document.createElement("td");

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.className = "btn btn-primary";
    updateBtn.onclick = () => updateBook(index, row);
    action.appendChild(updateBtn);
    updateBtn.onclick = () => {
      if (confirm("Are you sure you want to update this book?")) {
        updateBook(index, row);
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-danger";
    deleteBtn.onclick = () => deleteBook(index);
    action.appendChild(deleteBtn);
    deleteBtn.onclick = () => {
      if (confirm("Are you sure you want to delete this book?")) {
        deleteBook(index);
      }
    };

    row.appendChild(action);
    dataDisplay.appendChild(row);
  });
}

function add() {
  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== "" &&
    ratingInput.value !== ""
  ) {
    if (ratingInput.value < 1) ratingInput.value = 1;
    else if (ratingInput.value > 10) ratingInput.value = 10;
    const newBook = {
      title: titleInput.value,
      author: authorInput.value,
      pages: parseInt(pagesInput.value),
      rating: parseInt(ratingInput.value),
    };

    allBooks.push(newBook);
    saveToLocalStorage(allBooks);
    printBooks(allBooks);

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    ratingInput.value = "";
  } else {
    alert("Please fill in all the fields.");
  }
}

function updateBook(index, row) {
  const updatedBook = {
    title: row.cells[1].textContent,
    author: row.cells[2].textContent,
    pages: parseInt(row.cells[3].textContent),
    rating: parseInt(row.cells[4].textContent),
  };

  allBooks[index] = updatedBook;
  saveToLocalStorage(allBooks);
  alert("Book updated successfully!");
}

function deleteBook(index) {
  allBooks.splice(index, 1);
  saveToLocalStorage(allBooks);
  printBooks(allBooks);
}

function saveToLocalStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadFromLocalStorage() {
  const books = JSON.parse(localStorage.getItem("books"));
  return books || [];
}

window.onload = function () {
  allBooks = loadFromLocalStorage();
  printBooks(allBooks);
};

fetch("books.json")
  .then((response) => response.json())
  .then((data) => {
    allBooks = data;
    printBooks(allBooks);
  });
