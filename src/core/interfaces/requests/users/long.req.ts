
import joi from "joi";
const loginReqSchema = joi.object({
  password:joi.string().required().min(4),
  email:joi.string().min(5),
  username: joi.string().min(3),
  phone:joi.string().min(3),
});
export default loginReqSchema;
