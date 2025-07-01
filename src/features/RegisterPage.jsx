import { Button, Input, Typography } from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../api/userApi.jsx";

const registerSchema = Yup.object({
  username: Yup.string().min(4).max(30).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(40).required(),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  return (
    <div className="w-[450px] mx-auto mt-4 shadow-2xl p-4 rounded-2xl border-2 mb-4 border-[#2A6047]">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (val) => {
          try {
            await registerUser(val).unwrap();
            navigate("/");
            toast.success("User Registered Successfully.");
          } catch (err) {
            toast.error(
              err?.data?.message ||
                err?.data ||
                "Register failed please try again."
            );
          }
        }}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Typography
                variant="h3"
                className="text-center mb-8"
                style={{ color: "#2A6047" }}
              >
                Register here
              </Typography>
            </div>
            <div>
              <Input
                name="username"
                label="UserName"
                onChange={handleChange}
                value={values.username}
                type="text"
                placeholder="Enter Username Here ..."
              />
              {errors.username && touched.username && (
                <p className="text-red-600">{errors.username}</p>
              )}
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
                Register
              </Button>
            </div>
            <div className="flex justify-center gap-4">
              <Typography>Already have an account ? </Typography>
              <Link className="text-[#2A6047]" onClick={() => navigate(-1)}>
                <b>Login Here</b>
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
