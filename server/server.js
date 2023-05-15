const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

let jokes = [
  {
    whoseJoke: "Danny",
    jokeQuestion: "Why do scuba divers fall backwards out of boats?",
    punchLine: "If they fell forwards they’d still be in the boat!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Two fish are in a tank. What did one fish say to the other?",
    punchLine: "Do you know how to drive this thing?"
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!"
  },
  {
    whoseJoke: "dEv",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs!"
  },
  {
    whoseJoke: "Scott",
    jokeQuestion: "I went to the zoo the other day, it had one dog...",
    punchLine: "It was a shih tzu."
  }
];

// serve back static files
app.use(express.static('server/public'));

app.get('/jokehistory', function(req, res) {
  console.log(jokes);
  res.send(jokes);
})

//route to post a new joke
app.post('/jokehistory', function(req,res) {
  //isolate the parts, store the final result
  // let result=calculator(isolateParts(req.body.input1));
  //store a string of the joke
  // let joke=`${req.body.input1} = ${result}`
  //push the new joke into the history array
  jokes.push(req.body);
  // Send back a status code of 201
  res.sendStatus(201);
});








app.listen(PORT, () => {
  console.log('server running on: ', PORT);
}); // end spin up server
