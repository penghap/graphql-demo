import { ApolloServer, gql } from 'apollo-server-koa';
import schema from './graphql/schema'
const server = new ApolloServer({
    schema
});
export default server;
