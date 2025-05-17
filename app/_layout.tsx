import { Header } from '@/components/header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

if (__DEV__) {
  require('../ReactotronConfig');
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView className='flex-1 bg-black'>
          <Stack
            screenOptions={{
              headerTransparent: true,
              headerTitle: () => <Header />
            }}
          />
        </SafeAreaView>
      </QueryClientProvider>
      <StatusBar barStyle='light-content' />
    </>
  );
}
