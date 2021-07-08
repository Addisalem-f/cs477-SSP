const BookC = require("../models/book")

exports.getAllBook = (req, res, next) => {
    res.status(200).json(BookC.fetchAll())
}

exports.getBookById = (req, res, next) => {
    res.status(200).json(BookC.findBookById(req.params.bookId))
}
exports.save = (req, res, next) => {
    const Bbook = req.body;
    const createdBook = new BookC(null, Bbook.title, Bbook.ISBN, Bbook.publishedDate, Bbook.author).save()
    res.status(201).json(createdBook)
}

exports.updateBook = (req, res, next) => {
    const book = req.body
    let updatedBook = new BookC(req.params.bookId, book.title, book.ISBN, book.publishedDate, book.author).updateBook()
    res.status(200).json(updatedBook)
}
exports.deleteBook = (req, res, next) => {
    BookC.deleteBook(req.params.bookId)
    res.status(200).end()
}
