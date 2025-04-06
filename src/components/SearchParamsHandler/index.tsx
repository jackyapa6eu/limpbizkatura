'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { MODALS_NAMES } from '@/context/modal';
import { useModal } from '@/hooks/useModal';
import { useSearchParamHandler } from '@/hooks/useSearchParamsHandler';
import { useUser } from '@/hooks/useUser';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export const SearchParamsHandler = () => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { openModal } = useModal();
  const { allSearchParams, removeSearchParam } = useSearchParamHandler();

  useEffect(() => {
    const { modal: modalName } = allSearchParams;
    if (modalName) {
      if (modalName in MODALS_NAMES)
        openModal(modalName as keyof typeof MODALS_NAMES);
      removeSearchParam('modal');
    }
  }, [searchParams]);

  return null;
};
