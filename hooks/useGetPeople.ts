import {
  useInfiniteQuery,
  UseInfiniteQueryResult
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import axiosInstance from '@/api/axiosInstance';
import { apiPaths } from '@/constants/apiPaths';
import { FIRST_PAGE_NUMBER, PAGE_SIZE } from '@/constants/common';
import { queryKeys } from '@/constants/queryKeys';
import { Person } from '@/types/persons';

type RequestParams = {
  page?: number;
  search?: string;
};

type ResponseData = {
  count: number;
  next?: string;
  previous?: string;
  results?: Person[];
};

type InfiniteQueryResponse = {
  pages: ResponseData[];
  pageParams: unknown[];
};

const fetchPeople = async (
  pageParam: number,
  searchQuery?: string
): Promise<ResponseData> => {
  const params: RequestParams = {
    page: pageParam
  };

  if (searchQuery) {
    params.search = searchQuery;
  }

  const response = await axiosInstance.get(apiPaths.people, {
    params
  });

  return response.data;
};

export const useGetPeople = (
  searchQuery?: string
): UseInfiniteQueryResult<InfiniteQueryResponse, AxiosError | Error> =>
  useInfiniteQuery({
    queryKey: [queryKeys.people, searchQuery],
    queryFn: ({ pageParam }) => fetchPeople(pageParam, searchQuery),
    initialPageParam: FIRST_PAGE_NUMBER,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.results?.length === PAGE_SIZE) {
        return allPages.length + 1;
      }
      return undefined;
    }
  });
