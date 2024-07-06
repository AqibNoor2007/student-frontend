import { useNavigate } from "react-router-dom";
import useUser from "./useUser";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  return (
    <nav className=" navbar-light navbar bg-light py-4" role="navigation">
      <div className="container flex justify-between">
        <a className="navbar-brand">
          <img width="80" src="/smit.png" alt="" />
        </a>
        <div className="flex items-center">
          <img
            width={50}
            className="profile-picture"
            src="https://res.cloudinary.com/saylani-welfare/image/upload/v1664530365/SMIT/Students/3710283902680.jpg"
            alt=""
          />
          <span className="mx-2">Aqib Noor</span>
          <button
            className="bg-blue-500 py-2 px-3"
            style={{ borderRadius: "10px" }}
            role="button"
            onClick={() => {
              navigate("/");
              localStorage.removeItem("uid");
              setUser(null);
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
