let bodyParser = require('body-parser')

let mongoose = require('mongoose')

let urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true })

let todoSchema = new mongoose.Schema({
    item: String
})


// 測試數據庫的鏈接
let Todo = mongoose.model('Todo', todoSchema)

// let itemOne = Todo({item: 'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved')

// })

// let data = [{ item: 'get milk' }, { item: 'walk dog' }]


module.exports = function (app) {
    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            res.render('todo', { todos: data })
        })
    })
    app.post('/todo', urlencodedParser, function (req, res) {
        let itemOne = Todo(req.body).save(function (err,data) {
            if (err) throw err;
            // console.log('item saved')
            res.json(data)
        })
        
        
    })
    app.delete('/todo/:item', function (req, res) {
        Todo.find({item: req.params.item.replace(/-/g," ")}).remove(function (err,data) { 
            if(err) throw err;
            res.json(data)
         })
    })
}