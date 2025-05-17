import { HEADER_HEIGHT } from '@/constants/common';
import { Image } from 'expo-image';
import { View } from 'react-native';

export const Header = () => (
  <View className={`w-full h-[${HEADER_HEIGHT}px] self-center`}>
    <Image
      source={require('../../assets/images/logo.png')}
      style={{ width: '100%', height: '100%' }}
      contentFit='contain'
      transition={300}
    />
  </View>
);
