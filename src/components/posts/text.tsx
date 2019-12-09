import { Submission } from 'snoowrap';
import { AllHtmlEntities } from 'html-entities';
import React, { useState } from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import connectReddit from '../../utils/connect-reddit';


const Post = styled.div`
  width: 800px;
`;

const Score = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100px;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const Content = styled.div`
  margin-left: 100px;
`;

// const upvote = async (id: string) => {
//   const api = connectReddit();
//
//   // @ts-ignore
//   const tmp = await api.getSubmission(id).upvote().fetch();
//   console.log(tmp.likes);
// };


export default (submission: Submission): JSX.Element => {
  const {
    title,
    selftext_html: selftextHtml,
    score,
    id,
    likes,
  } = submission;

  const [liked, setLiked] = useState(likes);

  const api = connectReddit();

  const upvote = async () => {
    if (liked === true) {
      api.getSubmission(id).unvote();
      setLiked(null);
    } else {
      api.getSubmission(id).upvote();
      setLiked(true);
    }
  };

  const downvote = async () => {
    if (liked === false) {
      api.getSubmission(id).unvote();
      setLiked(null);
    } else {
      api.getSubmission(id).downvote();
      setLiked(false);
    }
  };


  const entities = new AllHtmlEntities();
  return (
    <Post>
      <Header>
        <Score>
          <span onClick={() => upvote()}>
            upvote
            {' '}
            {liked === true && 'done'}
          </span>
          <span>{score}</span>
          <span onClick={() => downvote()}>
            downvote
            {' '}
            {liked === false && 'done'}
          </span>
        </Score>
        <Title>
          {title}
        </Title>
      </Header>
      <Content>
        {renderHTML(entities.decode(selftextHtml))}
      </Content>
    </Post>
  );
};
