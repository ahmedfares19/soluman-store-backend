
import { plainToClass } from "class-transformer";
import  { Request, Response, Router } from "express";
import UserController from "../controllers/users.controller";
import { statusCodes } from "../core/enums/statuscodes.enum";
import { IContext } from "../core/interfaces/general/context.interface";
import { Header } from "../core/interfaces/requests/baseResquestHandler/baseRequestHeader.req";
import { buildResponse } from "../core/interfaces/requests/baseResquestHandler/baseResponse.interface";
import { authUser } from "../core/interfaces/requests/baseResquestHandler/request_middleware";
import { login } from "../core/interfaces/requests/loginAsUser.Req";
import createUserReqSchema from "../core/interfaces/requests/users/createUser.Req";
import loginReqSchema from "../core/interfaces/requests/users/long.req";
import updateUserReqSchema from "../core/interfaces/requests/users/updateUser.req";
import { generateAuthToken, getAuthTokenPayload } from "../utils/helpers/tokens.helper";
import { localize } from "../utils/localization/localizer";
import logger from "../utils/logs/logger";

export default class UserRoute {
    constructor(private userController: UserController, private appRouter: Router) {
        this.startRouting();
        logger.location = "user Router"
    }

    private startRouting = () => {
        this.appRouter.post('/create-user', this.createUser);
        this.appRouter.post('/login', this.login);
        this.appRouter.put('/update-user',authUser, this.updateUser)
    }
    private createUser = async (req: Request, res: Response) => {
        try {
            const context = req['context'] as IContext;
            const userData = req.body;
            const validStatus = createUserReqSchema.validate(userData);
            if(!validStatus.error){
                const response = await this.userController.createUser(userData ,context);
                res.status(response.statusCode).json(response.body);
            } else {
                res.status(statusCodes.bad_reqest).send(validStatus.error.details[0].message)
                // logger.info(context,validStatus.error.details[0].message)
            }
        } catch (error) {
            res.status(statusCodes.internal_server_error).json(error)     
        }
    }
    private login = async (req: Request, res: Response) => {
        try {
          const context = req['context'] as IContext;
          const loginData = req.body;
          const validStatus = loginReqSchema.validate(loginData);
          if(!validStatus.error){
              if(loginData.username || loginData.phone || loginData.email){
                const response = await this.userController.loginAsUser(loginData ,context);
                res.status(response.statusCode).json(response.body);
              } else {
                res.status(statusCodes.bad_reqest).send(localize("Missing_Data",context.lang))
              }
          } else {
            res.status(statusCodes.bad_reqest).send(validStatus.error.details[0].message)
          }
        } catch (error) {
         res.status(statusCodes.internal_server_error).json(error)     
        }
    }
    private logout = async (req: Request, res: Response) => {
        try {
            const result = await this.userController.logout(res.locals.metadata)
            // res.status(result.statusCode).json(result)
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    private changePassword = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    private updateUser = async (req: Request, res: Response) => {
        try {
            const context = req['context'] as IContext;
            const userNewData = req.body;
            const validStatus = updateUserReqSchema.validate(userNewData);
            if(!validStatus.error){
                const response = await this.userController.updateUser(userNewData ,context);
                res.status(response.statusCode).json(response.body);
            } else {
                res.status(statusCodes.bad_reqest).send(validStatus.error.details[0].message)
            }
        } catch (error) {
            res.status(statusCodes.internal_server_error).json(error)     
        }
    }
}