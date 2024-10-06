import { View, StyleSheet, Linking } from 'react-native';
import theme from '../../theme';
import RepositoryHeader from './RepositoryHeader';
import RepositoryStats from './RepositoryStats';
import Button from '../Button';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: theme.colors.backgroundWhite,
    padding: 10
  }
});

const RepositoryItem = ({ item, showGitHubLinkButton }) => {
  const openGitHubRepo = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.container}
      testID='repositoryItem'>
      <RepositoryHeader item={item} />
      <RepositoryStats item={item} />
      {showGitHubLinkButton && (
        <Button onPress={openGitHubRepo}
          title='Open in GitHub' />
      )}
    </View>
  );
};

export default RepositoryItem;
