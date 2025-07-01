import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useAddStudentMutation } from "../../../api/studentApi.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const formValidation = Yup.object({
  name: Yup.string().min(4).required(),
  email: Yup.string().min(8).required(),
  age: Yup.number().min(1).required(),
  course: Yup.string().min(1).required(),
});

const AddStudent = () => {
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;
  const [addstudent, { isloading }] = useAddStudentMutation();

  const navigate = useNavigate();
  return (
    <div className="p-4 lg:w-[650px] sm:w-[450px]  mx-auto mt-4 shadow-2xl  rounded-2xl border-2 mb-4 border-[#2A6047]">
      <Typography
        style={{
          color: "#2A6047",
        }}
        className="text-center mb-4 text-2xl font-bold"
      >
        Add New Student
      </Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          age: "",
          course: "",
        }}
        onSubmit={async (val) => {
          try {
            const res = await addstudent({ token, data: val }).unwrap();
            toast.success(res.message);
            navigate("/");
          } catch (error) {
            toast.error(
              error?.data?.message ||
                error?.data ||
                error?.message ||
                "Error while addiing student."
            );
          }
        }}
        validationSchema={formValidation}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          setFieldValue,
          touched,
        }) => (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name}
              label="Enter Name Here..."
              error={errors.name && touched.name}
            />
            {errors.name && touched.name && (
              <p className="text-red-600">{errors.name}</p>
            )}

            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              label="Enter Email Here..."
              error={errors.email && touched.email}
            />
            {errors.email && touched.email && (
              <p className="text-red-600">{errors.email}</p>
            )}
            <Input
              type="number"
              name="age"
              onChange={handleChange}
              value={values.age}
              label="Enter Age Here..."
              error={errors.age && touched.age}
            />
            {errors.age && touched.age && (
              <p className="text-red-600">{errors.age}</p>
            )}
            <Select
              name="course"
              label="Select Course"
              onChange={(e) => setFieldValue("course", e)}
              error={errors.course && touched.course}
            >
              <Option value="mernstack">MERN Stack</Option>
              <Option value="java">Java</Option>
              <Option value="php">PHP </Option>
              <Option value="python">Python</Option>
              <Option value="django">Django</Option>
            </Select>
            {errors.course && touched.course && (
              <p className="text-red-600">{errors.course}</p>
            )}

            <div className="flex justify-end">
              <Button
                style={{ backgroundColor: "#2A6047" }}
                type="submit"
                loading={isloading}
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddStudent;
