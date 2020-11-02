import { gql } from "apollo-server-koa";

export default gql`
    extend type Mutation {
        createUser(input: createUserInput!): User
        updateUser(id: ID, input: updateUserInput!): User
    }

    extend type Query {
        user(id: ID): User
        users(limit: Int, offset: Int): UserRes
    }

    type UserRes {
        total: Int
        data: [User]
    }

    type User {
        id: String
        name: String
        age: Int
        avatar: String
        meta: Meta
        profile: Profile
    }
    
    input createUserInput {
        name: String!
        age: Int!
        avatar: String!
    }

    input updateUserInput {
        name: String
        age: Int
        avatar: String
    }
`;