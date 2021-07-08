const express = require("express")
const BookRout = require("./router/bookRouter")
const authRouter = require("./router/authRouter")
const cors = require('cors')


const app = express()

app.use(cors())

app.use(express.json());

app.use(authRouter)//login

// app.get('/books/:bookId', function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for all origins!' })
// })
app.use('/books', BookRout)
app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});
// app.use((err, req, res, next) => {
//     if (err.message === "not found") {
//         res.status(404).json({ err: err.message })
//     } else {
//         res.status(500).json({ error: "something wrong try later" })
//     }
// });


app.listen(3003, () => { console.log("server is running on 3003....") })