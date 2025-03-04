import * as yup from "yup";

export const userRegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});
