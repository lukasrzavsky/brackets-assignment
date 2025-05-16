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
};

type ResponseData = {
  count: number;
  next?: string;
  previous?: string;
  results?: Person[];
};

const fetchPeopleList = async (pageParam: number): Promise<ResponseData> => {
  const params: RequestParams = {
    page: pageParam
  };

  const response = await axiosInstance.get(apiPaths.people, {
    params
  });

  return response.data;
};

export const useGetPeopleListQuery = (): UseInfiniteQueryResult<
  ResponseData,
  AxiosError | Error
> =>
  useInfiniteQuery({
    queryKey: [queryKeys.people],
    queryFn: ({ pageParam }) => fetchPeopleList(pageParam),
    initialPageParam: FIRST_PAGE_NUMBER,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.results?.length === PAGE_SIZE) {
        return allPages.length + 1;
      }
      return undefined;
    }
  });
