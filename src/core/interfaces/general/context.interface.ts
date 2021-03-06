import { langs } from "../../enums/lang.enum";

export interface IContext {
  id?: string;
  token?: string;
  lang?: langs,
  sessionId?: string,
  timestampFormated?: string,
  timestamp?: Date,
}