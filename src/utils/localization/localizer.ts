import { langs } from "../../core/enums/lang.enum"

const ar = require('./ar')
const en = require('./en')
export function localize(text:string ,lang?:langs ) {
    if(lang == langs.ar)
        return ar[text]
     else 
        return en[text]
}
