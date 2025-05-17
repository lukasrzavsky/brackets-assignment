import { HEADER_HEIGHT } from '@/constants/common';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const Header = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.inOut(Easing.ease)
    });
  }, [opacity]);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      width: '100%',
      height: '100%',
      opacity: opacity.value
    };
  });

  return (
    <View className='w-full self-center' style={{ height: HEADER_HEIGHT }}>
      <AnimatedImage
        source={require('../../assets/images/logo.png')}
        style={animatedImageStyle}
        contentFit='contain'
        transition={300}
      />
    </View>
  );
};
