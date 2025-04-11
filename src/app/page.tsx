import { getData } from '@/lib/firebase/getData';
import React from 'react';

const Home = async () => {
  const data = await getData('/');

  return <div>main page{data.questions}</div>;
};
export default Home;
