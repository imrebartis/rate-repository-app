import BaseForm from './BaseForm';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';

const SignUp = ({ setSuccess }) => {
  const [signUp] = useSignUp();

  const fields = [
    { name: 'username', placeholder: 'Username' },
    { name: 'password', placeholder: 'Password', secureTextEntry: true },
    {
      name: 'passwordConfirmation',
      placeholder: 'Password confirmation',
      secureTextEntry: true
    }
  ];

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('Username is required')
      .min(5, 'Username must be at least 5 characters')
      .max(30, 'Username cannot be more than 30 characters'),
    password: yup
      .string()
      .trim()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters')
      .max(50, 'Password cannot be more than 50 characters'),
    passwordConfirmation: yup
      .string()
      .trim()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Passwords must match')
  });

  return (
    <BaseForm
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await signUp(values);
      }}
      fields={fields}
      submitButtonText='Sign up'
      setSuccess={setSuccess}
      scrollable
    />
  );
};

export default SignUp;
