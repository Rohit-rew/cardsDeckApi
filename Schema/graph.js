const graphql = require("graphql")
// firebase logic imports
const {getAllCards , createNewDeck , getSingleCard , getCards , lastRemoved} = require("../lib/dbfetchlogic")

//graphql starts
const {
GraphQLSchema,
GraphQLObjectType,
GraphQLInt,
GraphQLString,
GraphQLList,
GraphQLNonNull
} = graphql


//randomID generator
const randomIdGenerator = require("../lib/randomId")

// Types
const CardType = new GraphQLObjectType({
    name : "Card",
    fields : ()=>{
        return {
            code : {type : GraphQLString},
            imageUrl : {type : GraphQLString},
            suite : {type : GraphQLString},
            value : {type : GraphQLInt},
            // id : {type : GraphQLString}
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
        cards : {
            type : new GraphQLList(CardType),
            args : {deckid : {type : GraphQLString} , draw : {type : GraphQLInt} },
            resolve(parent , args){
                return getCards(args.deckid , args.draw)
            }
        },
        replace : {
            type : CardType,
            args : {deckId : {type : GraphQLString} },
            resolve(parent , args){
                return lastRemoved(args.deckId)
            }
        }
    }
})

//=> MUTATION
const DrarDecks = new GraphQLObjectType({
    name : "DrawDecks",
    fields : {
        deckid : {
            type : DeckType,
            args : {decks : {type : GraphQLInt}, shuffled : {type : graphql.GraphQLBoolean} },
            resolve(parent , args){
                return {id : createNewDeck(args.shuffled)}
            }
        }
    }
})


// schema export
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : DrarDecks
})


