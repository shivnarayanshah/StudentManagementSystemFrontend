import { FaGraduationCap } from "react-icons/fa6";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu.jsx";
import { Button } from "@material-tailwind/react";

const Header = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [search, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between px-4 items-center text-white h-[60px] w-full bg-[#2A6047] fixed top-0 left-0 right-0 z-1 ">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => {
          setSearchParams({});
          navigate("/");
        }}
      >
        <div className="flex items-center gap-4">
          <FaGraduationCap className="text-4xl " />
          <span className="text-2xl">MindRisers Academy</span>
        </div>
        <div className="">Student Management system</div>
      </div>
      <div>
        {user ? (
          <ProfileMenu />
        ) : (
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/register")}
              className=" border-2"
              style={{ background: "none" }}
            >
              Register
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className=" border-2"
              style={{ background: "none" }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
