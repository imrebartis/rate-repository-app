import Text from './Text';

const Error = ({ error }) => {
  return (
    <Text color='tertiary'
      fontWeight='bold'>
      {error}
    </Text>
  );
};

export default Error;
