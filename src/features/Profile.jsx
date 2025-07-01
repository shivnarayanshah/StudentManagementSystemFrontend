import { Button, Input, Typography } from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { Formik } from "formik";

import toast from "react-hot-toast";
import {
  useAddProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../api/profileApi.jsx";
import { useGetUserByIdQuery } from "../../api/userApi.jsx";
import { BASE_URL } from "../../api/mainApi.jsx";
import { useGetStudentByEmailQuery } from "../../api/studentApi.jsx";
const Profile = () => {
  const { user } = useSelector((state) => state.userSlice);
  const token = user?.token;
  const id = user?.id;

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetProfileQuery(token);

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserByIdQuery({ id, token }, { skip: !id });

  const [addProfile, { isLoading: addProfileLoading, error: addProfileError }] =
    useAddProfileMutation();

  const [
    updateProfile,
    { isLoading: updateProfileLoading, error: updateProfileError },
  ] = useUpdateProfileMutation();

  const {
    data: studentData,
    isLoading: studentLoading,
    error: studentError,
  } = useGetStudentByEmailQuery(
    { email: userData?.email, token },
    { skip: !id }
  );

  const addProfilepic = async (image) => {
    try {
      const res = await addProfile({ token, image });
      toast.success(res?.message || "Profile Added Successfully.");
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Problem While Adding Profile"
      );
    }
  };
  const updateProfilepic = async (image) => {
    try {
      const res = await updateProfile({ token, image });
      toast.success(res?.message || "Profile Updated Successfully.");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Problem While Updating Profile"
      );
    }
  };

  return (
    <div className="grid grid-cols-2 w-full mt-4 mb-4">
      <div className="flex flex-col justify-center items-center border-r-2 border-[#2A6047]">
        <Typography variant="h4">Profile</Typography>
        <div className="m-4">
          <img
            className="h-[200px] w-[200px] border-2 border-[#2A6047] rounded-[50%] object-center object-cover "
            src={`${BASE_URL}/images${profileData?.profile}`}
            alt="Profile Pic"
          />
        </div>
        <div>
          <Typography variant="h5" className="mb-2">
            UserName : {userData?.username}
          </Typography>
          <Typography variant="h5">Email : {userData?.email}</Typography>
        </div>
      </div>
      <div>
        {user?.role == "user" && studentData ? (
          <div className="text-center">
            <Typography variant="h5">
              You have enrolled : {studentData?.course} course
            </Typography>
            <Typography variant="h5">Age : {studentData?.age}</Typography>
          </div>
        ) : (
          <div> </div>
        )}
        <Formik
          initialValues={{ image: null }}
          onSubmit={async (val) => {
            if (!val.image) {
              toast.error("Please select an image.");
              return;
            }
            const formData = new FormData();
            formData.append("image", val.image);

            if (!profileData?.profile) {
              addProfilepic(formData);
            } else {
              updateProfilepic(formData);
            }
          }}
        >
          {({ setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center  ">
                <Typography variant="h4">Update Here</Typography>

                <div className=" flex flex-col m-4 gap-4">
                  <Input
                    name="image"
                    type="file"
                    label="Select Image here."
                    onChange={(e) =>
                      setFieldValue("image", e.currentTarget.files[0])
                    }
                  />

                  <Button type="submit" style={{ backgroundColor: "#2A6047" }}>
                    {profileData?.profile
                      ? "Update Profile Pic"
                      : "Add Profile Pic"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
