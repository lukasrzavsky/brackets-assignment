import { BlurView } from 'expo-blur';
import React, { useCallback, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

type InputProps = Omit<
  TextInputProps,
  'className' | 'placeholderTextColor' | 'onFocus' | 'onBlur'
>;

export const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSetFocus = useCallback(
    () => setIsFocused(previousState => !previousState),
    [setIsFocused]
  );

  return (
    <View className='relative w-full rounded-xl overflow-hidden'>
      <BlurView intensity={80} tint='dark' className='absolute w-full h-full' />
      <View
        className={`flex-row items-center px-4 py-3 border rounded-xl ${isFocused ? 'border-blue-500' : 'border-gray-300/30'}`}
      >
        <TextInput
          {...props}
          className='flex-1 text-white'
          placeholderTextColor='#9ca3af'
          onFocus={handleSetFocus}
          onBlur={handleSetFocus}
        />
      </View>
    </View>
  );
};
