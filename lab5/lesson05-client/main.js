window.onload = function () {
    fetchBooks();

    document.getElementById('addBtn').onclick = function (event) {
        event.preventDefault();
        const productId = this.dataset.id;
        if (productId) { //data-id exists - edit a product
            console.log('---------------');
            fetch('http://localhost:3003/books/' + productId, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
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
                    document.getElementById('form-title').textContent = "Add a Product";
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
            attachSingleProduct(document.getElementById('book-list-body'), bookL);
        });
}

async function fetchBooks() {
    const books = await (await fetch('http://localhost:3003/books')).json();
    const tbody = document.getElementById('book-list-body');
    books.forEach(prod => {
        attachSingleProduct(tbody, prod);
    })
}

function attachSingleProduct(parentNode, book) {
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
            method: 'DELETE'
        })
            .then(data => {
                tr.remove();
                // console.log(data)
            });

    });

    updateButton.addEventListener('click', function () {
        fetch('http://localhost:3003/books/' + book.id)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                document.getElementById('form-title').textContent = "Edit a book";
                document.getElementById('title').value = data.title;
                document.getElementById('ISBN').value = data.ISBN;
                document.getElementById('publishedDate').value = data.publishedDate;
                document.getElementById('addBtn').dataset.id = data.id;

            })
    })

    parentNode.appendChild(tr);
}