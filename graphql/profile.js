import { GraphQLObjectType, GraphQLString } from 'graphql';

export const profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    address: {
      type: GraphQLString,
    }
  },
});
