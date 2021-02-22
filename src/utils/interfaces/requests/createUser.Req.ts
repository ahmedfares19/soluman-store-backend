import { IsDefined, IsEmail, IsEnum, IsNotEmpty, length, MaxLength, MinLength, minLength, MIN_LENGTH } from "class-validator";
import { gender } from "../../enums/gender.enum";
import { langs } from "../../enums/lang.enum";
import { userRoles } from "../../enums/userRoles.enums";
import { validatable } from "../../helpers/validator";


export class CreateUserReq extends validatable {

    /* 
    fullName
    email
    password
    userName
    address
    governorate
    phone
    gender
     */

    @IsDefined({ message: 'MISSINGDATA' })
    @MaxLength(50)
    @MinLength(5)
    @IsNotEmpty({ message: 'MISSINGDATA' })
    public fullName: string;

    @IsDefined({ message: 'MISSINGDATA' })
    @IsEmail(undefined, { message: 'MISSINGDATA' })
    @IsNotEmpty({ message: 'MISSINGDATA' })
    public email: string;

    @IsDefined({ message: 'MISSINGDATA' })
    @MinLength(8, { message: 'SHORT' })
    @MaxLength(50, { message: 'LONG' })
    @IsNotEmpty({ message: 'MISSINGDATA' })
    public password: string;

    @IsDefined({ message: 'MISSINGDATA' })
    @MinLength(5, { message: 'SHORT' })
    @MaxLength(25, { message: 'LONG' })
    @IsNotEmpty({ message: 'MISSINGDATA' })
    public userName: string;

    @IsDefined({ message: 'MISSINGDATA' })
    @MinLength(5, { message: 'SHORT' })
    @MaxLength(50, { message: 'LONG' })
    @IsNotEmpty({ message: 'MISSINGDATA' })
    public address: string;

    @IsDefined({ message: 'MISSINGDATA' })
    @IsNotEmpty({ message: 'MISSINGDATA' })
    public governorate: string;

    @IsDefined({ message: 'MISSINGDATA' })
    @IsNotEmpty({ message: 'MISSINGDATA' })
    public phone: string;

    @IsEnum(gender, { message: 'MISSINGDATA' })
    public gender: gender;
}