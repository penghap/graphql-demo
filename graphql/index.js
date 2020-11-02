import { ApolloServer, gql } from 'apollo-server-koa';
import schema from './schema'
import resolvers from './resolvers'
const server = new ApolloServer({
    introspection: true,
    typeDefs: schema,
    resolvers,
});
export default server