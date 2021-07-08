const express = require("express")
const bookController = require("../controller/bookController")
const BookAdminAutho = require("../controller/userController")
const router = express.Router()


router.get('/', bookController.getAllBook)

router.get('/:bookId', bookController.getBookById)

router.post('/', BookAdminAutho.AuthorizationAdmin, bookController.save)

router.put('/:bookId', BookAdminAutho.AuthorizationAdmin, bookController.updateBook)
router.delete('/:bookId', BookAdminAutho.AuthorizationAdmin, bookController.deleteBook)

module.exports = router
