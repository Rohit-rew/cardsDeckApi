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
            code : {type : GraphQLString},
            imageUrl : {type : GraphQLString},
            suite : {type : GraphQLString},
            value : {type : GraphQLInt}
        }
    }
})

const DeckType = new GraphQLObjectType({
    name : "DeckId",
    fields : ()=>{
        return {
            id : {type : GraphQLString},
        }
    }
})



//=> QUERY
const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        card : {
            type : CardType,
            args : {deckid : {type : GraphQLString} },
            resolve(parent , args){
                return getAllCards()
            }
        },
     
    }
})

//=> MUTATION
const DrarDecks = new GraphQLObjectType({
    name : "DrawDecks",
    fields : {
        deckid : {
            type : DeckType,
            args : {decks : {type : GraphQLInt}, shuffled : {type : graphql.GraphQLBoolean} , },
            resolve(parent , args){
                return {id : "hello there"}
            }
        }
    }
})



// schema export
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : DrarDecks
})
