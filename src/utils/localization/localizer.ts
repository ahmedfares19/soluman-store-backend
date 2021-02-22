import { langs } from "../enums/lang.enum"

const ar = require('./ar')
const en = require('./en')
export function localize(lang:langs , text:string) {
    if(lang == langs.ar)
        return ar[text]
     else 
        return en[text]
}

export function concat(lang:langs,str1:string ,str2:string){
    str1 = localize(lang , str1);
    str2 = localize(lang , str2);
    return `${str2} ${str1}`

}