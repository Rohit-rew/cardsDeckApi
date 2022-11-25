const graphql = require("graphql")
// firebase logic imports
const {getAllCards , createNewDeck} = require("../lib/dbfetchlogic")


//graphql starts
const {
GraphQLSchema,
GraphQLObjectType,
GraphQLInt,
GraphQLString,
GraphQLList
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
            id : {type : GraphQLString}
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
            args : {deckid : {type : GraphQLString} , draw : {type : GraphQLInt} },
            resolve(parent , args){
                return getAllCards(args.deckid , args.draw)
            }
        },
        cards : {
            type : new GraphQLList(CardType),
            args : {deckid : {type : GraphQLString} , draw : {type : GraphQLInt}},
            resolve(parent , args){
                return getAllCards(args.deckid , args.draw)
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
                const id = randomIdGenerator()
                createNewDeck(id)
                return {id : id}
            }
        }
    }
})


// schema export
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : DrarDecks
})


