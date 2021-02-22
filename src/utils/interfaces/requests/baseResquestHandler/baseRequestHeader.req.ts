import { langs } from "../../../enums/lang.enum";

export interface IHeader{
    lang:langs,
    accesstoken?:string,
    take?:number,
    skip?:number,
}
export class Header implements IHeader{
    lang:langs;
    take?:number;
    skip?:number;
    accesstoken?:string
}
