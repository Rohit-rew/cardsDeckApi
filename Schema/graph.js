const graphql = require("graphql")

// firebase logic imports
const {getAllCards} = require("../lib/dbfetchlogic")


//graphql starts
const {
GraphQLSchema,
GraphQLObjectType,
GraphQLInt,
GraphQLString
} = graphql


// Types
const CardType = new GraphQLObjectType({
    name : "Card",
    fields : ()=>{
        return {
            card : {type :GraphQLString},
            id : {type : GraphQLString}
        }
    }
})



//Rootquery
const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        card : {
            type : CardType,
            args : {id : {type : GraphQLInt} },
            resolve(parent , args){
                return getAllCards()
            }
        }
    }
})



// schema export
module.exports = new GraphQLSchema({
    query : RootQuery
})
