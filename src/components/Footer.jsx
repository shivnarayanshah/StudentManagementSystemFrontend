import { Typography } from "@material-tailwind/react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-[#2A6047]  text-white  p-4">
      <div className="grid grid-cols-4 ">
        <div className="flex flex-col  items-start mx-auto ">
          <Typography>About Us</Typography>
          <Typography>Future And Current Students</Typography>
          <Typography>Academic Program </Typography>
          <Typography>Research</Typography>
        </div>
        <div className="flex flex-col  items-start mx-auto">
          <Typography>Library </Typography>
          <Typography>Recreation</Typography>
          <Typography>Versity Sports</Typography>
          <Typography>Alumini And Friends </Typography>
        </div>
        <div className="flex flex-col  items-start mx-auto">
          <Typography>Resources for current student</Typography>
          <Typography>Resources for faculty and staff</Typography>
          <Typography>BookStore</Typography>
          <Typography>Campus map</Typography>
        </div>
        <div className="grid grid-cols-4 items-center w-[px] justify-center">
          <div className="flex items-center justify-center">
            <FaTwitter />
          </div>

          <div className="flex items-center justify-center">
            <FaFacebookF />
          </div>
          <div className="flex items-center justify-center">
            <FaInstagram />
          </div>
          <div className="flex items-center justify-center">
            <TfiYoutube />
          </div>

          <div className="flex items-center justify-center">
            <CiLinkedin />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        @copyright ShivNarayan MERN Developer
      </div>
    </div>
  );
};

export default Footer;
