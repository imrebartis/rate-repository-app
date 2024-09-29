import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import Text from './Text';

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
});

const initialValues = {
  username: '',
  password: ''
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        placeholder='Username'
        placeholderTextColor={theme.colors.secondary}
      />
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        placeholder='Password'
        placeholderTextColor={theme.colors.secondary}
        secureTextEntry
      />
      <Pressable style={styles.button}
        onPress={formik.handleSubmit}>
        <Text color='textWhite'
          fontWeight='bold'>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
