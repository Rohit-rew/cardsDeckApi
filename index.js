// express init
const express = require("express");
const app = express();
const fs = require("fs")

//env config
const env = require("dotenv");
env.config();
const port = process.env.PORT || 4000;


//graphql
const GraphQLSchema = require("./Schema/graph")
const {graphqlHTTP} = require("express-graphql");


app.use("/graphql" , graphqlHTTP({
    schema : GraphQLSchema,
    graphiql : true,
}) )

app.use("/" ,  (req,res)=>{
   fs.readFile("./index.html" , "utf8" , (err , data)=>{
    if(err){
        console.log(err)
    }else{
        res.write(data)
        res.end();
    }
   })
})


//server start
app.listen(port, console.log(`server started at ${port}`));

module.exports = app
