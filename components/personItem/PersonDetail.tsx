import { Text, View } from 'react-native';

type Props = {
  label: string;
  value: string;
  dotBgColor: string;
};

export const PersonDetail = ({ label, value, dotBgColor }: Props) => (
  <View className='flex-row items-center gap-2'>
    <View className={`h-3 w-3 rounded-full ${dotBgColor}`} />
    <Text className='font-medium text-blue-300'>{label}:</Text>
    <Text className='text-white text-opacity-90'>{value}</Text>
  </View>
);
