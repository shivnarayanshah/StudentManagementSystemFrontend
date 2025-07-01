import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "../../../api/studentApi.jsx";
import toast from "react-hot-toast";

const formValidation = Yup.object({
  name: Yup.string().min(4).required(),
  email: Yup.string().min(8).required(),
  age: Yup.number().min(1).required(),
  course: Yup.string().min(1).required(),
});

const UpdateStudent = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;
  const navigate = useNavigate();

  const { isLoading, error, data } = useGetSingleStudentQuery({
    id,
    token,
  });

  const [updateStudent, { isLoading: loading }] = useUpdateStudentMutation();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return (
      <p className="text-center">Error loading product: {error.message}</p>
    );
  if (!data) return <p className="text-center">No product data found</p>;

  return (
    <div className="p-4 lg:w-[650px] sm:w-[450px]  mx-auto border-[#2A6047] shadow-2xl mt-4 rounded-2xl border-2 mb-4 ">
      <Typography
        style={{
          color: "#2A6047",
        }}
        className="text-center mb-4 text-2xl font-bold"
      >
        Update Student
      </Typography>
      <Formik
        initialValues={{
          name: data.name,
          email: data.email,
          age: data.age,
          course: data.course,
        }}
        onSubmit={async (val) => {
          const formData = new FormData();
          formData.append("name", val.name);
          formData.append("email", val.email);
          formData.append("age", val.age);
          formData.append("course", val.course);
          try {
            const res = await updateStudent({
              token,
              id,
              data: formData,
            }).unwrap();

            toast.success(res.message);
            navigate("/");
          } catch (error) {
            toast.error(
              error?.data?.message ||
                error?.data ||
                "Error while updating data."
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
              name="email"
              onChange={handleChange}
              value={values.email}
              label="Enter Email Here..."
              error={errors.email && touched.email}
            />
            <Input
              name="age"
              onChange={handleChange}
              value={values.age}
              label="Enter Age Here..."
              error={errors.age && touched.age}
            />
            <Select
              value={values.course}
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

            <div className="flex justify-end">
              <Button
                style={{ backgroundColor: "#2A6047" }}
                type="submit"
                loading={isLoading}
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateStudent;
