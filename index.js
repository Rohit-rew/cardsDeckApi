// express init
const express = require("express");
const app = express();

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



//server start
const start = () => {
  try {
    app.listen(port, console.log(`server started at ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
