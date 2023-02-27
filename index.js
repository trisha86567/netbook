const express = require('express')
const app = express()
const port = 3000
const multer  = require('multer')
const db = require('./config/mongoose')
const MongoStore = require('connect-mongo');
const router =require('./routes') 
const expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.urlencoded())
app.set('view engine','ejs')
app.set('views','./views')

const flash = require('connect-flash');
const customMware = require('./config/middleware');
// const sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var session = require('express-session');
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy');
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(session({
  secret: 'password',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge:(1000*60*90)
  },
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/netBook' })
  // store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/connectmongosession' })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use(expressLayouts)
app.set('layout extractStyles', true)
app.set('layout extractScripts', true);

app.use('/',router )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})