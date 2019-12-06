import Reddit from 'snoowrap';
import redditConfig from '../config/reddit';

const connectReddit = () => {
  const {
    clientId,
    clientSecret,
    username,
    password,
  } = redditConfig;

  if (!clientId || !clientSecret || !username || !password) {
    throw new Error('Please fill out the config file.');
  }

  return new Reddit({
    userAgent: 'Sample', // can be empty in browser
    clientId,
    clientSecret,
    username,
    password,
  });
};

export default connectReddit;
