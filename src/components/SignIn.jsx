import * as yup from 'yup';
import BaseForm from './BaseForm';
import useSignIn from '../hooks/useSignIn';

export const SignInForm = ({ onSubmit, submitButtonText }) => {
  const fields = [
    { name: 'username', placeholder: 'Username' },
    { name: 'password', placeholder: 'Password', secureTextEntry: true }
  ];

  const validationSchema = yup.object().shape({
    username: yup.string().trim().required('Username is required'),
    password: yup.string().trim().required('Password is required')
  });

  return (
    <BaseForm
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitButtonText='Sign in'
    />
  );
};

const SignIn = ({ setSuccess, submitButtonText }) => {
  const [signIn] = useSignIn();

  return (
    <SignInForm
      submitButtonText={submitButtonText}
      onSubmit={async (values) => {
        await signIn(values);
        setSuccess('Signed in successfully');
      }}
    />
  );
};

export default SignIn;
