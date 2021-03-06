import { json } from "body-parser";
import { plainToClass } from "class-transformer";
import { IsDefined, IsInt, IsOptional, validate } from "class-validator";
import express, { Application, Router } from "express";
import { stat } from "fs";
import UserController from "./controllers/users.controller";
import User from "./DAL/models/user.model";
import { UserDAL } from "./DAL/user.DAL";
import UserRoute from "./routes/users.route";
import { langs } from "./core/enums/lang.enum";
import { statusCodes } from "./core/enums/statuscodes.enum";
import { localize } from "./utils/localization/localizer";


export class Starter {
    userRoute:UserRoute;
    userController:UserController;
    userDAL:UserDAL;
    constructor(public globalApp: Application, public globalRouter: Router) {
        // start dependency injection 
        this.startDI();
    }

    public startDI = () => {
        // user flow
        this.userDAL = new UserDAL();
        this.userController = new UserController(this.userDAL);
        this.userRoute = new UserRoute(this.userController,this.globalRouter);
    }



}