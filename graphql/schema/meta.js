import { gql } from "apollo-server-koa";

export default gql`
    type Meta {
        createdAt: String
        updatedAt: String
    }
`;