import { gql } from 'apollo-server-koa';

import metaSchema from './meta';
import userSchema from './user';
import profileSchema from './profile';

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

export default [
    metaSchema,
    linkSchema,
    userSchema,
    profileSchema
];
