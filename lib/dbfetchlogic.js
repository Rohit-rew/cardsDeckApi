// firebase imports
require("../lib/firebaseinit")
const { updateDoc } = require("firebase/firestore")
const firestore = require("firebase/firestore")
const { collection, getDocs, getFirestore ,addDoc , deleteDoc , doc , getDoc , field } = firestore
const db = getFirestore()

// all cards array - un-shuffled
const cards = require("../cards")

//random num generator 
function randomNumGen(num){
  const randomNum = Math.floor(Math.random()*num)
  return randomNum
}

//issue a deck
async function createNewDeck(shuffled=false){
  const deckaray = collection(db , "deckArray")

  if (!shuffled){
    const deckId = (await addDoc(deckaray, {cards , removedCards : []})).id
    return deckId
  }
  else if(shuffled){
    const shuffledcards = []
    const cardsCopy = [...cards];
    for(let i = 0 ; i<52 ; i++){
      shuffledcards.push(cardsCopy.splice(randomNumGen(cardsCopy.length) , 1)[0])
    }
    const shuffledDeckId = (await addDoc(deckaray, {cards : shuffledcards , removedCards : []})).id
    return shuffledDeckId;
  }
}


//draw a card from a deck
async function getCards(deckId , draw){

  // get reference of the document (deck)
  const deckref = doc(db , "deckArray" , deckId)
  const cards = getDoc(deckref)

  return cards.then(card=>{
    const cards = card.data().cards  // array of all cards
    const drawncards =  cards.splice(0 , draw) //withdrawn cards removed from all cards
    const removedCards = card.data().removedCards // array of removed cards
    const updatedremovedArray = [...removedCards , ...drawncards] // withdrawn cards added to the removed array 
    updateDoc(deckref , {cards , removedCards : updatedremovedArray}) // all cards array updated and removed cards updated.
    return drawncards; // drawn cards returned to the caller
  })
}

// restore the last drawn card at the end of deck
async function lastRemoved(deckId , last=1){
  console.log(deckId , last)
  const deckref = doc(db , "deckArray" , deckId)
  const cards = getDoc(deckref)

  return cards.then(card=>{
    const cards = card.data().cards  // array of all cards
    const removedCards = card.data().removedCards // array of removed cards
    if(!removedCards.length) throw new Error("no more cards remaining")

    const lastRemoved = removedCards.splice(-last)
    console.log(lastRemoved)
    const newAllCards = [...cards , ...lastRemoved]

    updateDoc(deckref , {cards :newAllCards , removedCards : removedCards}) // all cards array updated and removed cards updated.
    return lastRemoved; // drawn cards returned to the caller
  })
}

// shuffles the remaining deck
async function shuffleDeck (deckid){
  const deckref = doc(db , "deckArray" , deckid)
  const cards = getDoc(deckref)

  return cards.then(cards=>{
    const shuffledDeckArray = [];
    const cardsArray = cards.data().cards
    const cardsCopy = [...cardsArray]
    for(let i = 0 ; i<cardsArray.length ; i++){
      shuffledDeckArray.push(cardsCopy.splice(randomNumGen(cardsCopy.length),1)[0])
    }
    updateDoc(deckref , {cards :shuffledDeckArray}) // all cards array updated  with the shuffled one.
    return shuffledDeckArray
  })

}

module.exports = {createNewDeck , getCards , lastRemoved , shuffleDeck}