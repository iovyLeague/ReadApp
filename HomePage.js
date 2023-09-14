//
class MyBooksState {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('myBooks')) || [];
  }

  addBookFromForm() {
    const title = document.querySelector("#title_form").value;
    const author = document.querySelector("#author_form").value;
    const genre = document.querySelector("#genre_form").value;

    if (!title || !author || !genre) {
      return;
    }

    this.addBook(title, author, genre);
    hideAddBookModal();
  }

  addBook(title, author, genre) {
    this.books.push({
      title,
      author,
      genre,
    });

    // update the local storage book list

    localStorage.setItem('myBooks', JSON.stringify(this.books));

    updateBooksList();
  }

  editBook(index, title, author, genre) {
    const book = this.books[index];

    book.title = title;
    book.author = author;
    book.genre = genre;

    updateBooksList();
  }

  deleteBook(book) {
    const index = this.books.indexOf(book);
    if (index === -1) return;

    this.books.splice(index, 1);

    localStorage.setItem('myBooks', JSON.stringify(this.books));

    updateBooksList();
  }
}

const myBooksState = new MyBooksState();
window.myBooksState = myBooksState;

function updateBooksList() {
  const noBooksElem = document.querySelector(".Books_List_NoBooks");
  const booksListElem = document.querySelector(".Books_List");

  if (!myBooksState.books.length) {
    booksListElem.classList.add("hide");
    noBooksElem.classList.remove("hide");
    return;
  } else {
    noBooksElem.classList.add("hide");
    booksListElem.classList.remove("hide");

    // remove all old books
    booksListElem.replaceChildren();

    myBooksState.books.forEach((book) => {
      const bookElem = document.createElement("div");
      bookElem.classList.add("Book_Item");

      const bookContentElem = document.createElement("div");
      bookContentElem.classList.add("Book_Item_Content");
      bookElem.appendChild(bookContentElem);

      const bookTitleElem = document.createElement("div");
      bookTitleElem.classList.add("Book_Item_Title");
      bookTitleElem.textContent = book.title;
      bookContentElem.appendChild(bookTitleElem);

      const bookAuthorElem = document.createElement("div");
      bookAuthorElem.classList.add("Book_Item_Author");
      bookAuthorElem.textContent = book.author;
      bookContentElem.appendChild(bookAuthorElem);

      const bookGenreElem = document.createElement("div");
      bookGenreElem.classList.add("Book_Item_Genre");
      bookGenreElem.textContent = book.genre;
      bookContentElem.appendChild(bookGenreElem);

      const bookActionsContainerElem = document.createElement("div");
      bookActionsContainerElem.classList.add("Book_Item_Actions_Container");
      bookElem.appendChild(bookActionsContainerElem);

      const bookEditButton = document.createElement("button");
      bookEditButton.classList.add("Edit");
      bookEditButton.textContent = "Edit";
      bookActionsContainerElem.appendChild(bookEditButton);

      const BookDeleteButton = document.createElement("button");
      BookDeleteButton.classList.add("Delete");
      BookDeleteButton.textContent = "Delete";
      BookDeleteButton.addEventListener("click", () => {
        myBooksState.deleteBook(book);
      });
      bookActionsContainerElem.appendChild(BookDeleteButton);

      // add elem
      booksListElem.appendChild(bookElem);
    });
  }
}

//
function showAddBookModal() {
  const modalElem = document.querySelector(".Add_Book_Modal");
  if (!modalElem) return;

  modalElem.classList.add("open");
}

function hideAddBookModal() {
  const modalElem = document.querySelector(".Add_Book_Modal");
  if (!modalElem) return;

  modalElem.classList.remove("open");
}

window.addEventListener("load", () => {
    const myBooksState = new MyBooksState();
  updateBooksList();

  const formElem = document.querySelector(".Add_Book_Form");
  formElem.addEventListener("submit", (e) => {
    e.stopPropagation();
    e.preventDefault();
    myBooksState.addBookFromForm();
  });
});
