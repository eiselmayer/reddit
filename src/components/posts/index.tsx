import { Submission } from 'snoowrap';
import ReactPlayer from 'react-player';
import { AllHtmlEntities } from 'html-entities';
import React from 'react';
import renderHTML from 'react-render-html';
import renderText from './text';

const renderVideo = (submission: Submission): JSX.Element => {
  const {
    // @ts-ignore
    width,
    height,
    hls_url: hlsUrl,
  } = submission.media.reddit_video;
  return (
    <ReactPlayer
      url={hlsUrl}
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
    <img className="image" src={submission.url} alt="" />
    <style jsx>
      {`
        .image {
          max-width: 100%;
        }
      `}
    </style>
  </div>
);

export default (posts: Submission[]) => posts.map((wrapper) => {
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

  return (
    <div key={wrapper.id}>
      {/* <h2> */}
      {/*  ( */}
      {/*  {wrapper.score} */}
      {/*  ) - ( */}
      {/*  {wrapper.post_hint} */}
      {/*  ) -*/}
      {/*  {' '} */}
      {/*  {wrapper.title} */}
      {/* </h2> */}
      {content}
    </div>
  );
});
