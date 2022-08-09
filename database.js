const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "ynot6803",
    database: "todo_app",
});

function getTodoListElement(req) {
    let id = req.headers.authorization.slice(0,400);
    console.log("");
    console.log(id);
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM todolist WHERE user_id = '${id}' ` ;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
}

function putEditTodoTaskElement(req) {
    let isDone = req.body.isDone
    let task_id = req.body.task_id;
    console.log("");
    return new Promise((resolve, reject) => {
        var sql = `UPDATE todolist SET isDone = '${isDone}' WHERE task_id = ${task_id} ` ;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
}

function postTodoListElement(req) {
    let name = req.body.name;
    let user_id = req.body.user_id;
    let isDone = req.body.isDone
    
    console.log("");
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO todolist (name, user_id, isDone, isHidden) VALUES ('${name}','${user_id}',${isDone},${0}) ` ;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
}

function deleteTodoListElement(req) {
    let task_id = req.body.task_id;
    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM todolist WHERE task_id = ${task_id}` ;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
}






// Export the functions so other modules/files can use them
module.exports = {
    getTodoListElement,
    putEditTodoTaskElement,
    postTodoListElement,
    deleteTodoListElement,
};