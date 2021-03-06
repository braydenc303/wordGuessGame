

// Variables------------------------------------------------------------
// stores all possible words
var secretWords = ["hi", "thrilled", "green", "ruby", "leeloo", "perfect", "fifth", "element", "finger", "cab", "autowash", "priest"];

// holds the array of image addresses
var images = ["assets/images/wordoftheday.jpg", "assets/images/thrilled.jpg", "assets/images/green.jpg", "assets/images/ruby.jpg", "assets/images/leeloo.gif", "assets/images/perfect.jpg", "assets/images/fifth.jpg", "assets/images/element.png", "assets/images/finger.png", "assets/images/cab.jpg", "assets/images/autowash.jpg", "assets/images/priest.jpg"]

// This would have been an easier solution to correlating these values. Instead of trying to keep two separate
// arrays correlated, I could have simply made each word/image pair an object.
// var combo = [ 
//     {word: "hi",
//     src: "assets/images/wordoftheday.jpg"},
//     ]


// holds the position of the next image to display
var nextImg = 0;

var nxt = "";

// tracks wins
var wins = -1;

// stores letters guessed
var lettersGuessed = [];

// tracks how man guesses are left
var guesses = 6;

// holds the string for display of missing and guessed letters
var hiddenLetters = ""

// holds the array of hidden and guessed letters
var hidden = [];

// holds the string of the current word
var letters = "";

// holds the array of incorrect guesses for the current word
var incorrect = [];

// holds the array of valid guesses
var validGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Functions------------------------------------------------------------
//resets/starts the game
function resetGame() {
    validGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    //checks to see if all the words have been guessed
    checkChampion();

    var x = document.getElementById("myAudio"); 
    function playAudio() { 
    x.play(); 
    }
    playAudio();
    
    //chooses the current word randomly from the list of available words
    var secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];  
    // console.log(secretWord);

    //the next two lines set the variables to correctly display the image relating to the word that was guessed for the following round.
    nextImg = secretWords.indexOf(secretWord);

    nxt = images[nextImg];
    
    // removes the current word and the corresponding image from the array of available words and images
    images.splice(secretWords.indexOf(secretWord), 1);

    secretWords.splice(secretWords.indexOf(secretWord), 1);
    // console.log(secretWords);

    // populates an array with the letters of the secret word
    letters = secretWord.split("");
    //resets the string of hidden and guessed letters
    hiddenLetters = ""; 
    //resets the array of hidden and guessed letters
    hidden =[];
    //resets the array of incorrect guesses
    incorrect= [];
    //resets the remaining guesses
    guesses = 6;
    // console.log(letters);

    //Displays the number of letters in the current word as follows:
    //If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.
    for (var i = 0; i < letters.length; i++) {
        //creates the string of letter spaces to display for the current word
        hiddenLetters = hiddenLetters + "_ "; 
        //populates the array of hidden letters to begin with
        hidden.push("_ ");   
    }
        //displays the number of spaces in the word
        document.getElementById("secretWord").textContent = hiddenLetters;
        //displays the current number of incorrect guesses remaining
        document.getElementById("remaining").textContent = guesses;
        //displays the current number of wins
        document.getElementById("wins").textContent = wins;
        //displays the incorrect letters guessed so far
        document.getElementById("lettersGuessed").textContent = '';
        // console.log(hidden);
        // console.log(hiddenLetters);
        // console.log(letters);
}

// this function returns an array of the index numbers of the userGuess in the current word
function getAllIndexes(arr, val) {
    var indexes = [];
    var i;
    for( i = 0; i < arr.length; i++) {
        if (arr[i] === val){
            indexes.push(i);
        }
    }
            return indexes;
    
}
// this function checks to see if all of the letters in the current word have been guessed correctly
function checkWin() {
    if (hidden.toString() === letters.toString()){
        wins++;
        if(hiddenLetters != ""){
        alert( hiddenLetters + "!");
        changeImage();
        document.getElementById("myAudio").src = "assets/sounds/hot.mp3";
        }
        resetGame();
    }
}

function changeImage() {
    var image = document.getElementById("dispImg");
    image.src = nxt;
}

// this function checks to see if all of the words have been guessed correctly
function checkChampion() {
    if (wins == 12) {
        document.getElementById("game").textContent = "Congratulations! You guessed them all!";
    }
}

//this function adds the user guess to the hidden letters in the proper positions if it is correct
function correctGuess(userGuess) {
    hiddenLetters = "";
        if (hidden.toString() !== letters.toString()){
        for (var i = 0; i < getAllIndexes(letters, userGuess).length; i++) {
        hidden[getAllIndexes(letters, userGuess)[i]] = userGuess;
        }
        for (var i = 0; i < letters.length; i++) {
            hiddenLetters = hiddenLetters + hidden[i]; 
        }
    } 
}

//this function adds the user guess to the incorrect guesses and removes that letter from the valid choices
function incorrectGuess(userGuess) {
        guesses--;
        document.getElementById("remaining").textContent = guesses;
        incorrect.push(userGuess);
        document.getElementById("lettersGuessed").textContent = incorrect;
        validGuesses.splice(validGuesses.indexOf(userGuess), 1);
        // console.log(validGuesses);
}


// Main Process------------------------------------------------------------
// press any key to start. I had changed this to a button click to make life easier.
// document.getElementById("myBtn").addEventListener("click", resetGame);

document.onkeyup = function(event) {
    document.getElementById("begin").textContent = '';

    //check to see if player has won and increment the counter
    checkWin();

    //check to see if all words have been guessed
    checkChampion();  
     
    var userGuess = event.key.toLowerCase();
    //if the user guess is in the word, check to see if it has been completely guessed and if not display the correct letters where they appear in the current word
    if (letters.indexOf(userGuess) != -1) {
        correctGuess(userGuess); 
        checkWin();
        
        document.getElementById("secretWord").textContent = hiddenLetters;
        // console.log(hiddenLetters);
    //if not add the letter to the previously guessed letters, remove that letter from valid guesses, decrement the guesses remaining, and if zero end the game
    } else if (validGuesses.indexOf(userGuess) != -1) {
        incorrectGuess(userGuess);
        if (guesses == 0) {
        document.getElementById("game").textContent = "Game Over! Click refresh to try again.";
        }
    }
    
}
