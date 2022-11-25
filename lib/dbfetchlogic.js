require("../lib/firebaseinit")
const firestore = require("firebase/firestore")
const { collection, getDocs, getFirestore ,addDoc , deleteDoc , doc } = firestore
const db = getFirestore()


const randomNum = (num)=>{
  const number = Math.floor(Math.random()*num)
  return number
}


async function getAllCards(deckId , draw){


  const deckIdref = collection(db , deckId)
    const array = []
    const snapshot =await getDocs(deckIdref)
      snapshot.forEach(doc=>{
        array.push({...doc.data() , id : doc.id})
      })

    const cardNumber = randomNum(array.length)
    const returncard = array.splice(cardNumber , draw)

    returncard.forEach(card=>{
      const deleteDocRef = doc(db , deckId , card.id);
      deleteDoc(deleteDocRef)
    });

    return returncard;
}


const cards = require("../cards")

async function createNewDeck (deckId){
  const newDeckRef = collection(db , deckId)

  cards.forEach(card=>{
    addDoc(newDeckRef , card)
  })

}

//fetch logic exports 
module.exports = {getAllCards , createNewDeck }