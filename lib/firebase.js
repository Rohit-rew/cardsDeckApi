const { initializeApp } = require("firebase/app");
const {collection , getFirestore , getDocs, doc} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCttqOv8v6mCtzDoDt5nA9K60TfwyjGdGQ",
  authDomain: "cardsapi-3161d.firebaseapp.com",
  projectId: "cardsapi-3161d",
  storageBucket: "cardsapi-3161d.appspot.com",
  messagingSenderId: "655037940397",
  appId: "1:655037940397:web:13608cfe6cc6f9a001bc24",
  measurementId: "G-SGB0V8Y7T9",
};

initializeApp(firebaseConfig);

const db = getFirestore()
const collref = collection(db , "cards")




async function fetch(){
    const array=[]
    const data = await getDocs(collref)
    const res = data.forEach(doc=>{
        console.log("yes")
        array.push({...doc.data() , id :doc.id})
    })

    return array
}


async function call(){
    const data = await fetch()
    console.log(data)
} 

call()





// getDocs(collref)
// .then(snapshot=>{
//     snapshot.forEach(doc=>{
//         console.log(doc.id)
//         array.push({id : doc.id})
//     })
// })
// .catch(err=>{
//     console.log(err)
// })