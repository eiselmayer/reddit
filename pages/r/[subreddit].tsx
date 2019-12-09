import React from 'react';
import { Submission } from 'snoowrap';
import styled from 'styled-components';
import getPosts from '../../src/components/posts';
import connectReddit from '../../src/utils/connect-reddit';

const PostList = styled.div`
  width: 500px;
`;

interface SubRedditType {
  subreddit: string;
  posts: Submission[];
}

const SubReddit = ({ subreddit, posts }: SubRedditType) => (
  <div>
    <div className="content">
      <h1>
        SubReddit:
        {' '}
        {subreddit}
      </h1>
      <PostList>{getPosts(posts)}</PostList>
    </div>
  </div>
);

SubReddit.getInitialProps = async ({ query }) => {
  const { subreddit } = query;
  const api = connectReddit();
  const posts = await api.getSubreddit(subreddit).getHot();
  const { display_name: subredditName } = api.getSubreddit(subreddit);
  return { subreddit: subredditName, posts };
};


export default SubReddit;
