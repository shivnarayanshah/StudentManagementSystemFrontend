import { Button, Input, Typography } from "@material-tailwind/react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router";
import * as Yup from "yup";
import { useLoginUserMutation } from "../../api/userApi.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice.jsx";
import toast from "react-hot-toast";

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(30).required(),
});

const LoginPage = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-[450px] mx-auto mt-4 shadow-2xl p-4 rounded-2xl border-2 mb-4 border-[#2A6047]">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (val) => {
          try {
            const response = await loginUser(val).unwrap();
            dispatch(setUser(response));
            navigate("/");
            toast.success("login  Successful");
          } catch (err) {
            toast.error(
              err?.data?.message || err?.data || "Login Failed, Try Again Login"
            );
          }
        }}
      >
        {({ handleChange, handleSubmit, errors, touched, values }) => (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Typography
                variant="h3"
                className="text-center mb-8"
                style={{ color: "#2A6047" }}
              >
                Login here
              </Typography>
            </div>
            <div>
              <Input
                name="email"
                label="Email"
                onChange={handleChange}
                value={values.email}
                type="text"
                placeholder="Enter Email Here ..."
              />
              {errors.email && touched.email && (
                <p className="text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                name="password"
                label="Password "
                onChange={handleChange}
                value={values.password}
                type="password"
                placeholder="Enter Password Here..."
              />
              {errors.password && touched.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                loading={isLoading}
                className="bg-[#2A6047] cursor-pointer"
                type="submit"
              >
                Login
              </Button>
            </div>
            <div className="flex justify-center gap-4">
              <Typography>Don't have account ? </Typography>
              <Link className="text-[#2A6047]" to={"/register"}>
                <b>Register Here</b>
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
