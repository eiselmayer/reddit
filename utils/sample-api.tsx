import fetch from 'isomorphic-unfetch'

export async function sampleFetchWrapper(
  input: RequestInfo,
  init?: RequestInit
) {
  try {
    return await fetch(input, init).then(res => {
      return res.json();
    });
  } catch (err) {
    throw new Error(err.message);
  }
}
