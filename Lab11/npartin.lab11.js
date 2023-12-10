//Search button
document.getElementById('search-button').addEventListener('click', function() {
    let searchTerm = document.getElementById('search-input').value;
    searchBooks(searchTerm);
});

//Clear button
document.getElementById('clear-button').addEventListener('click', function() {
    clearSearch();
});

//Searches books based on user input
//Uses API call and JSON response to get books
function searchBooks(searchTerm) {
    if (!searchTerm.trim()) {
        displayError('Please enter a search term.');
        return;
    }

    //API call based on user input
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`)
        .then(response => {
            //Problem with API call
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //JSON response for successful API call
            return response.json();
        })
        .then(data => {
            if (data.totalItems === 0) {
                //Error for no returned books
                displayError('No books found. Try a different search.');
            } else {
                //Displays books if there is/are a returned book(s)
                displayBooks(data.items);
            }
        })
        //Error
        .catch(error => {
            console.error('Error:', error);
            displayError('No books found. Try a different search.');
        });
}

//Clears searched books response and sends to original state
function clearSearch() {
    document.getElementById('search-input').value = ''; // Clear search input
    document.getElementById('book-list').innerHTML = ''; // Clear search results
}

//Error display
function displayError(message) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = `<p class="error-message">${message}</p>`;
}

//Adds searched books to page
//Creates HTML elements to display books
function displayBooks(books) {
    let bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    //Creates an element for books
    books.forEach(book => {
        let div = document.createElement('div');
        div.className = 'book-item';
        div.innerHTML = `
            <h3>${book.volumeInfo.title}</h3>
            <p>Author: ${book.volumeInfo.authors.join(', ')}</p>
            <button onclick="addToBookshelf('${book.id}')">Add to Bookshelf</button>
            <button onclick="toggleDetails(this)">More Details</button>
            <div class="book-details" style="display: none;">
                <p>Published Date: ${book.volumeInfo.publishedDate}</p>
                <p>Page Count: ${book.volumeInfo.pageCount}</p>
            </div>
        `;
        //Add list
        bookList.appendChild(div);
    });
}

//Adds books to shelf
//Utilizes local storage
function addToBookshelf(bookId) {
    let bookshelf = localStorage.getItem('bookshelf') ?
        JSON.parse(localStorage.getItem('bookshelf')) : [];
    if (!bookshelf.includes(bookId)) {
        bookshelf.push(bookId);
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        updateBookshelf();
    }

    //Clear search results and optionally reset the search input
    document.getElementById('book-list').innerHTML = '';
    document.getElementById('search-input').value = '';
}

//Updates bookshelf
//Creates HTML elements for books stored in bookshelf
function updateBookshelf() {
    let bookshelf = localStorage.getItem('bookshelf') ?
        JSON.parse(localStorage.getItem('bookshelf')) : [];
    let bookshelfDiv = document.getElementById('my-bookshelf');
    bookshelfDiv.innerHTML = '';

    //HTML element for shelf books
    bookshelf.forEach(bookId => {
        //API call for book using book ID
        fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then(response => response.json())
            .then(data => {
                let book = data.volumeInfo;
                let div = document.createElement('div');
                div.className = 'book-item';
                div.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.authors ? book.authors.join(', ') : 'Unknown'}</p>
                <button onclick="removeFromBookshelf('${bookId}')">Remove from Bookshelf</button>
                <button onclick="toggleDetails(this)">Details</button>
                <div class="book-details" style="display: none;">
                    <p>Published Date: ${book.publishedDate}</p>
                    <p>Page Count: ${book.pageCount}</p>
                    <!-- Add other details here -->
                </div>
            `;
                //Adds to shelf
                bookshelfDiv.appendChild(div);
            })
            //Error catching
            .catch(error => console.error('Error:', error));
    });
}

//Remove from shelf
//Removes from local storage
function removeFromBookshelf(bookId) {
    let bookshelf = localStorage.getItem('bookshelf') ?
        JSON.parse(localStorage.getItem('bookshelf')) : [];
    let newBookshelf = bookshelf.filter(id => id !== bookId);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
    //Calls update shelf function
    updateBookshelf();
}

//Toggle for details button in book element
//Changes text in button
function toggleDetails(button) {
    let detailsDiv = button.nextElementSibling;
    if (detailsDiv.style.display === 'none') {
        detailsDiv.style.display = 'block';
        button.textContent = 'Less Details';
    } else {
        detailsDiv.style.display = 'none';
        button.textContent = 'More Details';
    }
}

//Call updateBookshelf on page load to display saved books
updateBookshelf();
