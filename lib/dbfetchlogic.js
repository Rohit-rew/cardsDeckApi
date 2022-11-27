require("../lib/firebaseinit")
const { updateDoc } = require("firebase/firestore")
const firestore = require("firebase/firestore")
const { collection, getDocs, getFirestore ,addDoc , deleteDoc , doc , getDoc , field } = firestore
const db = getFirestore()

const cards = require("../cards")

function randomNumGen(num){
  const randomNum = Math.floor(Math.random()*num)
  return randomNum
}


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


async function lastRemoved(deckId){
  const deckref = doc(db , "deckArray" , deckId)
  const cards = getDoc(deckref)

  return cards.then(card=>{
    const cards = card.data().cards  // array of all cards
    const removedCards = card.data().removedCards // array of removed cards
    if(!removedCards.length) throw new Error("no more cards remaining")
    const lastDrawnCard = [removedCards.pop()]
    const newAllCards = [...cards , ...lastDrawnCard]

    updateDoc(deckref , {cards :newAllCards , removedCards : removedCards}) // all cards array updated and removed cards updated.
    return lastDrawnCard[0]; // drawn cards returned to the caller
  })
}

module.exports = {createNewDeck , getCards , lastRemoved}