import React from 'react';
import { getData } from '@/lib/firebase/getData';
import '@/styles/index.scss';

export default async function Home() {
  const data = await getData('/');

  console.log(data.questions);

  return <div>main page{data.questions}</div>;
}
