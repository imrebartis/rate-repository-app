import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import Button from './Button';
import Error from './Error';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    height: '25%',
    padding: 16,
    backgroundColor: theme.colors.backgroundWhite
  },
  input: {
    height: 40,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center'
  },
  errorInput: {
    borderColor: theme.colors.tertiary
  }
});

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
      return [styles.input, hasError && styles.errorInput];
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
    <View style={styles.container}>
      <TextInput
        style={getInputStyle('username')}
        onChangeText={handleInputChange('username')}
        onBlur={formik.handleBlur('username')}
        value={formik.values.username}
        placeholder='Username'
        placeholderTextColor={theme.colors.secondary}
        onKeyPress={handleKeyPress}
        accessibilityLabel='Username'
      />
      {formik.touched.username && formik.errors.username && (
        <Text color='tertiary'>{formik.errors.username}</Text>
      )}
      <TextInput
        style={getInputStyle('password')}
        onChangeText={handleInputChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        placeholder='Password'
        placeholderTextColor={theme.colors.secondary}
        secureTextEntry
        onKeyPress={handleKeyPress}
        accessibilityLabel='Password'
      />
      {formik.touched.password && formik.errors.password && (
        <Text color='tertiary'>{formik.errors.password}</Text>
      )}
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
