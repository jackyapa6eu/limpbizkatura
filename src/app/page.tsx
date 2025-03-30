import { getData } from '@/lib/firebase/getData';
import '@/styles/index.scss';
import React from 'react';

export default async function Home() {
  const data = await getData('/');

  console.log(data.questions);

  return <div>main page{data.questions}</div>;
}
