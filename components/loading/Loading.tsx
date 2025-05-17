import { ActivityIndicator, View } from 'react-native';

export const Loading = () => (
  <View className='flex-1 justify-center items-center'>
    <ActivityIndicator size={60} />
  </View>
);
