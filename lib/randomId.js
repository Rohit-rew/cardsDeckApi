const randomId =  ()=>{
    let id = []
    let randomNum = ()=>{
       let randonnum =  Math.floor(Math.random()*9)
        return randonnum
    } 
    for (let i=0 ; i<11 ;i++){
        id.push(randomNum())
    }
    return id.join("");
}

module.exports = randomId