const graphql = require("graphql")
require("../lib/firebase")
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
            name : {type :GraphQLString}
        }
    }
})




const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        card : {
            type : CardType,
            args : {id : {type : GraphQLInt} },
            resolve(parent , args){
                return {name : "Rohit"}
            }
        }
    }
})




module.exports = new GraphQLSchema({
    query : RootQuery
})