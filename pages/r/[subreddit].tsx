import React from 'react';
import { useRouter } from 'next/router';
import { Submission } from 'snoowrap';
import { getPosts } from '../test';
import connectReddit from '../../src/utils/connect-reddit';

const SubReddit = ({ posts }: {posts: Submission[]}) => {
  const router = useRouter();
  const { subreddit } = router.query;

  return (
    <div>
      <div className="content">
        <h1>
          SubReddit
          {subreddit}
        </h1>
        <div>{getPosts(posts)}</div>
      </div>
    </div>
  );
};

SubReddit.getInitialProps = async ({ query }) => {
  const { subreddit } = query;
  const api = connectReddit();
  const posts = await api.getSubreddit(subreddit).getHot();
  return { posts };
};

export default SubReddit;
