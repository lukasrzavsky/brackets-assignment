import { HEADER_HEIGHT } from '@/constants/common';
import { PropsWithChildren } from 'react';
import { ImageBackground, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_ANDROID_PADDING_BOTTOM = 10;

export const Layout = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();

  const paddingTop =
    Platform.OS === 'ios'
      ? insets.top
      : insets.top + HEADER_HEIGHT + HEADER_ANDROID_PADDING_BOTTOM;

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpeg')}
      className='flex-1 h-full w-full'
    >
      <View className='flex-1 px-4 gap-4' style={{ paddingTop }}>
        {children}
      </View>
    </ImageBackground>
  );
};
