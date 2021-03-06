import joi from "joi";

const updateUserReqSchema = joi.object({
  _id: joi.string().required(),
  fullname: joi.string().min(3),
  password: joi.string().min(4),
  email: joi.string().min(5),
  username: joi.string().min(3),
  address: joi.string().min(3),
  governorate: joi.string().min(3),
  phone: joi.string().min(3),
  gender: joi.string(),
  lang: joi.string(),
});

export default updateUserReqSchema;
