import { ApolloServer, gql } from "apollo-server-azure-functions";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { CosmosClient, Item } from "@azure/cosmos";

const typeDefs = gql`
    type ListItem {
        id: ID,
        list: List!
        Title: String,
        Status: String,
        CompletionDate: String
    }

    type List {
        id: ID,
        title: String
        items: [ListItem]
    }

    type Query {
        Lists: [List]
        ListById(listId: String!): List
        ListItems(listId: String!): [ListItem]
    }
`;

const resolvers = {
    List: {
        async items(parent) {
            let results = await client
                .database("ToDoList")
                .container("Items")
                .items.query({
                    query: "SELECT * FROM c WHERE c.listId=@listId",
                    parameters: [
                        {
                            name: "@listId",
                            value: parent.id
                        }
                    ]
                })
                .fetchAll();

            return results.resources;
        }
    },
    Query: {
        async Lists(_) {
            let results = await client
            .database("ToDoList")
            .container("Lists")
            .items.query({
                query: "SELECT * FROM c"
            })
            .fetchAll();

        return results.resources; 
        },
        async ListById(_, {listId}: {listId:String}) {
            let results = await client
                .database("ToDoList")
                .container("Lists")
                .items.query({
                    query: "SELECT * FROM c WHERE c.id=@listId",
                    parameters: [
                        {
                            name: "@listId",
                            value: listId
                        }
                    ]
                })
                .fetchAll();

            return results.resources[0];
        },
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