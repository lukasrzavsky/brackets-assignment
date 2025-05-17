import { Text, View } from 'react-native';

type Props = {
  error: string;
};

export const Error = ({ error }: Props) => (
  <View className='flex-1 justify-center items-center'>
    <Text className='font-[24px] text-red'>{error}</Text>
  </View>
);
