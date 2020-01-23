//  Match game
// const gamePage = document.querySelector("a");
const initGameLink = document.querySelector("a.initializeGame"); 
const gameboard = document.querySelector(".container");
const gameScore = document.querySelector("#score-card span");
const maxCardsOpened = 2;

let cardsOpen = 0;    // Count # of cards currently open
let matchAttempts = 0; // Keep running total of # of match attempts (cards opened)
let matchCandidates = [];

function MatchCandidate(element, elementId) {
  this.element = element;
  this.elementId = elementId;
}
// gamePage.addEventListener('click', function(){

// })

function initGame() {
  let flipCards = document.querySelectorAll(".flip-card");
  for (const flipCard of flipCards) {
    flipCard.classList.remove("flipOver");
  }
  gameScore.innerText = 0;
  matchAttempts = 0;
  cardsOpen = 0;
  matchCandidates = [];
}

initGameLink.addEventListener('click', function(e){
  initGame();
})

gameboard.addEventListener('click', function(e) {
  // Need access to flipcard to apply class to start flip animation
  let flipCardClicked = e.target.parentElement.parentElement

  // Make user clicked on card & don't allow user to open more than 2 cards at a time
  if (e.target.className === 'flip-card-front' && cardsOpen < maxCardsOpened ) {
    matchCandidates[cardsOpen] = new MatchCandidate(flipCardClicked, flipCardClicked.dataset.id);
    matchAttempts +=1; // Track total match attempts made during game
    gameScore.innerText = matchAttempts; // Update GameScore (match attempts)
    // Add class to flip over card
    flipCardClicked.classList.toggle("flipOver") // Add class to initiate flip card
    cardsOpen += 1; // Track total# of cards open at any one time

    // If cards didn't match then close them and reset match candidate tranking information
    if ( cardsOpen === maxCardsOpened && matchCandidates[0].elementId !== matchCandidates[1].elementId) {
      setTimeout(function() {
        matchCandidates.forEach(matchCandidate =>{
          matchCandidate.element.classList.toggle("flipOver")
        }); 
        matchCandidates = [];
        cardsOpen = 0;
       }, 1000);
    } else {
      if (cardsOpen === maxCardsOpened) {
        cardsOpen = 0;
         matchCandidates = [];
      }
    }

  }
})