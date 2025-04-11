import React from 'react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Post = async ({ params }: Props) => {
  const { id } = await params;

  return <div>Post page with ID: {id}</div>;
};

export default Post;
