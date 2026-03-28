const express = require('express')
const connectDB = require('./config/database')
const controller = require('./controller/todoController')
const cors = require('cors')
const cookies = require('cookie-parser')
const app = express()
const jwt = require('jsonwebtoken');
const port = 3000


connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookies())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

//varify token Middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.send({ message: 'No token', success: false });
    }
    jwt.verify(token, 'unique', (err, decoded) => {
        if (err) {
            return res.send({ message: 'Invalid token', success: false });
        }
        next();
    });
};

// list
app.get('/', verifyToken, controller.handleAddTask)

// add task
app.post('/add-task', controller.handlePostTask)
//delete
app.delete('/delete/:id', controller.handleDelete)
//nevigate
app.get('/nevigate/:id', controller.handleNevigate)

//update
app.put('/update', controller.handleUpdate)

//multiple delete
app.delete('/multiple-delete', controller.handleMultipleDelete)

//signup
app.post('/signup', controller.handleSignup)

//signIn

app.post('/signin', controller.handleSignin)


app.listen(port, () => {
    console.log(`servre is rounning on port ${port}`)
})