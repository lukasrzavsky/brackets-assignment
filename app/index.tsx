import { Layout } from '@/components/layout/Layout';
import { PersonItem } from '@/components/personItem/PersonItem';
import { useGetPeople } from '@/hooks/useGetPeople';
import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';

const LIST_ITEM_SIZE = 386;

const Index = () => {
  const { data } = useGetPeople();

  const people = useMemo(
    () => data?.pages?.flatMap(({ results }) => results ?? []) ?? [],
    [data?.pages]
  );

  return (
    <Layout>
      <FlashList
        data={people}
        renderItem={({ item, index }) => (
          <PersonItem detail={item} id={index + 1} />
        )}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={LIST_ITEM_SIZE}
        contentContainerClassName='pb-[30px]'
      />
    </Layout>
  );
};

export default Index;
