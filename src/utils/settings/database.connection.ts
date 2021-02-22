import mongoose from 'mongoose';
import { resolve } from 'path';
import env from './env';

export default connectToDB

function connectToDB():Promise<any> {
    return new Promise(async (resolve, reject) => {
        try{
            mongoose.connect(env.DATABASE_URL+env.DATABASE_NAME, {useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
            if(!err)
                resolve(">>>>> Database connected")
            else
                reject(err)
            })
            const status = mongoose.connection.readyState
        } catch(err){
            reject(err)
        }
    })
}