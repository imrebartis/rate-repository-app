import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10
  },
  searchInput: {
    backgroundColor: theme.colors.backgroundWhite,
    borderRadius: 5,
    padding: 10
  }
});

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder='Search'
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchInput}
        placeholderTextColor={theme.colors.textSecondary}
        inputStyle={{ color: theme.colors.textPrimary }}
      />
    </View>
  );
};

export default Search;
