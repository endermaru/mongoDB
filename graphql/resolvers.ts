//graphql/resolver.ts

import { WeatherInterface } from "../mongoose/weather/interface";
import { findByZip, updateByZip, storeDocument, deleteByZip } from "../mongoose/weather/services";
export const resolvers = {
    Query: {
        read: async (_: any, param: WeatherInterface) => {
            let data = await findByZip(param.zip);
            return [data];
        },
    },
    Mutation: {
        update: async (_: any, param: { data: WeatherInterface }) => {
            await updateByZip(param.data.zip, param.data);
            let data = await findByZip(param.data.zip);
            return [data];
        },
        create: async (_: any, param: { data: WeatherInterface }) => {
            await storeDocument(param.data);
            let data = await findByZip(param.data.zip);
            return [data];
        },
        delete: async (_: any, param: WeatherInterface) => {
            let data = await deleteByZip(param.zip);
            return [data];
        },
    },
};

