// Create web server
const express = require('express');
const app = express();
// Create a server
const http = require('http');
const server = http.createServer(app);
// Create a socket server
const socket = require('socket.io');
const io = socket(server);
// Create a path
const path = require('path');
// Create a cookie
const cookieParser = require('cookie-parser');
// Create a session
const session = require('express-session');
// Create a MySQL
const mysql = require('mysql');
// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'comments'
});
// Connect to MySQL
connection.connect();
// Set view engine
app.set('view engine', 'ejs');
// Set view path
app.set('views', path.join(__dirname, 'views'));
// Set public path
app.use(express.static(path.join(__dirname, 'public')));
// Set cookie
app.use(cookieParser());
// Set session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
// Set post
app.use(express.urlencoded({ extended: false }));
// Set get
app.use(express.json());
// Set socket
io.on('connection', socket => {
  console.log('Socket is connected');
  // Receive message
  socket.on('message', data => {
    // Send message
    io.emit('message', data);
  });
});
// Set get
app.get('/', (req, res) => {
  // Set query
  const query = 'SELECT * FROM comments';
  // Query MySQL
  connection.query(query, (error, results) => {
    // If there is an error
    if (error) throw error;
    // Render ejs
    res.render('index', { comments: results });
  });
});
// Set post
app.post('/', (req, res) => {
  // Set variables
  const name = req.body.name;
  const message = req.body.message;
  // Set query
  const query = 'INSERT INTO comments (name, message) VALUES (?, ?)';
  // Query MySQL
  connection.query(query, [name, message], (error) => {
    // If there is an error
    if (error) throw error;
    // Redirect
    res.redirect('/');
  });
});
// Set post
app.post