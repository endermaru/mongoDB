// src/pages/api/graphql.ts
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../../../graphql/resolvers";
import { typeDefs } from "../../../graphql/schema";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../middleware/db-connect";

//@ts-ignore
const server = new ApolloServer({
    resolvers,
    typeDefs
});
const handler = startServerAndCreateNextHandler(server);
const allowCors = (fn: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");

        if (req.method === "OPTIONS") {
            res.status(200).end();
        }
        return await fn(req, res);
    };

/// 추가된 내용 ///
// 데이터베이스 연결을 한 번만 수행
const connectDB = async () => {
    await dbConnect();
};

connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

export default allowCors(handler);