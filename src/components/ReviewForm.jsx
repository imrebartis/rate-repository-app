import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import BaseForm from './BaseForm';

const ReviewForm = ({ setSuccess }) => {
  const [createReview] = useCreateReview();

  const fields = [
    { name: 'repositoryName', placeholder: 'Repository name' },
    { name: 'ownerName', placeholder: 'Owner name' },
    {
      name: 'rating',
      placeholder: 'Rating between 0 and 100',
      inputMode: 'numeric'
    },
    { name: 'text', placeholder: 'Review', multiline: true }
  ];

  const validationSchema = yup.object().shape({
    repositoryName: yup.string().required('Repository name is required'),
    ownerName: yup.string().required('Owner name is required'),
    rating: yup
      .number()
      .typeError('Rating must be a number between 0 and 100')
      .required('Rating is required')
      .min(0, 'Rating must be between 0 and 100')
      .max(100, 'Rating must be between 0 and 100'),
    text: yup.string()
  });

  return (
    <BaseForm
      initialValues={{
        repositoryName: '',
        ownerName: '',
        rating: '',
        text: ''
      }}
      validationSchema={validationSchema}
      onSubmit={createReview}
      fields={fields}
      submitButtonText='Create a review'
      setSuccess={setSuccess}
      scrollable
    />
  );
};

export default ReviewForm;
