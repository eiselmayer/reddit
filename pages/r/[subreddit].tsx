import React, { useState } from "react";
import { useRouter } from "next/router";
import { getPosts } from "../test";
import connectReddit from "../../src/utils/connect-reddit";

const SubReddit = ({ posts }) => {
  const router = useRouter();
  const { subreddit } = router.query;
  const api = connectReddit();

  return (
    <div>
      <div className="content">
        <h1>SubReddit {router.query.subreddit}</h1>
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
