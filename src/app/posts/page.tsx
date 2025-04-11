import { ROUTES } from '@/const/routes';
import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';

const Posts = async () => {
  const numbers = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  return (
    <div>
      <h2>Posts page</h2>
      <div className={styles.posts}>
        {numbers.map((num) => (
          <Link
            key={num}
            href={ROUTES.POST(num)}
            className={styles.posts__item}
          >
            <article>Number: {num}</article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
