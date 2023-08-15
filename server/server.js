const express = require('express');
const app = express();
const cors = require('cors')

const cookieParser = require('cookie-parser')
const PORT = 3000;

app.use( express.json() )
app.use( express.urlencoded({extended:true}) )
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())

require('./config/mongoose.config')
require('./routes/user.routes')(app)
require('./routes/footy.routes')(app)


app.listen(PORT, () => console.log(`port now on: ${PORT}`) );

