import { plainToClass } from "class-transformer";
import e, { Request, Response, Router } from "express";
import UserController from "../controllers/users.controller";
import { statusCodes } from "../utils/enums/statuscodes.enum";
import { Header } from "../utils/interfaces/requests/baseResquestHandler/baseRequestHeader.req";
import { buildResponse } from "../utils/interfaces/requests/baseResquestHandler/baseResponse.interface";
import { authUser } from "../utils/interfaces/requests/baseResquestHandler/request_middleware";
import { CreateUserReq } from "../utils/interfaces/requests/createUser.Req";
import { login } from "../utils/interfaces/requests/loginAsUser.Req";
import { concat, localize } from "../utils/localization/localizer";

export default class UserRoute {
    constructor(private userController: UserController, private appRouter: Router) {
        this.startRouting();
    }

    private startRouting = () => {
        this.appRouter.post('/create-user', this.createUser);
        this.appRouter.get('/get-user-account', this.getUserDataByToken);
        this.appRouter.post('/login', this.login);
        this.appRouter.post('/logout', authUser, this.logout)
        this.appRouter.post('/change-password', authUser, this.changePassword)
        this.appRouter.post('/update-user-data', authUser, this.updateUserData)
    }
    private createUser = async (req: Request, res: Response) => {
        try {

            const reqBody = plainToClass(CreateUserReq, req.body);
            if (await reqBody.isValid()) {
                const resBody = await this.userController.createUser(reqBody, res.locals.metadata);
                res.status(resBody.statusCode).json(resBody)
            } else {
                const failedConstrains = await reqBody.getMessage();
                console.log(failedConstrains);
                const msg = concat(res.locals.metadata.lang, failedConstrains.constraint || '', failedConstrains.propertyName || '')
                res.status(statusCodes.bad_reqest).json(buildResponse(
                    statusCodes.bad_reqest,
                    false,
                    msg
                ))
            }
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    private getUserDataByToken = async (req: Request, res: Response) => {
        try {
            const token = (req.query.tkn as any);
            if (token) {
                const resBody = await this.userController.getUserDataByToken(token, res.locals.metadata)
                res.status(statusCodes.found).json(resBody)
            } else {
                res.status(statusCodes.bad_reqest).json(buildResponse(
                    statusCodes.bad_reqest,
                    false
                ))
            }
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    private login = async (req: Request, res: Response) => {
        try {
            const reqBody = plainToClass(login, req.body);
            if (await reqBody.isValid() && (reqBody.phone||reqBody.userName)) {
                let result = await this.userController.loginAsUser(reqBody,res.locals.metadata )
                res.status(result.statusCode).json(result)
            } else {
                res.status(statusCodes.bad_reqest).json(buildResponse(
                    statusCodes.bad_reqest,
                    false
                ))
            }
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    private logout = async (req: Request, res: Response) => {
        try {
            const result = await this.userController.logout(res.locals.metadata)
            res.status(result.statusCode).json(result)
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
    private updateUserData = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
}