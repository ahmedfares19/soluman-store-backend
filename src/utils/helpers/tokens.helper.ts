import { plainToClass } from "class-transformer";
import jwt from "jsonwebtoken";
import { Mongoose, ObjectId } from "mongoose";
import logger from "../logs/logger";

export interface Payload {
  id: ObjectId;
}
export function generateAuthToken(id: string): string {
  try {
    return  jwt.sign({ id: id }, "secrect")
  } catch (err) {
    return err;
  }
}
export function getAuthTokenPayload(token: string): any {
  try {
    let decoded = jwt.verify(token, "secrect", { complete: true });
    const payload = (decoded as any).payload;
    return payload;
  } catch (error) {
    return false;
  }
}
