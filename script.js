const addBookButton = document.querySelector('#add');
const newBookElement = document.querySelector('.new-book');
const plusButton = document.querySelector('.plus');
const table = document.querySelector('table.t2');
const menuTable = document.querySelector('table.t3');
const statusButtons = Array.from(document.querySelectorAll('.t2 button'));

let myLibrary = [];

console.log(JSON.parse(localStorage.getItem('myLibrary')));

if(JSON.parse(localStorage.getItem('myLibrary'))) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    myLibrary.forEach(book => {
        displayInLibrary(book);
    });
}

addBookButton.addEventListener('click', () => {
    showMenu();
    addBookButton.scrollIntoView();
});

plusButton.addEventListener('click', () => {
    addBookToLibrary();
    addBookButton.scrollIntoView();
});

function showMenu() {
    if(menuTable.classList.contains('hide')) {
        menuTable.classList.remove('hide');
        addBookButton.textContent = 'Done';
    } else {
        menuTable.classList.add('hide');
        addBookButton.textContent = 'Add Book';
        clearInputs();
    }
}

function addBookToLibrary() {
    const title = newBookElement.cells[0].childNodes[0].value;
    const author = newBookElement.cells[1].childNodes[0].value;
    const pages = newBookElement.cells[2].childNodes[0].value;
    
    if(!isNaN(pages) && pages != '' && author != '' && title != '') {
        const newBook = new Book(title, author, pages, 'Unread');
        myLibrary.push(newBook);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        displayInLibrary(myLibrary[myLibrary.length-1]);
        clearInputs();
    }    
}

function clearInputs() {
    Array.from(menuTable.rows[0].cells).forEach(cell => {
        cell.childNodes[0].value = '';
    });
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function displayInLibrary(book) {
    const newRow = table.insertRow(-1);

    newRow.classList.add('book');

    const title = newRow.insertCell(-1);
    const author = newRow.insertCell(-1);
    const pages = newRow.insertCell(-1);
    const status = newRow.insertCell(-1);
    const statusButton = document.createElement('button');
    const removeButton = document.createElement('button');

    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = book.pages;
    statusButton.innerHTML = book.status;
    statusButton.classList.add('unread');
    
    if(book.status == 'Read') {
        statusButton.classList.add('read');
    }
    
    status.appendChild(statusButton);
    removeButton.innerHTML = '&times;';
    removeButton.classList.add('remove');
    status.appendChild(removeButton);

    statusButton.addEventListener('click', () => {
        changeStatus(statusButton);
    });

    removeButton.addEventListener('click', () => {
        remove(removeButton);
    });
}

function changeStatus(button) {
    const index = button.parentElement.parentElement.rowIndex;

    if(myLibrary[index].status == 'Unread') {
        myLibrary[index].status = 'Read';
        button.textContent = 'Read';
        button.classList.add('read');
    } else {
        myLibrary[index].status = 'Unread';
        button.textContent = 'Unread';
        button.classList.remove('read');
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function remove(button) {
    const index = button.parentElement.parentElement.rowIndex;
    
    myLibrary.splice(index, 1);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    table.deleteRow(index);
}