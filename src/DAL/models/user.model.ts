import { Document, Model, model, Schema, Error } from 'mongoose';
import colors from 'colors';
import { langs } from '../../core/enums/lang.enum';
import { gender } from '../../core/enums/gender.enum';
import { accountStatus } from '../../core/enums/accountStatus.enum';
import { userRoles } from '../../core/enums/userRoles.enums';
// model interface
export interface IUser extends Document {
    fullname?: string, //
    fullname_lower?: string, // 
    username?: string, //
    username_lower?: string, //
    email?: string, // 
    email_lower?: string, //
    token?: string //
    password?:string, //
    isActive?:accountStatus, // is enum 
    address?:string, //
    governorate?:string, //
    phone?:string, //
    gender?:gender, // 
    lang?:string[],
    userRole?:string,
    wishList?:any
}
// model schema 
export const UserSchema: Schema<IUser> = new Schema<IUser>({
    fullname: { type: String,min:5, required: true, trim: true },
    password: { type: String, required: false, trim: true },
    email: { type: String,unique:true, required: true, trim: true },
    fullnameLower: { type: String, trim: true },
    email_lower: { type: String, trim: true },
    username: { type: String,unique:true, required: true, trim: true },
    username_lower: { type: String, unique:true, required: true, trim: true },
    token: { type: String, required: false, trim: true },
    address: { type: String,required:true, trim: true },
    governorate: { type: String, required:true, trim: true },
    phone: { type: String,unique:true,required:true, trim: true },
    gender: { type: gender, default:gender.male,required:true },
    userRole: { type: userRoles, default:userRoles.user },
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

    if (this.username && this.username.length > 0) {
        this.username_lower = this.username.trim().toLowerCase();
    }

    if (this.fullname && this.fullname.length > 0) {
        this.fullname_lower = this.fullname.trim().toLowerCase();
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