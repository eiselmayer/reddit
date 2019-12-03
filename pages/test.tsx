import React, { useState } from 'react'
import { sampleFetchWrapper } from '../utils/sample-api';
import { SubRedditData, PostWrapper } from '../types/SubReddit.type';
import renderHTML from 'react-render-html';
import { AllHtmlEntities } from 'html-entities'
import Reddit, { Submission } from 'snoowrap';
import ReactPlayer from 'react-player'

const renderVideo = (submission: Submission): JSX.Element => {
  const {
    // @ts-ignore
    width,
    height,
    fallback_url,
  } = submission.media.reddit_video;
  return (
      <video controls width={width} height={height}>
        <source src={fallback_url}></source>
      </video>
  )
}

const renderLink = (submission: Submission): JSX.Element => {
  return <a href={submission.url} target="_blank">{submission.url}</a>;
}

const renderImage = (submission: Submission): JSX.Element => {
  return <img src={submission.url} />
}

const renderText = (submission: Submission): JSX.Element => {
  const entities = new AllHtmlEntities();
  return <p>{renderHTML(entities.decode(submission.selftext_html))}</p>
}

const getPosts = (posts: Submission[]) => {

  return posts.map((wrapper, idx) => {

    // image, link, hosted_video
    let content: JSX.Element;
    switch (wrapper.post_hint) {
      case ('image'):
        content = renderImage(wrapper);
        break;
      case ('link'):
        content = renderLink(wrapper);
        break;
      case ('hosted:video'):
        content = renderVideo(wrapper);
        break;
      default:
        content = renderText(wrapper);
    }

    console.log(wrapper);
    return (<div key={idx}>
      <h2>({wrapper.score}) - ({wrapper.post_hint}) - {wrapper.title}</h2>
      {content}
    </div>)
  });
}

const Test = () => {

  const [subReddit, setSubReddit] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = new Reddit({
    userAgent: 'Sample', // can be empty in browser
    clientId: 'kGIauqfm0O94rg',
    clientSecret: 'Y0_dTxb6UAeQrgn2Xv9ERSgmvlo',
    username: 'gingerin0',
    password: 'A&lexander7395',
  });



  const getData = async () => {
    setLoading(true);
    const tmp = await api.getSubreddit(subReddit).getHot();
    setPosts(tmp);
    setLoading(false);
  }

  return (
    <div>
      <h1>Test </h1>
      <input type="text" onChange={event => setSubReddit(event.target.value)}></input>
      <button onClick={getData} >Get Data</button>
      <p>
        {loading && 'loading ...'}
        {' '}
      </p>
      {getPosts(posts)}
    </div>
  )
}

export default Test
