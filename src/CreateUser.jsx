import UserFormData from './UseFormData';
import { Link } from 'react-router-dom';
import { ApiRoutes } from './common/AppRoutes';

const CreateUser = () => {
  return (
    <>
    <UserFormData
      title="Create User"
      url= {ApiRoutes.CREATE_USER}
      buttonLabel="Create"
      onSuccessMessage="User created successfully"
    />
      <Link to="/user/login" className='mt-8 text-blue-500'>Login</Link> 
      </>
  );
};

export default CreateUser;
