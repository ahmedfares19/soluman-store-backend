import { validatable } from "../../../helpers/validator";

export class Product extends validatable {
    public id?:string;
    public pNameAr:string;
    public pNameEn:string;
    public pCategoryId:string;
    public pPrice:string;
    public pColorIds:string[]
    public pDetails:string;
    public pHight:number;
    public pWidth:number;
    public pDepth:number;
}