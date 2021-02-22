import { Document, Model, model, Schema, Error } from 'mongoose';
import colors from 'colors';
import { langs } from '../../utils/enums/lang.enum';
import { gender } from '../../utils/enums/gender.enum';
import { accountStatus } from '../../utils/enums/accountStatus.enum';
import { userRoles } from '../../utils/enums/userRoles.enums';
// model interface
export interface IUser extends Document {
    fullName?: string, //
    fullName_lower?: string, // 
    userName?: string, //
    userName_lower?: string, //
    email?: string, // 
    email_lower?: string, //
    accessToken?: string //
    password:string, //
    isActive:accountStatus, // is enum 
    address:string, //
    governorate:string, //
    phone:string, //
    gender:gender, // 
    lang:langs
    userRole:userRoles,
    wishList:string[],
}
// model schema 
export const UserSchema: Schema<IUser> = new Schema<IUser>({
    fullName: { type: String,min:5, required: true, trim: true },
    password: { type: String, required: false, trim: true },
    email: { type: String,unique:true, required: true, trim: true },
    fullNameLower: { type: String, trim: true },
    email_lower: { type: String, trim: true },
    userName: { type: String,unique:true, required: true, trim: true },
    userName_lower: { type: String, unique:true, required: true, trim: true },
    accessToken: { type: String, required: false, trim: true },
    address: { type: String,required:true, trim: true },
    governorate: { type: String, required:true, trim: true },
    phone: { type: String,unique:true,required:true, trim: true },
    gender: { type: gender, default:gender.male,required:true },
    userRole: { type: userRoles, default:userRoles.user,required:true },
    isActive: { type: accountStatus, default:accountStatus.notActive,required:true },
    lang: { type: langs,default:langs.ar },
    wishList:[{ type: String, trim: true }],
},{
    collection:'user',
    timestamps:{ createdAt: 'createdAt', updatedAt: 'updatedAt'},
})

// pre actions
UserSchema.pre('validate', async function (this: IUser, next) {
    if (this.email && this.email.length > 0) {
        this.email_lower = this.email.trim().toLowerCase();
    }

    if (this.userName && this.userName.length > 0) {
        this.userName_lower = this.userName.trim().toLowerCase();
    }

    if (this.fullName && this.fullName.length > 0) {
        this.fullName_lower = this.fullName.trim().toLowerCase();
    }
    const validationError = await this.validateSync();
    if (validationError) {
        next(validationError);
    } else {
        next();
    }
})

// model
const User: Model<IUser> = model<IUser>('User', UserSchema)
export default User;