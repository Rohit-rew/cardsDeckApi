require("../lib/firebaseinit")
const firestore = require("firebase/firestore")
const { collection, getDocs, getFirestore } = firestore
const db = getFirestore()
const collref = collection(db , "cards")

async function getAllCards(){
    const array = []
    const snapshot =await getDocs(collref)
      snapshot.forEach(doc=>{
        array.push({...doc.data() , id : doc.id})
      })
    return array[0]
}


//fetch logic exports 
module.exports = {getAllCards}