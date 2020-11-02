import { gql } from "apollo-server-koa";

export default gql`
    extend type Mutation {
        createProfile(userId: ID, input: createProfileInput!): Profile
        updateProfile(id: ID, input: updateProfileInput!): Profile
    }

    extend type Query {
        profile(userId: ID): Profile
    }

    type Profile {
        address: String
        user: User
    }
    
    input createProfileInput {
        address: String!
    }

    input updateProfileInput {
        address: String!
    }
`;