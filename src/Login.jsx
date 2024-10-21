import UserFormData from "./UseFormData";
import { Link } from "react-router-dom";
import { ApiRoutes } from './common/AppRoutes';

const Login = () => {
  return (
    <>
      <UserFormData
        title="Login Page"
        url={ApiRoutes.LOGIN_USER}
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
