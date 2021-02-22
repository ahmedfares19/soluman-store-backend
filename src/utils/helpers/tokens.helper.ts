import { plainToClass } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { Mongoose, ObjectId } from 'mongoose';

export interface Payload{
    id:ObjectId,
}
export function generateAuthToken (id:ObjectId):string {
        try{
            let token:string = jwt.sign({id:id},"secrect");
            return token;
        }catch(err){
            return err
        }
}
export function getAuthTokenPayload (token:string):Payload {
    let decoded = jwt.verify(token , "secrect",{ complete: true });
    const payload = (decoded as any).payload;
    return payload
}