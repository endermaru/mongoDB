// src/pages/api/weather/[zipcode].ts

import type { NextApiRequest, NextApiResponse } from "next";
import { findByZip } from "../../../../mongoose/weather/services";
import dbConnect from "../../../../middleware/db-connect";

type WeatherDetailType = {
    zip: string;
    weather: string;
    tempC: string;
    tempF: string;
    friends: string[];
};

dbConnect();

export default async function handler(req: NextApiRequest,res: NextApiResponse)
    : Promise<NextApiResponse<WeatherDetailType> | void> {
    let data = await findByZip(req.query.zipcode as string);
    console.log(data);
    return res.status(200).json(data);
}
