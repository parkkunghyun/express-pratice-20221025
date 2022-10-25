const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const  session = require('express-session')
const  dotenv  = require('dotenv')
const app = express()
const path = require('path')

dotenv.config();

//app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use((req,res,next)=> {
    console.log('모든 요청에 다 실행')
    next()
})
app.get('/',(req,res,next)=>{
    console.log('GET요청에 실행')
    next()
    //res.sendFile(path.join(__dirname,'/index.html'))
}, (req,res) => {
    throw new Error('에러는 에러처리 미들웨어로 감')
})

app.use((err,req,res,next)=> {
    console.error(err)
    res.status(500).send(err.message)
})

app.listen(app.get('port'),()=> {
    console.log(app.get('port'))
})