import winston from "winston";
import path from "path";
import { IContext } from "../../core/interfaces/general/context.interface";
import colors from "colors";
import * as fs from "fs";
const _writeToFile = async (data: any) => {
  const filename = path.join(__dirname, "log");
  try {
    if (fs.existsSync(filename)) {
      if (fs.statSync(filename).size > 8000) {
        fs.writeFileSync(filename, data);
      } else {
        fs.appendFileSync(filename, data);
      }
    } else {
      fs.writeFileSync(filename, data);
    }
  } catch (error) {}
};

const logger = {
  location: " ",
  info: function (context: IContext, action: any) {
    // const format = `{ \n ${colors.green(
    //   `[info] \n [session-id]: ${context.sessionId}  \n [timestamp]: ${
    //     context.timestampFormated
    //   } \n [location]: ${this.location} \n [details]: ${JSON.stringify(action)}`
    // )} \n}`;
    const data =  `{ \n ${
      `[info] \n [session-id]: ${context.sessionId|| ""}  \n [timestamp]: ${
        context.timestampFormated || ""
      } \n [location]: ${this.location || ""} \n [details]: ${JSON.stringify(action)}`
    } \n}\n`
    // console.log(format);
    _writeToFile(data)
  },
  error: function (context: IContext, action: any) {
    const format = `{ \n${colors.bgRed.white.bold(
      `[ERROR] \n[session-id]: ${context.sessionId}  \n[timestamp]: ${
        context.timestampFormated
      } \n[location]: ${this.location} \n[details]: ${JSON.stringify(action)}`
    )} \n}`;
    const data =  `{ \n${
      `[info] \n[session-id]: ${context.sessionId}  \n[timestamp]: ${
        context.timestampFormated
      } \n[location]: ${this.location} \n[details]: ${JSON.stringify(action)}`
    } \n}\n`
    console.log(format);
    _writeToFile(data)
  },
  debug: function (context: IContext, action?: any) {
    const format = `{ \n${colors.blue.bold(
    `[debug] \n[session-id]: ${context.sessionId || ""}  \n[timestamp]: ${
        context.timestampFormated || ""
      } \n[location]: ${this.location || ""} \n[details]: ${JSON.stringify(action || "no details")}`
    )} \n}`;
    console.log(format);

  },
};

export default logger;
