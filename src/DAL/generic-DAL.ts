import { IWrite } from "../core/interfaces/generics/write-DaL.interface";
import { IRead } from "../core/interfaces/generics/read-DAL.interface";
import { Model } from "mongoose";
import { MongoErrorMapper } from "../utils/helpers/error-handler";
import { resolve } from "path";

 /* 
  this interface follow generic repository pattern
  @refrence https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e
 */
export abstract class BaseDal<T> implements IWrite<T>, IRead<T> {
  private _model: any;
   
  public set model(v :any) {
    this._model = v;
  }
  
  public get model() : any {
    return this._model
  }
  
  /* 
  @param model object to be inserted into selected model
  */
  async create(item: T): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this._model.create(item);
        resolve(result);
      } catch (error) {
        reject(MongoErrorMapper(error));
      }
    });
  }
  async update(_id: string, item: T): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
          const updatedVersion = await this._model.update({_id} , item);
          resolve(updatedVersion)
      } catch (error) {
        reject(MongoErrorMapper(error));
      }
    });
  }
  async delete(_id: string): Promise<boolean> {
    return new Promise(async(resolve, reject) => {
      try {
          const response = await this._model.deleteOne({_id});
          response.deletedCount === 1 ? resolve(true): resolve(false);
      } catch (error) {
        reject(MongoErrorMapper(error));
      }
    });
  }
  async find(filter: any): Promise<T[]> {
    return new Promise(async(resolve, reject) => {
      try {
        const documentList = await this._model.find(filter);
        resolve(documentList)
      } catch (error) {
        reject(MongoErrorMapper(error));
      }
    });
   
  }
  async findOne(_id: string): Promise<T> {
    return new Promise(async(resolve, reject) => {
      try {
          const document = await this._model.findOne({_id});
          resolve(document)
      } catch (error) {
        reject(MongoErrorMapper(error));
      }
    });
  }
}
