import { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import Button from './Button';
import Error from './Error';
import formStyles from '../utils/formStyles';
import FormInput from './FormInput';

const BaseForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText = 'Submit',
  setSuccess,
  scrollable = false
}) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(values);
      if (setSuccess) {
        const successMessage =
          submitButtonText === 'Create a review'
            ? 'Review created successfully!'
            : `${submitButtonText} successful!`;
        setSuccess(successMessage);
      }
    } catch (e) {
      console.error('Form submission error:', e);
      setError(e.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
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

  const handleKeyPress = useCallback(
    (event) => {
      if (event.nativeEvent.key === 'Enter') {
        formik.handleSubmit();
      }
    },
    [formik.handleSubmit]
  );

  const formContent = (
    <>
      {fields.map(({ name, ...fieldProps }) => (
        <FormInput
          key={name}
          field={name}
          form={formik}
          onChangeText={handleInputChange(name)}
          onKeyPress={handleKeyPress}
          {...fieldProps}
        />
      ))}

      {error && <Error error={error} />}

      <View style={formStyles.buttonContainer}>
        <Button
          onPress={formik.handleSubmit}
          disabled={isSubmitting}
          title={isSubmitting ? 'Submitting...' : submitButtonText}
        />
      </View>
    </>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={formStyles.scrollContainer}
        contentContainerStyle={formStyles.container}
      >
        {formContent}
      </ScrollView>
    );
  }

  return <View style={formStyles.container}>{formContent}</View>;
};

export default BaseForm;
