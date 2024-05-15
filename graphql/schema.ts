//graphql/schema.ts

import gql from "graphql-tag"

export const typeDefs = gql`
    type LocationWeatherType {
        zip: String!
        weather: String
        tempC: String!
        tempF: String!
        friends: [String]!
    }
    input LocationWeatherInput {
        zip: String!
        weather: String
        tempC: String
        tempF: String
        friends: [String]
    }
    type Query {
        read(zip: String): [LocationWeatherType]!
    }
    type Mutation {
        update(data: LocationWeatherInput): [LocationWeatherType]!
        create(data: LocationWeatherInput): [LocationWeatherType]!
        delete(zip: String): [Boolean!]
    }
`;
