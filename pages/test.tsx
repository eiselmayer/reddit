import React, { useState } from 'react';
import renderHTML from 'react-render-html';
import { AllHtmlEntities } from 'html-entities';
import Reddit, { Submission } from 'snoowrap';
import ReactPlayer from 'react-player';
import connectReddit from '../src/utils/connect-reddit';

const renderVideo = (submission: Submission): JSX.Element => {
  const {
    // @ts-ignore
    width,
    height,
    hls_url,
  } = submission.media.reddit_video;
  return (
    <ReactPlayer
      url={hls_url}
      controls
      width={width}
      height={height}
    />
  );
};

const renderLink = (submission: Submission): JSX.Element => (
  <a href={submission.url} target="_blank" rel="noreferrer noopener">
    {submission.url}
  </a>
);

const renderImage = (submission: Submission): JSX.Element => (
  <div>
    <img className="image" src={submission.url} />
    <style jsx>
      {`
        .image {
          max-width: 100%;
        }
      `}
    </style>
  </div>
);

const renderText = (submission: Submission): JSX.Element => {
  const entities = new AllHtmlEntities();
  return <p>{renderHTML(entities.decode(submission.selftext_html))}</p>;
};

export const getPosts = (posts: Submission[]) => posts.map((wrapper, idx) => {
  // image, link, hosted_video
  let content: JSX.Element;
  switch (wrapper.post_hint) {
    case 'image':
      content = renderImage(wrapper);
      break;
    case 'link':
      content = renderLink(wrapper);
      break;
    case 'hosted:video':
      content = renderVideo(wrapper);
      break;
    default:
      content = renderText(wrapper);
  }

  // console.log(wrapper);
  return (
    <div key={idx}>
      <h2>
                (
        {wrapper.score}
                ) - (
        {wrapper.post_hint}
                ) -
        {' '}
        {wrapper.title}
      </h2>
      {content}
    </div>
  );
});

const Test = () => {
  const [subReddit, setSubReddit] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = connectReddit();

  const getData = async () => {
    setLoading(true);
    const tmp = await api.getSubreddit(subReddit).getHot();
    setPosts(tmp);
    setLoading(false);
  };

  return (
    <div>
      <div className="content">
        <h1>Test </h1>
        <input
          type="text"
          onChange={(event) => setSubReddit(event.target.value)}
        />
        <button onClick={getData}>Get Data</button>
        <p>
          {loading && 'loading ...'}
          {' '}
        </p>
        <div>{getPosts(posts)}</div>
      </div>

      <style jsx>
        {`
        .content {
          width: 80%;
        }
      `}
      </style>
    </div>
  );
};

export default Test;
