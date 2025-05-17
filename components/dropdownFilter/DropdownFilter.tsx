import { FilterOption } from '@/types/filters';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type Props = {
  options: FilterOption[];
  onSelect: (value: FilterOption) => void;
};

export const DropdownFilter = ({ options, onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<FilterOption>('all');
  const [isFocused, setIsFocused] = useState(false);

  const toggleDropdown = useCallback(() => {
    setOpen(prev => !prev);
    setIsFocused(prev => !prev);
  }, []);

  const handleSelect = (option: FilterOption) => {
    setSelected(option);
    setOpen(false);
    setIsFocused(false);
    onSelect(option);
  };

  return (
    <View className='relative w-44 z-[1]'>
      <BlurView
        intensity={80}
        tint='dark'
        className='absolute inset-0 rounded-xl'
      />

      <TouchableOpacity
        onPress={toggleDropdown}
        className={`flex-row items-center justify-between px-4 py-3 border rounded-xl ${
          isFocused ? 'border-blue-500' : 'border-gray-300/30'
        }`}
        activeOpacity={0.8}
      >
        <Text className='text-white'>{selected}</Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={16}
          color='#d1d5db'
        />
      </TouchableOpacity>

      {open && (
        <View className='absolute top-16 w-full z-[1] overflow-hidden rounded-xl border border-gray-300/30'>
          <BlurView intensity={80} tint='dark' className='absolute inset-0' />
          <FlatList
            data={options}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                className={`px-4 py-3 flex-row items-center justify-between ${
                  selected === item ? 'bg-white/10' : ''
                }`}
              >
                <Text className='text-white'>{item}</Text>
                {selected === item && (
                  <Ionicons name='checkmark' size={16} color='#93c5fd' />
                )}
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};
