const addBookButton = document.querySelector('#add');
const newBookElement = document.querySelector('.new-book');
const plusButton = document.querySelector('.plus');
const table = document.querySelector('table.t2');
const statusButtons = Array.from(document.querySelectorAll('.t2 button'));

let myLibrary = [];

addBookButton.addEventListener('click', showMenu);

plusButton.addEventListener('click', () => {
    addBookToLibrary();
    addBookButton.scrollIntoView();
});

function changeStatus(button, index) {
    if(myLibrary[index].status == 'Unread') {
        myLibrary[index].status = 'Read';
        button.textContent = 'Read';
        button.classList.add('read');
    } else {
        myLibrary[index].status = 'Unread';
        button.textContent = 'Unread';
        button.classList.remove('read');
    }
}

function showMenu() {
    if(newBookElement.classList.contains('hide')) {
        newBookElement.classList.remove('hide');
        addBookButton.textContent = 'Done';
    } else {
        newBookElement.classList.add('hide');
        addBookButton.textContent = 'Add Book';
    }
}

myLibrary.forEach(book => {
    displayInLibrary(book);
});

function displayInLibrary(book) {
    const newRow = table.insertRow(-1);

    newRow.classList.add('book');
    
    const title = newRow.insertCell(-1);
    const author = newRow.insertCell(-1);
    const pages = newRow.insertCell(-1);
    const status = newRow.insertCell(-1);
    const statusButton = document.createElement('button');

    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = book.pages;
    statusButton.innerHTML = book.status;
    statusButton.classList.add('unread');
    status.appendChild(statusButton);
    
    const index = myLibrary.length - 1;

    statusButton.addEventListener('click', () => {
        changeStatus(statusButton, index);
        console.table(myLibrary);
    });
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.status;
    }
}

function addBookToLibrary() {
    const title = newBookElement.cells[0].childNodes[0].value;
    const author = newBookElement.cells[1].childNodes[0].value;
    const pages = newBookElement.cells[2].childNodes[0].value;
    
    if(!isNaN(pages) && pages != '' && author != '' && title != '') {
        const newBook = new Book(title, author, pages, 'Unread');
        myLibrary.push(newBook);
        displayInLibrary(myLibrary[myLibrary.length-1]);
    }    
}