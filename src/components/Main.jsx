import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './Repository/RepositoryList';
import AppBar from './AppBar/AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import SingleRepository from './Repository/SingleRepository';
import ReviewForm from './ReviewForm';
import Notify from './Notify';
import SignUp from './SignUp';
import ReviewList from './Repository/Reviews/ReviewList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundSecondary
  }
});

const Main = () => {
  const [successMessage, setSuccessMessage] = useState(null);

  const notifySuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <AppBar setSuccess={notifySuccess} />
      <Notify message={successMessage} />
      <Routes>
        <Route path='/signin'
          element={<SignIn setSuccess={notifySuccess} />} />
        <Route path='/'
          element={<RepositoryList />}
          exact />
        <Route path='/:id'
          element={<SingleRepository setSuccess={notifySuccess} />} />
        <Route
          path='/create-review'
          element={<ReviewForm setSuccess={notifySuccess} />}
        />
        <Route path='/my-reviews'
          element={<ReviewList />} />
        <Route path='/signup'
          element={<SignUp setSuccess={notifySuccess} />} />
        <Route path='*'
          element={<Navigate to='/'
            replace />} />
      </Routes>
    </View>
  );
};

export default Main;
