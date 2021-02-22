import { plainToClass } from "class-transformer";
import { checkEncryptedPassword, encryptPassword } from "../utils/helpers/password.helper";
import { generateAuthToken, getAuthTokenPayload } from "../utils/helpers/tokens.helper";
import { IHeader } from "../utils/interfaces/requests/baseResquestHandler/baseRequestHeader.req";
import { CreateUserReq } from "../utils/interfaces/requests/createUser.Req";
import { login } from "../utils/interfaces/requests/loginAsUser.Req";
import { localize } from "../utils/localization/localizer";
import User, { IUser } from "./models/user.model";

export class UserDAL {


    public createUser = async (userModel: CreateUserReq, metaData: IHeader): Promise<IUser> => {
        return new Promise(async (resolve, reject) => {
            try {

                const isEmailExists = await this.isMailExits(userModel.email);
                const isPhoneExists = await this.isPhoneExists(userModel.phone);
                const isUserNameExists = await this.isUserNameExists(userModel.userName);
                const existedData = isEmailExists || isUserNameExists || isPhoneExists;
                if (existedData) {
                    throw {
                        isEmailExists,
                        isPhoneExists,
                        isUserNameExists
                    }
                } else {
                    const newUserModel = new User()
                    const filledUserModel = Object.assign(newUserModel, userModel);
                    filledUserModel.accessToken = generateAuthToken(filledUserModel.id);
                    filledUserModel.password = await encryptPassword(filledUserModel.password);
                    const savedData = await filledUserModel.save();
                    if (savedData)
                        resolve(savedData)
                    else
                        throw new Error(localize(metaData.lang, "DATABASE_ERROR"))
                }

            } catch (error) {
                reject(error)
            }
        })
    }

    public isMailExits = async (email: string): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const isExist = await User.findOne({ email })
                isExist ? resolve(true) : resolve(false)
            } catch (error) {
                reject(error)
            }
        });
    }
    public isPhoneExists = async (phone: string): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const isExist = await User.findOne({ phone })
                isExist ? resolve(true) : resolve(false)
            } catch (error) {
                reject(error)
            }
        });
    }
    public isUserNameExists = async (userName: string): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const isExist = await User.findOne({ userName })
                isExist ? resolve(true) : resolve(false)
            } catch (error) {
                reject(error)
            }
        });
    }
    public getUserDataByToken = async (accessToken: string, metaData: IHeader): Promise<IUser | boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const _id = getAuthTokenPayload(accessToken).id;
                const isExist = await User.findOne({ _id, accessToken });
                if (isExist)
                    resolve(isExist)
                else
                    resolve(false)
            } catch (error) {
                reject(error)
            }
        });
    }   
    public login = async (loginModel:login, metaData: IHeader):Promise<IUser> => {
        return new Promise(async(resolve, reject) => {
            try {
                var user;
                if(loginModel.userName)
                    user = await User.findOne({userName:loginModel.userName})
                if(loginModel.phone)
                    user = await User.findOne({phone:loginModel.phone})
                
                if(user){
                    var isCorrectPassword =await checkEncryptedPassword(loginModel.password,user.password)
                    user.accessToken = generateAuthToken(user._id)
                    await user.save()
                    if(isCorrectPassword)
                        resolve(user)
                    else 
                        reject()
                }
            } catch (error) {
                reject(error)
            }
        });
    }
    public logout = async (metaData: IHeader):Promise<any> => {
        return new Promise(async(resolve, reject) => {
            try {
                const payload = getAuthTokenPayload(metaData.accesstoken || '');
                const usr:IUser = await User.findOne({_id:payload.id});
                if(usr){
                    usr.accessToken = ''
                    let deleted = await usr.save();
                    resolve(deleted)
                } else 
                    reject()
            } catch (error) {
                reject(error) 
            }
        });
    }
    public changePassword = async():Promise<any> => {
        return new Promise(async(resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        });
    }
    public updateUserData = async():Promise<any> => {
        return new Promise(async(resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        });
    }
    
}