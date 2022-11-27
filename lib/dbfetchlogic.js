require("../lib/firebaseinit")
const { updateDoc } = require("firebase/firestore")
const firestore = require("firebase/firestore")
const { collection, getDocs, getFirestore ,addDoc , deleteDoc , doc , getDoc , field } = firestore
const db = getFirestore()

const cards = require("../cards")


async function createNewDeck(){
  const deckaray = collection(db , "deckArray")
  const data = (await addDoc(deckaray, {cards , removedCards : []})).id
  console.log(data)
  return data
}


async function getCards(deckId , draw){

  const deckref = doc(db , "deckArray" , deckId)
  const cards = getDoc(deckref)
  return cards.then(card=>{
    const cards = card.data().cards  // array of all cards
    const drawncards =  cards.splice(0 , draw)
    const removedCards = card.data().removedCards
    const updatedremovedArray = [...removedCards , ...drawncards]
    updateDoc(deckref , {cards , removedCards : updatedremovedArray})
    return drawncards;
  })
}


module.exports = {createNewDeck , getCards}