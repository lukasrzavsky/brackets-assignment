import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const ListEmptyPlaceholder = () => (
  <View className='flex-1 justify-center items-center px-4 py-10'>
    <Ionicons name='search-outline' size={32} color='#60a5fa' />
    <Text className='text-white mt-2 text-center font-medium'>
      No Results Found
    </Text>
  </View>
);
