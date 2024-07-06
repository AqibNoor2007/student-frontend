import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import useUser from "./useUser";

const Dashboard = () => {
  const { user } = useUser();
  console.log(user, "user");
  const navigate = useNavigate();

  function isCourseCompleted(startTime, duration) {
    // Parse the start date
    const startDate = new Date(startTime);

    // Calculate the end date based on the duration
    let endDate = new Date(startDate);
    if (duration.includes("Year")) {
      const years = parseInt(duration.split(" ")[0], 10);
      endDate.setFullYear(startDate.getFullYear() + years);
    } else if (duration.includes("Month")) {
      const months = parseInt(duration.split(" ")[0], 10);
      endDate.setMonth(startDate.getMonth() + months);
    }

    // Get the current date
    const currentDate = new Date();

    // Check if the current date is after the end date
    return currentDate > endDate;
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="py-6">
          <h1>Welcome {user?.firstName + " " + user?.lastName} 👋</h1>
          <span>
            Welcome to the SMIT student portal. You can find all your courses
            listed below
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.courses?.map((course) => (
            <div
              onClick={() =>
                navigate(`/course/${course.courseId._id}`, { state: course })
              }
              className="bg-white p-4 rounded shadow hover:bg-blue-200"
              key={course._id}
            >
              <p
                className="pb-4 text-lg cursor-pointer"
                style={{ fontWeight: "500" }}
              >
                {course.courseId.name}
              </p>
              <p className="pb-4">
                In publishing and graphic design, Lorem ipsum is a placeholder
                may
              </p>

              {isCourseCompleted(course.startTime, course.courseId.duration) ? (
                <p
                  className="py-1 px-2 bg-green-300 w-fit"
                  style={{ borderRadius: "5px" }}
                >
                  Completed
                </p>
              ) : (
                <p
                  className="py-1 px-2 bg-red-300 w-fit"
                  style={{ borderRadius: "5px" }}
                >
                  Continue
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
