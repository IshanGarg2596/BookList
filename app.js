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
     
        const books = Store.getBooks();


        books.forEach(book => this.addBookToList(book));
    }

    static addBookToList(book){
        let list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='btn btn-warning btn-sm delete'>X</a></td>`;


        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form  = document.querySelector('#book-form');
        container.insertBefore(div, form);


        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);

    }

    static clearFeilds(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}


// Store Class: Handles Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(Book){
        const books = Store.getBooks();

        books.push(Book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks());


// Event: Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    // Get Form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all fields', 'warning');
    } else{
        // Instanitate book
        const book = new Book(title, author, isbn);

        //console.log(book);
        
        // Add Book to UI
        UI.addBookToList(book); 

        // Add Book to store
        Store.addBook(book);
        
        // Clear feilds
        UI.clearFeilds();

        // Show sucess message
        UI.showAlert('Book Added', 'success');

    }
});


// Event: remove book
document.querySelector('#book-list').addEventListener('click', (e) =>{
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed', 'success');

});