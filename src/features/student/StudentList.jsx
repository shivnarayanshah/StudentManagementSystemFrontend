import { Card, Typography } from "@material-tailwind/react";

import EditComponent from "../../components/admin/EditComponent.jsx";
import DeleteStudent from "./DeleteStudent.jsx";
import { useGetAllStudentsQuery } from "../../../api/studentApi.jsx";
import { useSelector } from "react-redux";

export const students = [
  {
    id: 1,
    name: "Shiv Narayan Sah",
    email: "shivnarayan21072@gmail.com",
    age: 21,
    course: ["php", "django", "MernStack", "web design"],
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Anjali Kumari",
    email: "anjali.kumari22@example.com",
    age: 20,
    course: ["react", "node.js", "express", "css"],
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    email: "ravi.kumar98@example.com",
    age: 22,
    course: ["php", "laravel", "html", "javascript"],
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    age: 23,
    course: ["django", "python", "web design"],
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Amit Patel",
    email: "amit.patel99@example.com",
    age: 24,
    course: ["MernStack", "javascript", "bootstrap"],
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Sneha Rani",
    email: "sneha.rani@example.com",
    age: 21,
    course: ["html", "css", "django", "react"],
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "Rajeev Mehta",
    email: "rajeev.mehta@example.com",
    age: 22,
    course: ["node.js", "express", "mongodb"],
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Pooja Verma",
    email: "pooja.verma@example.com",
    age: 20,
    course: ["php", "javascript", "bootstrap"],
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "Sunil Das",
    email: "sunil.das@example.com",
    age: 25,
    course: ["django", "rest api", "web design"],
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    name: "Kavita Sinha",
    email: "kavita.sinha@example.com",
    age: 23,
    course: ["MernStack", "css", "html", "javascript"],
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: 11,
    name: "Nikhil Jain",
    email: "nikhil.jain@example.com",
    age: 22,
    course: ["php", "web design", "javascript"],
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 12,
    name: "Divya Bharti",
    email: "divya.bharti@example.com",
    age: 24,
    course: ["django", "html", "css", "react"],
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 13,
    name: "Rohan Gupta",
    email: "rohan.gupta@example.com",
    age: 21,
    course: ["MernStack", "node.js", "express"],
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 14,
    name: "Neha Kumari",
    email: "neha.kumari@example.com",
    age: 20,
    course: ["php", "laravel", "bootstrap"],
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    id: 15,
    name: "Abhishek Singh",
    email: "abhishek.singh@example.com",
    age: 23,
    course: ["django", "python", "web design"],
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: 16,
    name: "Simran Kaur",
    email: "simran.kaur@example.com",
    age: 22,
    course: ["react", "node.js", "css"],
    image: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    id: 17,
    name: "Manish Tiwari",
    email: "manish.tiwari@example.com",
    age: 25,
    course: ["php", "javascript", "html"],
    image: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    id: 18,
    name: "Preeti Choudhary",
    email: "preeti.choudhary@example.com",
    age: 21,
    course: ["MernStack", "express", "mongodb"],
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    id: 19,
    name: "Alok Yadav",
    email: "alok.yadav@example.com",
    age: 22,
    course: ["django", "python", "api"],
    image: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    id: 20,
    name: "Sakshi Mishra",
    email: "sakshi.mishra@example.com",
    age: 20,
    course: ["web design", "html", "css", "bootstrap"],
    image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
];
const TABLE_HEAD = [, "SN", "Name", "Email", "Age", "Courses", "Action"];

const StudentList = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { isLoading, error, data } = useGetAllStudentsQuery(user.token);

  if (isLoading) return <h1 className="text-center">Loading.......</h1>;
  if (error) return <h1 className="text-center">{error} </h1>;
  if (!data) return <h1 className="text-center">No Data ..</h1>;

  return (
    <Card className="h-full w-full overflow-scroll p-4">
      <table className="w-full min-w-max table-auto text-left ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="  border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(({ _id, name, email, age, course }, index) => {
            const isLast = index === data?.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {age}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {course}
                  </Typography>
                </td>
                <td className={(classes, "  flex gap-4 mt-4 mb-4")}>
                  <EditComponent id={_id} />
                  <DeleteStudent id={_id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default StudentList;
