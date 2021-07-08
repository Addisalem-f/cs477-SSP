function displayLoginMethod() {
    document.getElementById('book-container').style.display = 'none';
    document.getElementById('login-div').style.display = 'block';

}
function displayContent() {
    fetchBooks();
    document.getElementById('book-container').style.display = 'block'
    document.getElementById('login-div').style.display = 'none';
}

window.onload = function () {
    if (sessionStorage.getItem('jwtToken')) {
        displayContent()
    } else {
        displayLoginMethod()
    }
    document.getElementById('logout-btn').onclick = function () {
        sessionStorage.removeItem('jwtToken')
        displayLoginMethod()
    }
    document.getElementById('login-btn').onclick = function (event) {
        event.preventDefault();
        fetch('http://localhost:3003/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.jwtToken) {
                    console.log(data.jwtToken)
                    sessionStorage.setItem('jwtToken', data.jwtToken)
                    displayContent()
                } else {
                    document.getElementById('error-msg').innerText = data.error;
                }
            })

    }


    // window.onload = function () {

    document.getElementById('addBtn').onclick = function (event) {
        event.preventDefault();
        const productId = this.dataset.id;
        if (productId) { //data-id exists - edit a product
            console.log('---------------');
            fetch('http://localhost:3003/books/' + productId, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + sessionStorage.getItem('jwtToken')
                },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                    ISBN: document.getElementById('ISBN').value,
                    publishedDate: document.getElementById('publishedDate').value,
                    author: document.getElementById('author').value
                })
            })
                .then(data => data.json())
                .then(updatedProd => {
                    console.log(updatedProd);
                    //reset from
                    document.getElementById('form-title').textContent = "Add a book";
                    document.getElementById('add-form').reset();
                    document.getElementById('addBtn').dataset.id = '';
                    location.reload();
                })
        } else {
            createNewBook();
        }
    }
}

function createNewBook() {
    const title = document.getElementById('title').value;
    const ISBN = document.getElementById('ISBN').value;
    const publishedDate = document.getElementById('publishedDate').value;
    const author = document.getElementById('author').value;

    fetch('http://localhost:3003/books', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + sessionStorage.getItem('jwtToken')
        },
        body: JSON.stringify({
            title: title,
            ISBN: ISBN,
            publishedDate: publishedDate,
            author: author,
        })
    }).then(data => data.json())
        .then(bookL => {
            console.log(bookL);
            document.getElementById('add-form').reset();
            attachSingleBook(document.getElementById('book-list-body'), bookL);
        });
}

async function fetchBooks() {
    const books = await (await fetch('http://localhost:3003/books', {
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem('jwtToken') }
    })).json();
    const tbody = document.getElementById('book-list-body');
    books.forEach(prod => {
        attachSingleBook(tbody, prod);
    })
}

function attachSingleBook(parentNode, book) {
    const tr = document.createElement('tr'); //<tr>
    const titleTd = document.createElement('td'); //<td>111</td>
    titleTd.textContent = book.title;
    tr.appendChild(titleTd); //

    const ISBNId = document.createElement('td');
    ISBNId.textContent = book.ISBN;
    tr.appendChild(ISBNId);

    const publishedDId = document.createElement('td');
    publishedDId.textContent = book.publishedDate;
    tr.appendChild(publishedDId);

    const authorId = document.createElement('td');
    authorId.textContent = book.author;
    tr.appendChild(authorId);

    const actionTd = document.createElement('td');
    const deleteButton = document.createElement('button');
    // deleteButton.className = 'btn btn-primary';
    deleteButton.innerText = 'DELETE';
    deleteButton.dataset.id = book.id;
    actionTd.appendChild(deleteButton);

    const updateButton = document.createElement('button');
    updateButton.innerText = 'UPDATE';
    updateButton.dataset.id = book.id;
    actionTd.appendChild(updateButton);

    tr.appendChild(actionTd);
    deleteButton.addEventListener('click', function () {
        // console.log('DELETE button clicked');
        fetch('http://localhost:3003/books/' + book.id, {
            method: 'DELETE',
            headers: { 'Authorization': "Bearer " + sessionStorage.getItem('jwtToken') }
        })
            .then(data => {
                tr.remove();
                // console.log(data)
            });

    });

    updateButton.addEventListener('click', function () {
        fetch('http://localhost:3003/books/' + book.id, {
            headers: { 'Authorization': "Bearer " + sessionStorage.getItem('jwtToken') }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                document.getElementById('form-title').textContent = "Edit a book";
                document.getElementById('title').value = data.title;
                document.getElementById('ISBN').value = data.ISBN;
                document.getElementById('publishedDate').value = data.publishedDate;
                // document.getElementById('author').value = data.author;

                document.getElementById('addBtn').dataset.id = data.id;

            })
    })

    parentNode.appendChild(tr);
}