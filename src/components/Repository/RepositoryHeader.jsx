import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';
import LanguageTag from './LanguageTag';
import theme from '../../theme';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailsContainer: {
    paddingLeft: 8,
    flex: 1,
    marginBottom: 16
  },
  avatar: {
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 8
  },
  text: {
    marginBottom: 8
  }
});

const RepositoryHeader = ({ item }) => {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.ownerAvatarUrl }}
        style={styles.avatar} />
      <View style={styles.detailsContainer}>
        <Text fontWeight='bold'
          style={styles.text}>
          {item.fullName}
        </Text>
        <Text color='textSecondary'
          style={styles.text}>
          {item.description}
        </Text>
        <LanguageTag language={item.language} />
      </View>
    </View>
  );
};

export default RepositoryHeader;
