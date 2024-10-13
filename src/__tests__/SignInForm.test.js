import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react-native';
import { SignInForm } from '../components/SignIn';

jest.mock('../components/BaseForm', () => {
  const { TextInput, TouchableOpacity, Text } = require('react-native');
  return jest.fn(({ onSubmit, fields, submitButtonText }) => (
    <>
      {fields.map((field) => (
        <TextInput
          key={field.name}
          placeholder={field.placeholder}
          secureTextEntry={field.secureTextEntry}
          onChangeText={() => {}}
          testID={`${field.name}`}
        />
      ))}
      <TouchableOpacity
        testID='submit-button'
        onPress={() =>
          onSubmit({ username: 'kalle', password: 'kallepassword' })
        }
      >
        <Text>{submitButtonText}</Text>
      </TouchableOpacity>
    </>
  ));
});

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit}
        submitButtonText='Sign in' />);

      fireEvent.changeText(screen.getByTestId('username'), 'kalle');
      fireEvent.changeText(
        screen.getByTestId('password'),
        'kallepassword'
      );
      fireEvent.press(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'kallepassword'
      });
    });
  });
});
