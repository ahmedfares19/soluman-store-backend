import { IsDefined, IsNotEmpty } from "class-validator";
import { validatable } from "../../helpers/validator";

export class login extends validatable{
    @IsDefined({ message: 'MISSINGDATA' })
    @IsNotEmpty({ message: 'MISSINGDATA' })
    public password:string;
    public phone:string;
    public userName:string;
}