 /* 
  this interface follow generic repository pattern
  @refrence https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e
 */
export interface IRead<T> {
  /* 
    @param takes filter object
    @return list of <T>
  */
  find(filter: T): Promise<T[]>;
    /* 
    @param takes id 
    @return one or empty object of <T>
  */
  findOne(id: string): Promise<T>;
}
