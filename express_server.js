const express = require('express')
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')


const PORT = process.env.PORT || 8080; //set port 8080

const app = express()
const username = []

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

function generateRandomString() {
  var text = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i=0; i < 6; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return text;
}

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.ca"
};


app.get ("/", (req,res) => {
  res.end("This is the home page")
});

app.get ("/urls.json", (req, res) => {
  res.json(urlDatabase)
});

app.get ("/hello", (req, res) => {
  res.end("<html><body>Hello <b> world </b></body></html>\n")
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
})

app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies["username"]
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    URL: urlDatabase[req.params.id],
  }
  let longURL = urlDatabase[req.params.id]
  console.log(templateVars)
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL]
  console.log('longUrl', longURL)
  res.redirect(longURL);
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id]
  // console.log(urlDatabase)
  res.redirect('/urls')
})

app.post("/urls/:id/update", (req, res) => {
  // console.log(req.body)
  urlDatabase[req.params.id] = req.body['new_url']
  console.log('New Link updated')
  res.redirect('/urls')
})

app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect('/urls')
})

app.post("/logout", (req, res) => {
  res.clearCookie("username", req.cookies['username']);
  res.redirect('/urls')

})

app.post("/urls", (req, res) => {
  let shorten = generateRandomString()
  urlDatabase[shorten] = req.body.longURL

  res.redirect('/urls/' + shorten)
});

app.listen(PORT, function(err) {
  if (err) {
    return console.log(err)
  }
  console.log(`Server listening on: http://localhost.com:${PORT}`)
});