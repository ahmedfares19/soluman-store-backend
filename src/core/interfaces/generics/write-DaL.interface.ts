 /* 
  this interface follow generic repository pattern
  @refrence https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e
 */
export interface IWrite<T> {
    /* 
    @param takes object of <T>
  */
  create(item: T): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
  delete(id:string):Promise<boolean>
}
