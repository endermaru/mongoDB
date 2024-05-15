// mongoose/weather/service.ts
import WeatherModel from "./model";
import { WeatherInterface } from "./interface";

//CREATE
export async function storeDocument(doc: WeatherInterface): Promise<boolean> { 
    try {
        await WeatherModel.create(doc); //Create operation
    } catch (error) {
        return false;
    }
    return true;
}

//Read
export async function findByZip(
    paramZip: string //ZipCode(filter)를 받아
    ): Promise<Array<WeatherInterface> | null> {
    try {
        //첫번째로 일치하는 dataset(array)을 반환
        return await WeatherModel.findOne({ zip: paramZip }); 
    } catch (err) {
        console.log(err);
    }
    return []; //찾지 못하면 빈 배열을 반환
}

//Update
export async function updateByZip(
    paramZip: string, //Read의 param과 동일한 Filter(ZipCode)
    newData: WeatherInterface //새로운 dataset
    ): Promise<boolean> { //업데이트 성공 여부를 반환
    try {
        //filter & new dataset
        await WeatherModel.updateOne({ zip: paramZip }, newData); 
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

//Delete
export async function deleteByZip(
    paramZip: string    //Read의 param과 동일한 Filter(ZipCode)
    ): Promise<boolean> {   //삭제 성공 여부를 반환
    try {
        await WeatherModel.deleteOne({ zip: paramZip });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}