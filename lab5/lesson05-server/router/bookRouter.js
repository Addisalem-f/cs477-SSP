const express=require("express")
const bookController=require("../controller/bookController")
const router=express.Router()


router.get('/',bookController.getAllBook)

router.get('/:bookId',bookController.getBookById)

router.post('/',bookController.save)

router.put('/:bookId',bookController.updateBook)
router.delete('/:bookId',bookController.deleteBook)

module.exports=router
