import { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import Button from './Button';
import Error from './Error';
import formStyles from '../utils/formStyles';
import FormInput from './FormInput';

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .test('non-empty-username', 'Username cannot be empty', (value) => {
      return value && value.trim().length > 0;
    }),
  password: yup
    .string()
    .test('non-empty-password', 'Password cannot be empty', (value) => {
      return value && value.trim().length > 0;
    })
});

export const SignInForm = ({ onSubmit, signInError, clearSignInError }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const getInputStyle = useCallback(
    (fieldName) => {
      const hasError = formik.touched[fieldName] && formik.errors[fieldName];
      return [formStyles.input, hasError && formStyles.errorInput];
    },
    [formik.touched, formik.errors]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (event.nativeEvent.key === 'Enter') {
        formik.handleSubmit();
      }
    },
    [formik.handleSubmit]
  );

  const handleInputChange = useCallback(
    (fieldName) => (text) => {
      if (signInError) {
        clearSignInError();
      }
      formik.handleChange(fieldName)(text);
    },
    [formik.handleChange, signInError, clearSignInError]
  );

  return (
    <View style={formStyles.container}>
      <FormInput
        field='username'
        form={formik}
        placeholder='Username'
        ariaLabel='Username'
        onKeyPress={handleKeyPress}
        onChangeText={handleInputChange('username')}
      />
      <FormInput
        field='password'
        form={formik}
        placeholder='Password'
        ariaLabel='Password'
        secureTextEntry
        onKeyPress={handleKeyPress}
        onChangeText={handleInputChange('password')}
      />
      {signInError && <Error error={signInError} />}
      <Button onPress={formik.handleSubmit}
        title='Sign in' />
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const [signInError, setSignInError] = useState(null);

  const clearSignInError = useCallback(() => {
    setSignInError(null);
  }, []);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { authenticate } = await signIn({ username, password });
      console.log('Access Token:', authenticate.accessToken);
      setSignInError(null);
    } catch (e) {
      setSignInError(e.message);
    }
  };

  return (
    <SignInForm
      onSubmit={onSubmit}
      signInError={signInError}
      clearSignInError={clearSignInError}
    />
  );
};

export default SignIn;
