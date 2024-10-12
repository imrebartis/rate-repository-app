import { memo } from 'react';
import { Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';

const RepositoryListItem = memo(({ item, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      {
        opacity: pressed ? 0.7 : 1
      }
    ]}
  >
    <RepositoryItem item={item} />
  </Pressable>
));

RepositoryListItem.displayName = 'RepositoryListItem';

export default RepositoryListItem;
