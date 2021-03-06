import { langs } from '../../core/enums/lang.enum';
import { IContext } from '../../core/interfaces/general/context.interface';
import { localize } from '../localization/localizer';
var httpContext = require('express-http-context');

export interface IDal_Error {
  message?: string,
  code?: number
}
export class MongoError extends Error implements IDal_Error {
  public message;
  private alreadyExistErrorCode = 11000;
  public lang:langs;
  constructor(err) {
    super("");
    this.map(err.code);
    this.lang = httpContext.get('lang');
  }
  map = (errorCode) => {
    if (errorCode === this.alreadyExistErrorCode) 
      this.message = localize( "Email_Alreadt_Exists",this.lang ,)
    else 
      this.message = localize( "Something_Went_Wrong",this.lang )
  }
}

export function MongoErrorMapper(err) {
  return new MongoError(err);
}
