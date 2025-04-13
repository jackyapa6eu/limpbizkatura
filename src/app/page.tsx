import { QuestionData } from '@/components/CreateQuestionForm';
import { getData } from '@/lib/firebase/getData';
import React from 'react';
import styles from './home-page.module.scss';

type Posts = {
  [key: string]: QuestionData;
};

const Home = async () => {
  const posts: Posts = await getData('/posts');

  return (
    <div className={styles.home}>
      <section className={styles.home__content}>
        {posts
          ? Object.values(posts)
              .sort((a, b) => b.created_at - a.created_at)
              .map((post) => (
                <article className={styles.home__post} key={post.id}>
                  <div
                    className={styles.home__postContent}
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                  />
                </article>
              ))
          : null}
      </section>
    </div>
  );
};
export default Home;
