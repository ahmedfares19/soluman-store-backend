/* 
* this is the project start up file
*/
import bodyParser from "body-parser";
import colors from 'colors';
const kill = require('kill-port')
import helmet from 'helmet';
import express, { Application, Request, Response, Router } from "express";
import { Starter } from "./backend.starter";
import env from "./utils/settings/env";
import connectToDB from "./utils/settings/database.connection";
import { statusCodes } from "./utils/enums/statuscodes.enum";
import { authUser, requestHandler } from "./utils/interfaces/requests/baseResquestHandler/request_middleware";
const globalApp: Application = express();
const globalRouter: Router = express.Router();
// parse application/x-www-form-urlencoded
globalApp.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
globalApp.use(bodyParser.json())
globalApp.use(requestHandler)
globalApp.use(helmet());
globalApp.use('/api', globalRouter)
globalApp.use("*", (req,res) => {
    res.status(statusCodes.not_found).send("404")
})

//connect database
connectToDB().then((res) => {
    console.log(colors.bgBlack.blue(res));
    new Starter(globalApp, globalRouter);
    //kill port before start server
    kill(env.PORT).then(()=>{
        globalApp.listen(env.PORT, () => {
            console.log(colors.bgBlack.blue(">>>>> server is up at http://localhost:8080 "));
        })
    })
   
}).catch((err) => {
    console.log(colors.red(err))
})
//start backend
