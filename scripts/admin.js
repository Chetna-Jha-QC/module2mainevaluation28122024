const API_URL = "https://swanky-important-lily.glitch.me" //backend link
const loginData = JSON.parse(localStorage.getItem("loginData"));

//redirect if admin is not logged in
if (!loginData || loginData.email !== "admin@empher.com"){
    alert("Admin Not Logged In. Please Log In to Access");
    window.location.href = "./index.html"; //redirect to home page for log in
}

// Elements
const bookFrom = document.getElementById("bookForm");
const booksGrid = document.getElementById("booksGrid");

//Fetching and displaying all the added books
async function fetchBooks() {
    const response = await fetch(API_URL);
    const books = await response.json();
    renderBooks(books);
}

//books in grid
function renderBooks(books) {
    booksGrid.innerHTML = " "; //clear previous content
    books.forEach(book => {
        const bookCard = document.createElement("div");

        bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Category: ${book.category}</p>
          <p>Status: ${book.isVerified ? "verified" : "Not verified"}</p>
          <p>${book.borrowedDays ? `Borrowed for: $${book.borrowedDays} days` : ""}</p>
          <button class="verify-btn" ${book.isVerified ? "disabled" : ""}>VERIFY BOOK</button>
          <button class="delete-btn">DELETE BOOK</button>`;

          //verify book
        bookCard.querySelector(".verify-btn").addEventListener("click", async () => {
            if (confirm ("Are you Sure to verify this book?")){
                await fetch(`${API_URL}/${book.id}`, {
                    method: "PATCH",
                    headers: {"Content- Type": "application/json" },
                    body: JSON.stringify({ isVerified: true}),
                });
                alert("This Books Is Verified Successfully");
                fetchBooks(); //Refreshing the UI
            }
        });

        //Delete Book
        bookCard.querySelector(".delete-btn").addEventListener("click", async () => {
            if (confirm("Are you sure to detele this book?")) {
                await fetch(`${API_URL}/${book.id}`, {method: "DELETE"});
                alert("Book has been removed successfully!!!!!");
                fetchBooks(); //refresh
            }
        });

        booksGrid.appendChild(bookCard);
    });
}

// add book

bookFrom.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newBook = {
        title: document.createElement("title").value,
        author: document.createElement("author").value,
        category: document.createElement("category").value,
        isVerified: false,
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newBook),
    });

    alert("Book Added Successfully");
    bookFrom.reset();
    fetchBooks(); //refresh
});

//inital
fetchBooks();