// mongoose/weather/model.ts
import mongoose, { model } from "mongoose";
import { WeatherInterface } from "./interface";
import { WeatherSchema } from "./schema";
export default mongoose.models.weathers || 
    //기존 Weather 모델이 존재하면 사용
    model<WeatherInterface>("weathers", WeatherSchema); 
    //기존 모델이 없으면 Weather 모델 생성(모델 이름, schema)