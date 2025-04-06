'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useSearchParamHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setSearchParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl);
    },
    [searchParams, router]
  );

  const removeSearchParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete(key);

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl);
    },
    [searchParams, router]
  );

  const getSearchParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams]
  );

  const allSearchParams = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  return { getSearchParam, setSearchParam, allSearchParams, removeSearchParam };
};
