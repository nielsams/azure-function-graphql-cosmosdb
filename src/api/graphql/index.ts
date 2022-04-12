import { ApolloServer, gql } from "apollo-server-azure-functions";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { CosmosClient } from "@azure/cosmos";

const typeDefs = gql`
    type ListItem {
        Title: String,
        Status: String,
        CompletionDate: String
    }

    type ToDoListQuery {
        ListItems(listId: String!): [ListItem]
    }

    schema {
        query: ToDoListQuery
    }
`;

const resolvers = {
    ToDoListQuery: {
        async ListItems(_, {listId}: {listId:String}) {
            let results = await client
                .database("ToDoList")
                .container("Items")
                .items.query({
                    query: "SELECT * FROM c WHERE c.listId=@listId",
                    parameters: [
                        {
                            name: "@listId",
                            value: listId
                        }
                    ]
                })
                .fetchAll();

            return results.resources;
        }
    }
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins: [
        process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageGraphQLPlayground(),
      ], 
});

const client = new CosmosClient(process.env.CosmosKey);

export default server.createHandler({
    cors: {
      origin: '*'
    },
});