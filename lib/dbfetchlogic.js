require("../lib/firebaseinit")
const firestore = require("firebase/firestore")
const { collection, getDocs, getFirestore ,addDoc } = firestore
const db = getFirestore()
const collref = collection(db , "cards")

async function getAllCards(){
    const array = []
    const snapshot =await getDocs(collref)
      snapshot.forEach(doc=>{
        array.push({...doc.data() , id : doc.id})
      })
      console.log(array)
    return array[0]
}

async function createNewDeck (deckId){

  const newDeckRef = collection(db , deckId)
  addDoc(newDeckRef , {
    hello : "yessssssss"
  })

}

//fetch logic exports 
module.exports = {getAllCards , createNewDeck }