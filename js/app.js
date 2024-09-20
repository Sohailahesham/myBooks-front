const books = document.querySelector(".books");
fetch("books.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((book) => {
      const div = document.createElement("div");
      div.className = "book-card";
      const image = document.createElement("img");
      image.src = book.image;
      const head = document.createElement("h3");
      head.innerHTML = book.title;
      const rate = document.createElement("span");
      rate.innerHTML = `${book.rating} <img src="assets/star.png">`;
      div.appendChild(image);
      div.appendChild(head);
      div.appendChild(rate);
      books.appendChild(div);
    });
  });
