import UserFormData from "./UseFormData";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <UserFormData
        title="Login Page"
        url="http://localhost:1000/api/user/login"
        buttonLabel="Login"
        onSuccessMessage="Login successful!"
        redirectOnSuccess="/api/events"
      />
      <Link to="/user/create" className="mt-8 text-blue-500">
        Create User
      </Link>
    </>
  );
};

export default Login;
