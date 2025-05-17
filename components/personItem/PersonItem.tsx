import { Person } from '@/types/persons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { Text, View } from 'react-native';
import { PersonDetail } from './PersonDetail';

type Props = {
  id: number;
  detail: Person;
};

export const PersonItem = memo(({ id, detail }: Props) => (
  <BlurView
    intensity={20}
    tint='dark'
    className='overflow-hidden rounded-2xl mb-4'
  >
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className='border border-white/30 rounded-2xl overflow-hidden'
    >
      <View className='p-5 gap-3'>
        <View className='absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-400' />

        <View className='w-full h-[300px] overflow-hidden rounded-lg self-center '>
          <Image
            source={{
              uri: `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`
            }}
            style={{ width: '100%', height: '100%' }}
            contentFit='contain'
            contentPosition='top'
            recyclingKey={id.toString()}
            transition={300}
          />
        </View>

        <Text className='text-xl font-bold text-white text-center'>
          {detail.name}
        </Text>

        <View className='bg-white/10 p-3 rounded-lg backdrop-blur-md mb-3 border border-white/10'>
          <PersonDetail
            label='Birth Year'
            value={detail.birth_year}
            dotBgColor='bg-blue-500/60'
          />
          <PersonDetail
            label='Height'
            value={detail.height}
            dotBgColor='bg-green-400/60'
          />
          <PersonDetail
            label='Mass'
            value={detail.mass}
            dotBgColor='bg-purple-400/60'
          />
          <PersonDetail
            label='Gender'
            value={detail.gender}
            dotBgColor='bg-red-500/60'
          />
        </View>

        <View className='flex-row justify-between items-center mt-1'>
          <View className='bg-white/5 px-3 py-1 rounded-full border border-white/10'>
            <Text className='text-xs text-white text-opacity-70'>ID: {id}</Text>
          </View>
          <View className='flex-row gap-1'>
            <View className='h-1.5 w-1.5 rounded-full bg-green-400' />
            <View className='h-1.5 w-1.5 rounded-full bg-blue-400 ' />
            <View className='h-1.5 w-1.5 rounded-full bg-purple-400' />
          </View>
        </View>
      </View>
    </LinearGradient>
  </BlurView>
));

PersonItem.displayName = 'PeopleListItem';
