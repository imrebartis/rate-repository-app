import { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from './Button';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';
import formStyles from '../utils/formStyles';
import FormInput from './FormInput';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Owner name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string()
});

const ReviewForm = ({ setSuccess }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      await createReview({ repositoryName, ownerName, rating, text });
      setError(null);
      setSuccess('Review created successfully');
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const handleInputChange = useCallback(
    (fieldName) => (text) => {
      if (error) {
        setError(null);
      }
      formik.handleChange(fieldName)(text);
    },
    [formik.handleChange, error]
  );

  return (
    <ScrollView
      style={formStyles.scrollContainer}
      contentContainerStyle={formStyles.container}
    >
      <FormInput
        field='repositoryName'
        form={formik}
        placeholder='Repository name'
        onChangeText={handleInputChange('repositoryName')}
      />

      <FormInput
        field='ownerName'
        form={formik}
        placeholder='Owner name'
        onChangeText={handleInputChange('ownerName')}
      />

      <FormInput
        field='rating'
        form={formik}
        placeholder='Rating'
        inputMode='numeric'
        onChangeText={handleInputChange('rating')}
      />

      <FormInput
        field='text'
        form={formik}
        placeholder='Review'
        multiline
        onChangeText={handleInputChange('text')}
      />

      <View style={formStyles.buttonContainer}>
        <Button onPress={formik.handleSubmit}
          title='Create a review' />
      </View>
    </ScrollView>
  );
};

export default ReviewForm;
