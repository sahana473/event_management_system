import UserFormData from "./UseFormData";

const Login = () => {
  return (
    <UserFormData
      title="Login Page"
      url="http://localhost:1000/api/user/login"
      buttonLabel="Login"
      onSuccessMessage="Login successful!"
      redirectOnSuccess="/api/events"
    />
  );
};

export default Login;
