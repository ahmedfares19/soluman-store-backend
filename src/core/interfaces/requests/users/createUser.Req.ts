
import joi from "joi";


const createUserReqSchema = joi.object({
  fullname: joi.string().required().min(3),
  password:joi.string().required().min(4),
  email:joi.string().min(5).required(),
  username: joi.string().min(3).required(),
  address:joi.string().min(3).required(),
  governorate:joi.string().min(3).required(),
  phone:joi.string().min(3).required(),
  gender:joi.string(),
  lang:joi.string().required()
});

export default createUserReqSchema;
