import { Error } from '@/components/error/Error';
import { Layout } from '@/components/layout/Layout';
import { ListEmptyPlaceholder } from '@/components/listEmptyPlaceholder/ListEmptyPlaceholder';
import { Loading } from '@/components/loading/Loading';
import { PersonItem } from '@/components/personItem/PersonItem';
import { useGetPeople } from '@/hooks/useGetPeople';
import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';

const LIST_ITEM_SIZE = 386;

const Index = () => {
  const { data, isLoading, isError, isFetchingNextPage } = useGetPeople();

  const people = useMemo(
    () => data?.pages?.flatMap(({ results }) => results ?? []) ?? [],
    [data?.pages]
  );

  if (isError) {
    return <Error error='Failed to fetch people' />;
  }

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <FlashList
          data={people}
          renderItem={({ item, index }) => (
            <PersonItem detail={item} id={index + 1} />
          )}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={LIST_ITEM_SIZE}
          ListEmptyComponent={ListEmptyPlaceholder}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size='large' /> : undefined
          }
          contentContainerClassName='pb-[30px]'
        />
      )}
    </Layout>
  );
};

export default Index;
