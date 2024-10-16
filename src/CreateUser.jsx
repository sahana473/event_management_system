import UserFormData from './UseFormData';
import { Link } from 'react-router-dom';

const CreateUser = () => {
  return (
    <>
    <UserFormData
      title="Create User"
      url="http://localhost:1000/api/user/create"
      buttonLabel="Create"
      onSuccessMessage="User created successfully"
    />
      <Link to="/user/login" className='mt-8 text-blue-500'>Login</Link> 
      </>
  );
};

export default CreateUser;
