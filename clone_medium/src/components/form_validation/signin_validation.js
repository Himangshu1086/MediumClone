import * as Yup from "yup";

export const signInSchema = Yup.object({
  
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().max(30).required("Please enter your password"),
});