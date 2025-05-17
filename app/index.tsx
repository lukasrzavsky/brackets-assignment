import { DropdownFilter } from '@/components/dropdownFilter/DropdownFilter';
import { Error } from '@/components/error/Error';
import { Input } from '@/components/input/Input';
import { Layout } from '@/components/layout/Layout';
import { ListEmptyPlaceholder } from '@/components/listEmptyPlaceholder/ListEmptyPlaceholder';
import { Loading } from '@/components/loading/Loading';
import { PersonItem } from '@/components/personItem/PersonItem';
import { FILTER_OPTIONS } from '@/constants/common';
import { useGetPeople } from '@/hooks/useGetPeople';
import { FilterOption } from '@/types/filters';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';

const LIST_ITEM_SIZE = 386;

const Index = () => {
  const [searchPattern, setSearchPattern] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');

  const {
    data,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useGetPeople(searchPattern);

  const people = useMemo(
    () => data?.pages?.flatMap(({ results }) => results ?? []) ?? [],
    [data?.pages]
  );

  const filteredPeople = useMemo(
    () =>
      filter === 'all'
        ? people
        : people.filter(person => person.gender === filter),
    [filter, people]
  );

  const onEndReached = async () => {
    if (!isFetching && hasNextPage) {
      await fetchNextPage();
    }
  };

  const handleSearchPatterChanged = useCallback(
    (value: string) => {
      setSearchPattern(value);
    },
    [setSearchPattern]
  );

  if (isError) {
    return <Error error='Failed to fetch people' />;
  }

  return (
    <Layout>
      <Input
        onChangeText={handleSearchPatterChanged}
        value={searchPattern}
        placeholder='Search...'
      />
      <DropdownFilter options={FILTER_OPTIONS} onSelect={setFilter} />
      {isLoading ? (
        <Loading />
      ) : (
        <FlashList
          data={filteredPeople}
          renderItem={({ item, index }) => (
            <PersonItem detail={item} id={index + 1} />
          )}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          estimatedItemSize={LIST_ITEM_SIZE}
          ListEmptyComponent={ListEmptyPlaceholder}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size='large' /> : undefined
          }
          contentContainerClassName='pb-6'
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isFetchingNextPage}
              onRefresh={refetch}
            />
          }
        />
      )}
    </Layout>
  );
};

export default Index;
