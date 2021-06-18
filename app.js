// Book Class: Represents a book

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn =  isbn;
    }
}




// UI Class: Handle UI Tasks
class UI{
    static displayBooks() {
        const storedBooks = [
            {
                title: 'Book One',
                author: 'Jhon Doe',
                isbn: '3434434'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '4554545'
            }
        ];

        const books = storedBooks;


        books.forEach(book => this.addBookToList(book));
    }

    static addBookToList(book){
        let list = document.querySelector("#book-list");

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-warning btn-sm delete">X</a></td>`;


        list.appendChild(row);
    }

    static clearFeilds(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }

}


// Store Class: Handles Storage



// Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks());


// Event: Add Book
document.querySelector("#book-form").addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    // Get Form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Instanitate book
    const book = new Book(title, author, isbn);

    console.log(book);
    // Add Book to UI
    UI.addBookToList(book); 

    // Clear feilds
    UI.clearFeilds();
});


// Event: remove book
