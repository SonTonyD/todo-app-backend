const express = require("express");
const app = express();
const db = require("./database");
const PORT = process.env.PORT || 8000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

////////////
// Routes //
////////////

app.get('/api/getTodoListElement', (req,res,next) => {
    db.getTodoListElement(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})

app.put('/api/putEditTodoListElement', (req,res,next) => {
    db.putEditTodoTaskElement(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})

app.post('/api/postTodoListElement', (req,res,next) => {
    db.postTodoListElement(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})

app.post('/api/deleteTodoListElement', (req,res,next) => {
    console.log("deleteTodoListElement: ", req.body)
    db.deleteTodoListElement(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})



app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));