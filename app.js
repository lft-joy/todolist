let express = require('express')

let routers = require('./routers/main')

let app = express()

app.set('view engine','ejs')

app.use(express.static('./public'))

routers(app)

app.listen(3000)

console.log('you are listening to port 3000')

