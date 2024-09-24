import { Pressable } from 'react-native';
import Text from './Text';

const styles = {
  container: {
    alignSelf: 'flex-start',
    padding: 10
  }
};

const AppBarTab = () => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => console.log('Repositories')}
    >
      <Text
        fontSize='subheading'
        fontWeight='bold'
        color='textWhite'>
        Repositories
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
