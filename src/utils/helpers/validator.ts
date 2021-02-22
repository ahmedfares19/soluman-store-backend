import { validate, ValidationError } from "class-validator";

export class validatable {
    async isValid() {
        const result = await validate(this)
        if (result.length == 0)
            return true;
        else
            return false;
    }

    async getMessage():Promise<IErrorPart> {
        return new Promise(async(resovle, reject) => {
            const err = await validate(this)
            const cons = err[0].constraints || {}
            const consList = Object.keys(cons);
            const p = err[0].property
            let data: IErrorPart = {
                constraint:consList[0],
                propertyName:p
            };
            resovle(data)
        })
    }
}

interface IErrorPart {
    propertyName?: string,
    constraint?: string,
}